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

  constructor(private activateRoute: ActivatedRoute, private companyService: CompanyService, private userService: UserService,
              private _location: Location, private router: Router) {

    activateRoute.paramMap.subscribe(paramMap => {
      this.companyId = paramMap['params'].param;

      console.log('companyId = ', this.companyId);
    });

    if (companyService.countryList === undefined ) {
      companyService.getCountryList()
        .then(res => {
          this.countryList = res;
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      this.countryList = companyService.countryList;
    }


    const companyInfo = {
      "userId": userService.user._id,
      "token": userService.token.token,
      "cid": this.companyId
    };

    companyService.findCompany(companyInfo)
      .then(res => {
        console.log(res);
        if (res.success) {
          this.companyInfo = res.data;
        }
      })
      .catch(error => {
        console.log(error);
      });

  }


  // 使用Location Service 实现后退功能
  cancel() {
    this._location.back();
  }


  updateCompanyInfo() {
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
      "address": this.companyInfo.address,
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

    console.log(formData);

    // 可以校验输入参数
  }

  private success(response) {
    if (response.success) {
      this.router.navigate(['/development-main/development-group']);
      swal({
        position: 'bottom-right',
        type: 'success',
        titleText: 'Create success',
        showConfirmButton: false,
        timer: 2000,
        padding: 0
      }).catch(swal.noop);
    } else {
      swal({
        position: 'bottom-right',
        type: 'error',
        titleText: response.message,
        showConfirmButton: false,
        timer: 2000,
        padding: 0
      }).catch(swal.noop);
    }
  }


  // 使用FileReader 将图片读取为base64字符串形式，实现图片预览
  private previewImg(event) {
    const file = event.target.files[0];

    const reader = new FileReader();

    reader.onloadstart = function (e) {
      console.log("开始读取....");
    };

    reader.onprogress = function (e) {
      console.log("正在读取中....");
    };

    reader.onabort = function (e) {
      console.log("中断读取....");
    };
    reader.onerror = function (e) {
      console.log("读取异常....");
    };
    reader.onload = function (e) {
      console.log("成功读取....");

      const img = document.getElementById("preview");
      img['src'] = e.target['result'];
    };

    reader.readAsDataURL(file);
  }
}
