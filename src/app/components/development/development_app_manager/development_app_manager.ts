/**
 * Created by zhangxu on 11/01/2018.
 */
import {Component} from "@angular/core";
import {AppService} from "../../../services/app.service";
import {UserService} from "../../../services/user.service";
import swal from "sweetalert2";

import * as myGlobals from '../../../../environments/config';
import {CompanyService} from "../../../services/company.service";
import {Router} from "@angular/router";
import {NGXLogger} from "ngx-logger";
@Component({
  templateUrl: './development_app_manager.html',
  styleUrls: ['./development_app_manager.css']
})


export class DevelopmentAppManagerComponent {


  url = myGlobals.url;

  companyInfo: any;

  appList: Array<any>;

  create_App: boolean;
  edit_App: boolean;
  delete_App: boolean;
  checkLicenseData = true;

  user: any;
  token: any;

  connectionTimeout = false;

  constructor(private appService: AppService, private userService: UserService, private companyService: CompanyService,
              private router: Router, private logger: NGXLogger) {


    logger.debug('`.routerState = ', router.routerState);

    if (!userService.user) {
      this.router.navigate(['/sign-in']);
      return;
    }

    const userInfo = {
      "userId": userService.user._id,
      "token": userService.token.token
    };


    this.userService.getUserInfo(userInfo)
      .then(async response => {

        if (response.success) {

          this.user = userService.user;
          this.token = userService.token.token;


          const authResponse = await userService.getUserAuth(userInfo);

          if (authResponse.success) {
            this.parsePermission(authResponse.data);

            if (this.user.type === 4 && this.checkLicenseData) {
              const appInfo = {
                "userId": response.user._id,
                "token": this.userService.token.token,
                "companyId": response.user.companyId
              };

              const _response = await this.appService.findAllAppInfo(appInfo);

              if (_response.success) {
                this.appList = _response.data;
                this.appList = this.appList.reverse();
              }
            } else if (this.user.type === 3) {


              this.create_App = true;
              this.edit_App = true;
              this.delete_App = true;
              this.checkLicenseData = true;

              const appInfo = {
                "userId": response.user._id,
                "token": this.userService.token.token,
                "companyId": response.user.companyId
              };

              const _response = await this.appService.findAllAppInfo(appInfo);

              if (_response.success) {
                this.appList = _response.data;
                this.appList = this.appList.reverse();
              }
            }
          }

          // 获得公司信息
          const queryCompanyInfo = {
            "userId": response.user._id,
            "token": this.userService.token.token,
            "cid": response.user.companyId
          };
          const companyResponse = await this.companyService.findCompany(queryCompanyInfo);

          if (companyResponse.success) {
            this.companyInfo = companyResponse.data;
          }




        }
      })
      .catch(error => {
        this.logger.error(error);
        this.connectionTimeout = true;
      });



  }





  private parsePermission(permission: any) {

    if (permission.length === 0) {
      this.create_App = false;
      this.edit_App = false;
      this.delete_App = false;
      this.checkLicenseData = false;
      return;
    }

    permission.forEach((item, index) => {
      if (item.resourceId === '5a6585df5e149e1dfdf27964') {
        this.create_App = (item.action.indexOf('C') !== -1);
        this.edit_App = (item.action.indexOf('U') !== -1);
        this.delete_App = (item.action.indexOf('D') !== -1);
        this.checkLicenseData = (item.action.indexOf('R') !== -1);

        return;
      }

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
    };

    this.appService.deleteUserApp(appInfo)
      .then(async res => {

        this.logger.debug(res);

        if (res.success) {
          const appAll = {
            "userId": this.userService.user._id,
            "token": this.userService.token.token,
            "companyId": this.userService.user.companyId
          };
          const response = await this.appService.findAllAppInfo(appAll);

          if (response.success) {
            this.appList = response.data;
            this.appList = this.appList.reverse();
          }
        }


      })
      .catch(error => {
        this.logger.error(error);
      });
  }


  // 下载License
  downloadLicense(appId: string) {

    const userInfo = {
      "userId": this.userService.user._id,
      "token": this.userService.token.token,
      "appId": appId
    };
    this.appService.downloadLicense(userInfo)
      .then(res => {
        this.logger.debug(res);

        if (res.success) {
          swal({
            position: 'center',
            type: 'success',
            titleText: 'Download successfully',
            showConfirmButton: false,
            timer: 2000,
            padding: 0,
            width: 300
          }).catch(swal.noop);
        } else {
          swal({
            position: 'center',
            type: 'error',
            titleText: res.message,
            showConfirmButton: false,
            timer: 2000,
            padding: 0,
            width: 300
          }).catch(swal.noop);

          if (res.code === '1034') {
            this.userService.signOut();
          }
        }
      })
      .catch(error => {
        this.logger.error(error);
      });
  }
}
