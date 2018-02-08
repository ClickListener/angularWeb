/**
 * Created by zhangxu on 17/01/2018.
 */
import {Component, DoCheck, OnInit} from "@angular/core";
import {Device} from "../../../model/Device";
import {UserService} from "../../../services/user.service";
import swal from "sweetalert2";
import {Router} from "@angular/router";

import * as myGlobals from '../../../../environments/config';

declare const jQuery: any;

@Component({
  templateUrl: './development_app_reg.html',
  styleUrls: ['./development_app_reg.css']
})

export class DevelopmentAppRegComponent implements OnInit {

  url = myGlobals.url;

  deviceSelectList: Array<Device>;

  deviceList = [
    "BP5",
    "BP3L",
    "BP7",
    "BP3M",
    "Bp7S"
  ];

  deviceNumberList = [
    100,
    200,
    500,
    1000
  ];

  appName: string;
  bundleIdOrPackageName: string;
  description: string;
  scheme: string;
  codeType: string;
  expiredDate: any;


  constructor(private userService: UserService, private router: Router) {
    this.deviceSelectList = new Array();
    const device = new Device();
    device.deviceName = "BP5";
    device.totalNumber = 100;

    this.deviceSelectList.push(device);

    const userInfo = {
      "userId": userService.user._id,
      "token": userService.token.token
    };

    this.userService.getUserInfo(userInfo);



  }


  ngOnInit(): void {
    jQuery('.datapicker').pickadate({
      labelMonthNext: 'Go to the next month',
      labelMonthPrev: 'Go to the previous month',
      labelMonthSelect: 'Pick a month from the dropdown',
      labelYearSelect: 'Pick a year from the dropdown',
      selectMonths: true,
      selectYears: true,
      min: +1,
      max: [2019, 0, 1],
      formatSubmit: 'yyyy/MM/dd',
      onSet: context =>  {
        this.expiredDate = context.select;
      }
    });
  }
  addDevice() {
    const device = new Device();
    device.deviceName = "BP5";
    device.totalNumber = 100;

    this.deviceSelectList.push(device);
  }

  deleteDevice(index: number) {
    if (this.deviceSelectList.length === 1) {

    } else {
      this.deviceSelectList.splice(index, 1);
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


  registerApp() {
    const option = {
      url: this.url + "/api/useApp/addApp",
      type: "POST",
      beforeSubmit: this.beforeSubmit.bind(this),
      success: this.success.bind(this)
    };

    jQuery('#registerAppForm').ajaxSubmit(option);
  }

  private beforeSubmit(formData) {

    const file = formData.splice(4, 1);

    formData.splice(0, formData.length);

    const action = {
      name: 'action',
      value: 'C'
    };

    formData.push(action);

    const userId = {
      name: 'userId',
      value: this.userService.user._id,
      type: 'text'
    };

    formData.push(userId);

    const token = {
      name: 'token',
      value: this.userService.token.token,
      type: 'text'
    };

    formData.push(token);

    const app = {
      "platform": jQuery("input:radio:checked").val(),
      "appName": this.appName,
      "bundleIdOrPackageName": this.bundleIdOrPackageName,
      "description": this.description,
      "scheme": this.scheme,
      "codeType": this.codeType,
      "devices": this.deviceSelectList,
      "licenseType": 3,
      "expireTime": this.expiredDate,
      "companyId": this.userService.user.companyId
    };

    const appInfo = {
      name: 'appInfo',
      value: JSON.stringify(app)
    };

    formData.push(appInfo);


    formData.push(file[0]);

    console.log(formData);
  }


  private success(res) {

    console.log(res);

    if (res.success) {
      this.router.navigate(['/development-main/development-app-manager']);
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
        titleText: res.message,
        showConfirmButton: false,
        timer: 2000,
        padding: 0
      }).catch(swal.noop);
    }
  }


  selectDevice(index: number, deviceName: string) {
    this.deviceSelectList[index].deviceName = deviceName;

  }






}
