/**
 * Created by zhangxu on 11/01/2018.
 */
import {Component} from "@angular/core";
import {AppService} from "../../../services/app.service";
import {UserService} from "../../../services/user.service";
import swal from "sweetalert2";

import * as myGlobals from '../../../../environments/config';
import {CompanyService} from "../../../services/company.service";
@Component({
  templateUrl: './development_app_manager.html',
  styleUrls: ['./development_app_manager.css']
})


export class DevelopmentAppManagerComponent {


  url = myGlobals.url;

  companyInfo: any;

  appList: Array<any>;
  constructor(private appService: AppService, private userService: UserService, private companyService: CompanyService) {

    const userInfo = {
      "userId": userService.user._id,
      "token": userService.token.token
    };

    userService.getUserInfo(userInfo)
      .then(async res => {

        if (res.success) {
          const appInfo = {
            "userId": res.user._id,
            "token": userService.token.token,
            "companyId": res.user.companyId
          };

          const response = await appService.findAllAppInfo(appInfo);

          if (response.success) {
            this.appList = response.data;
          }

          // 获得公司信息
          const queryCompanyInfo = {
            "userId": res.user._id,
            "token": userService.token.token,
            "cid": res.user.companyId
          };
          const companyResponse = await companyService.findCompany(queryCompanyInfo);

          if (companyResponse.success) {
            this.companyInfo = companyResponse.data;
          }
        }
      })
      .catch(error => {
        console.log(error);
      });


  }


  // 防止向上冒泡
  stop_Propagation(event): void {

    if (event && event.stopPropagation) {
      event.stopPropagation();
    } else {
      window.event.cancelBubble=true;
    }

  }

  deleteApp(appId: string) {

    const appInfo = {
      "userId": this.userService.user._id,
      "token": this.userService.token.token,
      "appId": appId
    }

    this.appService.deleteUserApp(appInfo)
      .then(async res => {
        console.log(res);

        console.log(this.userService.user);

        if (res.success) {
          const appAll = {
            "userId": this.userService.user._id,
            "token": this.userService.token.token,
            "companyId": this.userService.user.companyId
          };
          const response = await this.appService.findAllAppInfo(appAll);

          if (response.success) {
            this.appList = response.data;
          } else {
            swal({
              position: 'bottom-right',
              type: 'error',
              titleText: res.message,
              showConfirmButton: false,
              timer: 2000,
              padding: 0
            }).catch(swal.noop);

            if (res.code === '1034') {
              this.userService.signOut();
            }
          }
        } else {
          swal({
            position: 'bottom-right',
            type: 'error',
            titleText: res.message,
            showConfirmButton: false,
            timer: 2000,
            padding: 0
          }).catch(swal.noop);

          if (res.code === '1034') {
            this.userService.signOut();
          }
        }


      })
      .catch(error => {
        console.log(error);
      });
  }


  // 下载License
  downloadLicense(appId: string) {

    const userInfo = {
      "userId": this.userService.user._id,
      "token": this.userService.token.token,
      "appId": appId
    }
    this.appService.downloadLicense(userInfo)
      .then(res => {
        console.log(res);

        if (res.success) {
          swal({
            position: 'bottom-right',
            type: 'success',
            titleText: 'Download successfully',
            showConfirmButton: false,
            timer: 2000,
            padding: 0
          }).catch(swal.noop);
        } else {
          swal({
            position: 'bottom-right',
            type: 'error',
            titleText: res.message,
            showConfirmButton: false,
            timer: 2000,
            padding: 0
          }).catch(swal.noop);

          if (res.code === '1034') {
            this.userService.signOut();
          }
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
}
