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

  appIcon = false;


  deviceNumberList = [
    5,
    10,
    20,
    100
  ];

  appName: string;
  bundleIdOrPackageName: string;
  description: string;
  scheme = 'NativeSDK';
  // codeType = 'GDH';
  // expiredDate = 10;


  buttonDisable = false;  // 提交按钮状态


  deviceList = [
    {
      model: 'BP3',
      isValid: true
    },
    {
      model: 'BP3M',
      isValid: true
    },
    {
      model: 'BP3L',
      isValid: true
    },
    {
      model: 'BP5',
      isValid: false
    },
    {
      model: 'BP7',
      isValid: true
    },
    {
      model: 'BP7S',
      isValid: true
    },
    {
      model: 'BPM1',
      isValid: true
    },
    {
      model: 'KN-550BT',
      isValid: true
    },
    {
      model: 'ABI',
      isValid: true
    },
    {
      model: 'ABP100',
      isValid: true
    },
    {
      model: 'AM3',
      isValid: true
    },
    {
      model: 'AM3S',
      isValid: true
    },
    {
      model: 'AM4',
      isValid: true
    },
    {
      model: 'PO3',
      isValid: true
    },
    {
      model: 'HS2',
      isValid: true
    },
    {
      model: 'HS3',
      isValid: true
    },
    {
      model: 'HS4',
      isValid: true
    },
    {
      model: 'HS4S',
      isValid: true
    },
    {
      model: 'HS5',
      isValid: true
    },
    {
      model: 'HS5S',
      isValid: true
    },
    {
      model: 'HS6',
      isValid: true
    },

    {
      model: 'BG1',
      isValid: true
    },
    {
      model: 'BG5',
      isValid: true
    },
    {
      model: 'BG5S',
      isValid: true
    },
    {
      model: 'ECG3',
      isValid: true
    }

  ];


  constructor(private userService: UserService, private router: Router) {

    if (!userService.user) {
      this.router.navigate(['/sign-in']);
      return;
    }

    this.deviceSelectList = new Array();
    const device = new Device();
    device.model = "BP5";
    device.totalNumber = 100;
    device.deviceUsedNumber = 0;

    this.deviceSelectList.push(device);

    const userInfo = {
      "userId": userService.user._id,
      "token": userService.token.token
    };

    this.userService.getUserInfo(userInfo);



  }


  ngOnInit(): void {
    // jQuery('.datapicker').pickadate({
    //   labelMonthNext: 'Go to the next month',
    //   labelMonthPrev: 'Go to the previous month',
    //   labelMonthSelect: 'Pick a month from the dropdown',
    //   labelYearSelect: 'Pick a year from the dropdown',
    //   selectMonths: true,
    //   selectYears: true,
    //   min: +1,
    //   max: [2099, 0, 1],
    //   formatSubmit: 'yyyy/mm/dd',
    //   onSet: context =>  {
    //
    //     this.expiredDate = context.select;
    //     console.log('expiredDateValid = ', this.expiredDate);
    //
    //   }
    // });

  }


  addDevice() {

    for (let i = 0; i < this.deviceList.length; i++) {
      if (this.deviceList[i].isValid) {

        this.deviceList[i].isValid = false;
        const device = new Device();
        device.model = this.deviceList[i].model;
        device.totalNumber = 100;
        device.deviceUsedNumber = 0;

        this.deviceSelectList.push(device);

        return;
      }
    }


  }

  deleteDevice(index: number) {
    if (this.deviceSelectList.length === 1) {

    } else {
      const device_delete = this.deviceSelectList.splice(index, 1);


      this.deviceList.find((device, i, arr) => {
          if (device.model === device_delete[0].model) {
            device.isValid = true;
            return true;
          }
      });
    }

  }



  // 使用FileReader 将图片读取为base64字符串形式，实现图片预览
  private previewImg(event) {
    const file = event.target.files[0];


    if (!file) {
      const img = document.getElementById("preview");
      img['src'] = '../../../../assets/images/addPic.png';

      this.appIcon = false;
      return;
    }
    this.appIcon = true;

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

    this.buttonDisable = true;

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
      // "codeType": this.codeType,
      // "devices": this.deviceSelectList,
      "licenseType": 3,
      // "expireTime": this.expiredDate,
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

    this.buttonDisable = false;

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

    jQuery('#exampleModal' + index).modal('hide');


    // 当已选择设备后，重新选择设备，则将之前的设备置成可选状态。
    if (this.deviceSelectList[index].model) {

      this.deviceList.find((device, i, arr) => {
        if (device.model === this.deviceSelectList[index].model) {
          device.isValid = true;
          return true;
        }
      });

    }

    this.deviceList.find((device, i, arr) => {
      if (device.model === deviceName) {
        device.isValid = false;
        return true;
      }
    });

    this.deviceSelectList[index].model = deviceName;


  }






}
