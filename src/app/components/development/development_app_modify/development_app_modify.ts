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

import * as myGlobals from '../../../../environments/config';

declare const jQuery: any;

@Component({
  templateUrl: './development_app_modify.html',
  styleUrls: ['./development_app_modify.css']
})

export class DevelopmentAppModifyComponent implements DoCheck {


  url = myGlobals.url;

  appInfo: any;

  appIcon = true;

  buttonDisable = false;  // 提交按钮状态

  deviceNumberList = [
    100,
    200,
    500,
    1000
  ];

  expiredDate: string;

  deviceList = [
    {
      deviceName: 'BP3',
      isValid: true
    },
    {
      deviceName: 'BP3M',
      isValid: true
    },
    {
      deviceName: 'BP3l',
      isValid: true
    },
    {
      deviceName: 'BP5',
      isValid: false
    },
    {
      deviceName: 'BP7',
      isValid: true
    },
    {
      deviceName: 'BP7S',
      isValid: true
    },
    {
      deviceName: 'BPM1',
      isValid: true
    },
    {
      deviceName: 'KN-550BT',
      isValid: true
    },
    {
      deviceName: 'ABI',
      isValid: true
    },
    {
      deviceName: 'ABP100',
      isValid: true
    },
    {
      deviceName: 'AM3',
      isValid: true
    },
    {
      deviceName: 'AM3S',
      isValid: true
    },
    {
      deviceName: 'AM4',
      isValid: true
    },
    {
      deviceName: 'PO3',
      isValid: true
    },
    {
      deviceName: 'HS2',
      isValid: true
    },
    {
      deviceName: 'HS3',
      isValid: true
    },
    {
      deviceName: 'HS4',
      isValid: true
    },
    {
      deviceName: 'HS4S',
      isValid: true
    },
    {
      deviceName: 'HS5',
      isValid: true
    },
    {
      deviceName: 'HS5S',
      isValid: true
    },
    {
      deviceName: 'HS6',
      isValid: true
    },

    {
      deviceName: 'BG1',
      isValid: true
    },
    {
      deviceName: 'BG5',
      isValid: true
    },
    {
      deviceName: 'BG5S',
      isValid: true
    },
    {
      deviceName: 'ECG3',
      isValid: true
    }

  ];


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

            this.appInfo.devices.forEach((device) => {
              this.deviceList.find((_device, i, arr) => {
                if (_device.deviceName === device.deviceName) {
                  _device.isValid = false;
                  return true;
                }
              });
            });
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
          console.log('this.appInfo.expireTime = ',this.appInfo.expireTime);
        }
      });
    }


  }

  addDevice() {

    for (let i = 0; i < this.deviceList.length; i++) {
      if (this.deviceList[i].isValid) {

        this.deviceList[i].isValid = false;
        const device = new Device();
        device.deviceName = this.deviceList[i].deviceName;
        device.totalNumber = 100;

        this.appInfo.devices.push(device);

        return;
      }
    }
  }

  deleteDevice(index: number) {
    if (this.appInfo.devices.length === 1) {

    } else {

      const device_delete = this.appInfo.devices.splice(index, 1);

      this.deviceList.find((device, i, arr) => {
        if (device.deviceName === device_delete[0].deviceName) {
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



  updateApp() {

    this.buttonDisable = true;

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
    if (this.appInfo.devices[index].deviceName) {

      this.deviceList.find((device, i, arr) => {
        if (device.deviceName === this.appInfo.devices[index].deviceName) {
          device.isValid = true;
          return true;
        }
      });

    }

    this.deviceList.find((device, i, arr) => {
      if (device.deviceName === deviceName) {
        device.isValid = false;
        return true;
      }
    });


    this.appInfo.devices[index].deviceName = deviceName;

  }


}
