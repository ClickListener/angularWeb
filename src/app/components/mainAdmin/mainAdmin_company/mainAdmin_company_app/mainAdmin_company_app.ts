/**
 * Created by zhangxu on 2018/3/28.
 */
import {Component, DoCheck} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import * as myGlobals from "../../../../../environments/config";
import {UserService} from "../../../../services/user.service";
import {AppService} from "../../../../services/app.service";
import swal from "sweetalert2";
import {Device} from "../../../../model/Device";
import {DatePipe} from "@angular/common";
import {CompanyService} from "../../../../services/company.service";

declare const jQuery: any;

@Component({
  templateUrl: './mainAdmin_company_app.html',
  styleUrls: ['./mainAdmin_company_app.css']
})

export class MainAdminCompanyAppComponent implements DoCheck {

  url = myGlobals.url;

  appInfo: any;

  appIcon = true;

  buttonDisable = false;  // 提交按钮状态

  expiredDate: string;

  deviceNumberList = [
    5,
    10,
    20,
    100
  ];

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
      isValid: true
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


  constructor(private activatedRoute: ActivatedRoute, private appService: AppService,
              private userService: UserService, private router: Router,
              private datePipe: DatePipe, private companyService: CompanyService) {

    if (!userService.user) {
      this.router.navigate(['/sign-in']);
      return;
    }
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
                if (_device.model === device.model) {
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
        max: [2099, 0, 1],
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
        device.model = this.deviceList[i].model;
        device.totalNumber = 100;
        device.deviceUsedNumber = 0;

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
      "sdkType": this.appInfo.sdkType,
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

      this.updateAppState();

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

  // 更新APP 状态
  private updateAppState() {

    const companyInfo = {
      "userId": this.userService.user._id,
      "token": this.userService.token.token,
      "cid": this.appInfo.companyId,
      "state": this.appInfo.state,
      "aid": this.appInfo._id
    };


    this.companyService.reviewCompany(companyInfo)
      .then(res => {
        console.log(res);
        if (res.success) {

          this.router.navigate(['/company/company-modify', this.appInfo.companyId, 'apps']);
          swal({
            position: 'center',
            type: 'success',
            titleText: 'Update success',
            showConfirmButton: false,
            timer: 2000,
            padding: 0,
            width: 300
          }).catch(swal.noop);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }


  selectDevice(index: number, deviceName: string) {

    jQuery('#exampleModal' + index).modal('hide');


    // 当已选择设备后，重新选择设备，则将之前的设备置成可选状态。
    if (this.appInfo.devices[index].model) {

      this.deviceList.find((device, i, arr) => {
        if (device.model === this.appInfo.devices[index].model) {
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


    this.appInfo.devices[index].model = deviceName;

  }

}
