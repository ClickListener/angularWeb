/**
 * Created by zhangxu on 2018/2/8.
 */
import {Component} from "@angular/core";
import {CompanyService} from "../../../../services/company.service";
import {UserService} from "../../../../services/user.service";
import {ActivatedRoute} from "@angular/router";
import swal from "sweetalert2";
import {AppService} from "../../../../services/app.service";

import * as myGlobals from '../../../../../environments/config';

@Component({
  templateUrl: './mainAdmin_company_modify.html',
  styleUrls: ['./mainAdmin_company_modify.css']
})

export class MainAdminCompanyModifyComponent {


  cid: string;

  state: string;

  companyInfo: any;

  appList: Array<any>;

  url = myGlobals.url;

  constructor(private activatedRoute: ActivatedRoute, private companyService: CompanyService,
              private userService: UserService, private appService: AppService) {

    activatedRoute.paramMap.subscribe(paramMap => {

      const cid = paramMap['params'].param;

      this.cid = cid;

      const companyInfo = {
        "userId": userService.user._id,
        "token": userService.token.token,
        "cid": cid
      };

      companyService.findCompany(companyInfo)
        .then(res => {
          console.log(res);

          this.companyInfo = res.data;

        }).catch(error => {
          console.log(error);
      });
    });

    const appInfo = {
      "userId": userService.user._id,
      "token": userService.token.token,
      "companyId": this.cid
    };

    appService.findAllAppInfo(appInfo)
      .then(res => {
        console.log(res);
        if (res.success) {
          this.appList = res.data;
        }

      })
      .catch(error => {
        console.log(error);
      });

  }


  // 更新公司状态
  updateCompanyInfo() {

    const companyInfo = {
      "userId": this.userService.user._id,
      "token": this.userService.token.token,
      "cid": this.cid,
      "state": this.companyInfo.state
    };
    this.companyService.reviewCompany(companyInfo)
      .then(res => {
        console.log(res);
        if (res.success) {
          swal({
            position: 'center',
            type: 'success',
            titleText: 'Update success',
            showConfirmButton: false,
            timer: 1500,
            padding: 0,
            width: 300
          }).catch(swal.noop);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }


  // 更新APP 状态
  updateAppState(app: any) {

    const companyInfo = {
      "userId": this.userService.user._id,
      "token": this.userService.token.token,
      "cid": this.cid,
      "state": app.state,
      "aid": app._id
    };


    this.companyService.reviewCompany(companyInfo)
      .then(res => {
        console.log(res);
        if (res.success) {
          swal({
            position: 'center',
            type: 'success',
            titleText: 'Update success',
            showConfirmButton: false,
            timer: 1500,
            padding: 0,
            width: 300
          }).catch(swal.noop);
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
            position: 'center',
            type: 'success',
            titleText: 'Download successfully',
            showConfirmButton: false,
            timer: 2000,
            padding: 0,
            width: 300
          }).catch(swal.noop);
        } else {
          swal(
            'Fail!',
            res.message,
            'error'
          ).catch(swal.noop);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
}
