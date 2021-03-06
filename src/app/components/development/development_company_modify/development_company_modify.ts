/**
 * Created by zhangxu on 2018/2/8.
 */
import {Component} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {CompanyService} from "../../../services/company.service";
import {UserService} from "../../../services/user.service";

import * as myGlobals from '../../../../environments/config';
import {Location} from "@angular/common";
import swal from "sweetalert2";
import {NGXLogger} from "ngx-logger";

declare const jQuery: any;

@Component({
  templateUrl: './development_company_modify.html',
  styleUrls: ['./development_company_modify.css']
})

export class DevelopmentCompanyModifyComponent {

  companyId: string;

  companyInfo: any;

  countryList: Array<any>;

  url = myGlobals.url;

  business = true;

  buttonDisable = false;  // 提交按钮状态

  constructor(private activateRoute: ActivatedRoute, private companyService: CompanyService, private userService: UserService,
              private _location: Location, private router: Router, private logger: NGXLogger) {


    if (!userService.user) {
      this.router.navigate(['/sign-in']);
      return;
    }

    activateRoute.paramMap.subscribe(paramMap => {
      this.companyId = paramMap['params'].param;

      this.logger.debug('companyId = ', this.companyId);
    });


    this.countryList = companyService.countryList;


    const companyInfo = {
      "userId": userService.user._id,
      "token": userService.token.token,
      "cid": this.companyId
    };

    companyService.findCompany(companyInfo)
      .then(res => {
        this.logger.debug(res);
        if (res.success) {
          this.companyInfo = res.data;
        }
      })
      .catch(error => {
        this.logger.debug(error);
      });

  }


  // 使用Location Service 实现后退功能
  cancel() {
    this._location.back();
  }


  updateCompanyInfo() {

    this.buttonDisable = true;

    const options = {
      url: this.url + "/api/company/updateCompany",
      type: "POST",                                          // 默认是form的method，如果声明，则会覆盖
      beforeSubmit: this.beforeSubmit.bind(this),            // 提交前的回调函数
      success: this.success.bind(this)                       // 提交后的回调函数

    };
    jQuery('#applyForm').ajaxSubmit(options);
  }


  private beforeSubmit(formData) {


    formData.splice(0, formData.length - 1);

    const companyValue = {
      "_id": this.companyInfo._id,
      "companyName": this.companyInfo.companyName,
      "description": this.companyInfo.description,
      "country": this.companyInfo.country
    };

    const company = {
      name: "company",
      value: JSON.stringify(companyValue)
    };

    formData.splice(0, 0, company);

    const action = {
      name: 'action',
      value: 'U',
      type: 'text'
    };

    formData.splice(0, 0, action);

    const token = {
      name: 'token',
      value: this.userService.token.token,
      type: 'text'
    };

    formData.splice(0, 0, token);

    const userId = {
      name: 'userId',
      value: this.userService.user._id,
      type: 'text'
    };

    formData.splice(0, 0, userId);

    this.logger.debug(formData);

    // 可以校验输入参数
  }

  private success(response) {

    this.buttonDisable = false;

    if (response.success) {
      this.router.navigate(['/development-main/development-group', this.userService.user._id]);
      swal({
        position: 'center',
        type: 'success',
        titleText: 'Update successfully',
        showConfirmButton: false,
        timer: 1500,
        padding: 0,
        width: 300
      }).catch(swal.noop);
    } else {
      swal({
        position: 'center',
        type: 'error',
        titleText: response.message,
        showConfirmButton: false,
        timer: 2000,
        padding: 0,
        width: 300
      }).catch(swal.noop);
    }
  }


  // 使用FileReader 将图片读取为base64字符串形式，实现图片预览
  private previewImg(event) {
    const file = event.target.files[0];

    if (!file) {
      const img = document.getElementById("preview");
      img['src'] = '../../../../assets/images/addPic.png';

      this.business = false;

      return;
    }
    this.business = true;

    const reader = new FileReader();

    reader.onloadstart =  (e) => {
      this.logger.debug("开始读取....");
    };

    reader.onprogress =  (e) => {
      this.logger.debug("正在读取中....");
    };

    reader.onabort =  (e) => {
      this.logger.debug("中断读取....");
    };
    reader.onerror =  (e) => {
      this.logger.debug("读取异常....");
    };
    reader.onload =  (e) => {
      this.logger.debug("成功读取....");

      const img = document.getElementById("preview");
      img['src'] = e.target['result'];
    };

    reader.readAsDataURL(file);
  }
}
