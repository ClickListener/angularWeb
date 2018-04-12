/**
 * Created by zhangxu on 08/01/2018.
 */
import {Component, DoCheck, OnChanges} from "@angular/core";
import {UserService} from "../../../services/user.service";
import {CompanyService} from "../../../services/company.service";
import swal from "sweetalert2";
import {Router} from "@angular/router";

import * as myGlobals from '../../../../environments/config';


declare const jQuery: any;
@Component({
  templateUrl: './development_apply_master.html',
  styleUrls: ['./development_apply_master.css']
})

export class DevelopmentApplyMasterComponent {


  url = myGlobals.url;

  country = "Afghanistan";
  companyName: string;

  address: string;

  description: string;

  business = false;



  countryList: Array<any>;

  buttonDisable = false;  // 提交按钮状态



  constructor(private userService: UserService, private companyService: CompanyService, private router: Router) {

    if (!userService.user) {
      this.router.navigate(['/sign-in']);
      return;
    }

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

    console.log('------- = ', this.userService.user);

  }



  private applyMasterDeveloper() {

    this.buttonDisable = true;
    const options = {
      url: this.url + "/api/company/uploadCompany",
      type: "POST",                                          // 默认是form的method，如果声明，则会覆盖
      beforeSubmit: this.beforeSubmit.bind(this),            // 提交前的回调函数
      success: this.success.bind(this)                       // 提交后的回调函数

    };
    jQuery('#applyForm').ajaxSubmit(options);
  }

  private beforeSubmit(formData) {


    // const code = this.countryList.find((country, index, arr) => {
    //     return country.en === this.country;
    // });


    formData.splice(0, formData.length - 1);

    const companyValue = {
      "companyName": this.companyName,
      "description": this.description,
      "country": this.userService.user.country
    };

    const company = {
      name: "company",
      value: JSON.stringify(companyValue)
    };

    formData.splice(0, 0, company);

    const action = {
      name: 'action',
      value: 'C',
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

    this.buttonDisable = false;
    if (response.success) {
      this.router.navigate(['/development-main/development-group']);
      swal({
        position: 'center',
        type: 'success',
        titleText: 'Create success',
        showConfirmButton: false,
        timer: 2000,
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
