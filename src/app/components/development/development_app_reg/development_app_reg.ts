/**
 * Created by zhangxu on 17/01/2018.
 */
import {Component, DoCheck, OnInit} from "@angular/core";
import {Device} from "../../../model/Device";
import {UserService} from "../../../services/user.service";
import swal from "sweetalert2";
import {Router} from "@angular/router";

import * as myGlobals from '../../../../environments/config';
import {NGXLogger} from "ngx-logger";

declare const jQuery: any;

@Component({
  templateUrl: './development_app_reg.html',
  styleUrls: ['./development_app_reg.css']
})

export class DevelopmentAppRegComponent implements OnInit {


  url = myGlobals.url;

  deviceSelectList: Array<Device>;


  deviceSelectedList: Array<Device>;

  appIcon = false;
  appIconChange = false;


  deviceNumberList = [
    5,
    10,
    20,
    100
  ];

  appName: string;
  description: string;
  sdkType = 'NativeSDK';
  // codeType = 'GDH';
  expiredDate = new Date().getTime() + 30 * 24 * 60 * 60 * 1000;

  packageName: string;
  bundleId: string;

  platform = "android";

  buttonDisable = false;  // 提交按钮状态


  layered_url: string;


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
    },
    {
      model: 'ECGUSB',
      isValid: true
    }

  ];


  constructor(private userService: UserService, private router: Router, private logger: NGXLogger) {

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

    this.deviceSelectedList = [
      {
        model: "BP3",
        totalNumber: 100,
        deviceUsedNumber: 0
      },
      {
        model: "BP3M",
        totalNumber: 100,
        deviceUsedNumber: 0
      },
      {
        model: "BP3L",
        totalNumber: 100,
        deviceUsedNumber: 0
      },
      {
        model: "BP5",
        totalNumber: 100,
        deviceUsedNumber: 0
      },
      {
        model: "BP7",
        totalNumber: 100,
        deviceUsedNumber: 0
      },
      {
        model: "BP7S",
        totalNumber: 100,
        deviceUsedNumber: 0
      },
      {
        model: "BPM1",
        totalNumber: 100,
        deviceUsedNumber: 0
      },
      {
        model: "KN-550BT",
        totalNumber: 100,
        deviceUsedNumber: 0
      },
      {
        model: "ABI",
        totalNumber: 100,
        deviceUsedNumber: 0
      },
      {
        model: "ABP100",
        totalNumber: 100,
        deviceUsedNumber: 0
      },
      {
        model: "AM3",
        totalNumber: 100,
        deviceUsedNumber: 0
      },
      {
        model: "AM3S",
        totalNumber: 100,
        deviceUsedNumber: 0
      },
      {
        model: "AM4",
        totalNumber: 100,
        deviceUsedNumber: 0
      },
      {
        model: "PO3",
        totalNumber: 100,
        deviceUsedNumber: 0
      },
      {
        model: "HS2",
        totalNumber: 100,
        deviceUsedNumber: 0
      },
      {
        model: "HS3",
        totalNumber: 100,
        deviceUsedNumber: 0
      },
      {
        model: "HS4",
        totalNumber: 100,
        deviceUsedNumber: 0
      },
      {
        model: "HS4S",
        totalNumber: 100,
        deviceUsedNumber: 0
      },
      {
        model: "HS5",
        totalNumber: 100,
        deviceUsedNumber: 0
      },
      {
        model: "HS5S",
        totalNumber: 100,
        deviceUsedNumber: 0
      },
      {
        model: "HS6",
        totalNumber: 100,
        deviceUsedNumber: 0
      },
      {
        model: "BG1",
        totalNumber: 100,
        deviceUsedNumber: 0
      },
      {
        model: "BG5",
        totalNumber: 100,
        deviceUsedNumber: 0
      },
      {
        model: "BG5S",
        totalNumber: 100,
        deviceUsedNumber: 0
      },
      {
        model: "ECG3",
        totalNumber: 100,
        deviceUsedNumber: 0
      },
      {
        model: "ECGUSB",
        totalNumber: 100,
        deviceUsedNumber: 0
      }

    ];


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
    //     this.logger.debug('expiredDateValid = ', this.expiredDate);
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

    this.appIconChange = true;


    if (!file) {
      const img = document.getElementById("preview");
      img['src'] = '../../../../assets/images/addPic.png';

      this.appIcon = false;
      return;
    }
    this.appIcon = true;

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


  registerApp() {

    this.buttonDisable = true;

    if (this.platform === 'both') {
      const option = {
        url: this.url + "/api/useApp/addApp",
        type: "POST",
        beforeSubmit: this.beforeSubmit_android.bind(this),
        success: this.success_android.bind(this),
        error: this.error.bind(this)
      };

      jQuery('#registerAppForm').ajaxSubmit(option);
    } else {
      const option = {
        url: this.url + "/api/useApp/addApp",
        type: "POST",
        beforeSubmit: this.beforeSubmit.bind(this),
        success: this.success.bind(this),
        error: this.error.bind(this)
      };

      jQuery('#registerAppForm').ajaxSubmit(option);
    }


  }

  private beforeSubmit_android(formData) {

    const file = formData.splice(5, 1);

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
      "platform": "android",
      "appName": this.appName,
      "bundleIdOrPackageName": this.packageName,
      "description": this.description,
      "sdkType": this.sdkType,
      "scheme": this.layered_url,
      // "codeType": this.codeType,
      "devices": this.deviceSelectedList,
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

    this.logger.debug(formData);
  }

  private beforeSubmit_ios(formData) {

    const file = formData.splice(5, 1);

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
      "platform": "ios",
      "appName": this.appName,
      "bundleIdOrPackageName": this.bundleId,
      "description": this.description,
      "sdkType": this.sdkType,
      "scheme": this.layered_url,
      // "codeType": this.codeType,
      "devices": this.deviceSelectedList,
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

    this.logger.debug(formData);
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
      "platform": this.platform,
      "appName": this.appName,
      "bundleIdOrPackageName": this.platform === 'android' ? this.packageName : this.bundleId,
      "description": this.description,
      "sdkType": this.sdkType,
      "scheme": this.layered_url,
      // "codeType": this.codeType,
      "devices": this.deviceSelectedList,
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

    this.logger.debug(formData);
  }


  private success(res) {

    this.buttonDisable = false;

    this.logger.debug(res);

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

  private success_android(res) {

    this.buttonDisable = false;

    this.logger.debug(res);

    if (res.success) {
      const option = {
        url: this.url + "/api/useApp/addApp",
        type: "POST",
        beforeSubmit: this.beforeSubmit_ios.bind(this),
        success: this.success.bind(this)
      };

      jQuery('#registerAppForm').ajaxSubmit(option);
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

  private error(error) {
    this.logger.debug('reg_app error = ', error);
    this.buttonDisable = false;

    swal({
      position: 'center',
      type: 'error',
      titleText: "Connection Refused",
      showConfirmButton: false,
      timer: 2000
    }).catch(swal.noop);
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
