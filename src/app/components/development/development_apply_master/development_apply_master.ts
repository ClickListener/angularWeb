/**
 * Created by zhangxu on 08/01/2018.
 */
import {Component, DoCheck, OnChanges} from "@angular/core";
import {UserService} from "../../../services/user.service";
import {CompanyService} from "../../../services/company.service";
import swal from "sweetalert2";


declare const jQuery: any;
@Component({
  templateUrl: './development_apply_master.html',
  styleUrls: ['./development_apply_master.css']
})

export class DevelopmentApplyMasterComponent implements DoCheck {



  country: string;
  companyName: string;

  address: string;

  description: string;

  countryList: Array<any>;


  ngDoCheck(): void {
    console.log("country = " + this.country);
  }

  constructor(private userService: UserService, private companyService: CompanyService) {

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

  }



  private applyMasterDeveloper() {
    const options = {
      url: "http://localhost:3001/api/company/uploadCompany",           // 默认是form的action，如果声明，则会覆盖
      type: "POST",                                          // 默认是form的method，如果声明，则会覆盖
      beforeSubmit: this.beforeSubmit.bind(this),            // 提交前的回调函数
      success: this.success.bind(this)                       // 提交后的回调函数

    };
    jQuery('#applyForm').ajaxSubmit(options);
  }

  private beforeSubmit(formData) {

    const code = this.countryList.find((country, index, arr) => {
        return country.en === this.country;
    });


    formData.splice(0, formData.length - 1);

    const companyValue = {
      "companyName": this.companyName,
      "address": this.address,
      "description": this.description,
      "country": code.code
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
    if (response.success) {
      // this.router.navigate(['/scheme-main', this.resourceName]);
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
