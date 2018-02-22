/**
 * Created by zhangxu on 2018/2/5.
 */
import {Component, DoCheck, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {AppService} from "../../../services/app.service";
import {UserService} from "../../../services/user.service";
import {Device} from "../../../model/Device";
import swal from "sweetalert2";
import {DatePipe} from "@angular/common";

import * as myGlobals from '../../../../environments/config'

declare const jQuery: any;

@Component({
  templateUrl: './development_app_modify.html',
  styleUrls: ['./development_app_modify.css']
})

export class DevelopmentAppModifyComponent implements DoCheck {


  url = myGlobals.url;

  appInfo: any;

  deviceNumberList = [
    100,
    200,
    500,
    1000
  ];

  expiredDate: string;


  constructor(private activatedRoute: ActivatedRoute, private appService: AppService,
              private userService: UserService, private router: Router,
              private datePipe: DatePipe) {

    this.activatedRoute.paramMap.subscribe(paramMap => {
      const appId = paramMap['params'].param;
      console.log('appId = ', appId);

      const appInfo = {
        "userId": userService.user._id,
        "token": userService.token.token,
        "appId": appId
      };
      appService.findUerApp(appInfo)
        .then(res => {
          console.log(res);
          if (res.success) {

            this.appInfo = res.data;

            this.expiredDate = datePipe.transform(this.appInfo.expireTime, 'yyyy/MM/dd');

            console.log('expiredDate = ' , this.expiredDate);
          }

        })
        .catch(error => {
          console.log(error);
        });
    });

  }



  ngDoCheck(): void {

    if (this.appInfo !== null) {
      jQuery('.datapicker').pickadate({
        labelMonthNext: 'Go to the next month',
        labelMonthPrev: 'Go to the previous month',
        labelMonthSelect: 'Pick a month from the dropdown',
        labelYearSelect: 'Pick a year from the dropdown',
        selectMonths: true,
        selectYears: true,
        min: +1,
        max: [2019, 0, 1],
        formatSubmit: 'yyyy/mm/dd',
        format: 'yyyy/mm/dd',
        onSet: context =>  {
          this.appInfo.expireTime = context.select;
        }
      });
    }


  }

  addDevice() {
    const device = new Device();
    device.deviceName = "BP5";
    device.totalNumber = 100;

    this.appInfo.devices.push(device);
  }

  deleteDevice(index: number) {
    if (this.appInfo.devices.length === 1) {

    } else {
      this.appInfo.devices.splice(index, 1);
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



  updateApp() {
    const option = {
      url: this.url + "/api/useApp/updateUserApp",
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
      value: 'U'
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
      "_id": this.appInfo._id,
      "platform": this.appInfo.platform,
      "appName": this.appInfo.appName,
      "bundleIdOrPackageName": this.appInfo.bundleIdOrPackageName,
      "description": this.appInfo.description,
      "scheme": this.appInfo.scheme,
      "codeType": this.appInfo.codeType,
      "devices": this.appInfo.devices,
      "licenseType": 3,
      "expireTime": this.appInfo.expireTime,
      "companyId": this.appInfo.companyId,
      "avatar": this.appInfo.avatar
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
        titleText: res.message,
        showConfirmButton: false,
        timer: 2000,
        padding: 0,
        width: 300
      }).catch(swal.noop);
    }
  }


  selectDevice(index: number, deviceName: string) {
    this.appInfo.devices[index].deviceName = deviceName;

  }


}
