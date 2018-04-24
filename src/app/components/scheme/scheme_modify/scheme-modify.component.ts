/**
 * Created by zhangxu on 2017/12/13.
 */
import {Component, DoCheck} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {SchemeService} from "../../../services/scheme.service";
import {FileUploaderCustom} from "../../../services/FileUploaderCustom";
import swal from "sweetalert2";
import {UserService} from "../../../services/user.service";

import * as myGlobals from '../../../../environments/config';
import {Device} from "../../../model/Device";

declare const jQuery: any;

@Component({
  selector: 'scheme-modify',
  templateUrl: './scheme-modify.component.html',
  styleUrls: ['./scheme-modify.component.css']
})

export class SchemeModifyComponent {


  url = myGlobals.url;

  selectedScheme: any;


  CN = false;
  AS = false;
  NA = false;
  LA = false;
  OA = false;
  ME = false;
  AF = false;
  EU = false;
  RU = false;

  fileSelectList = [];


  constructor(private activatedRoute: ActivatedRoute, private schemeService: SchemeService, private router: Router,
              private userService: UserService) {

    if (!userService.user) {
      this.router.navigate(['/sign-in']);
      return;
    }

    const schemeID = activatedRoute.snapshot.paramMap['params'].schemeID;


    const schemeInfo = {
      "userId": userService.user._id,
      "token": userService.token.token,
      "fileId": schemeID
    };

    this.schemeService.findFileInfo(schemeInfo)
      .then(res => {
        if (res.success) {
          this.selectedScheme = res.data;

          this.selectedScheme.openRegion.forEach( region => {
            switch (region) {
              case 'CN':
                this.CN = true;
                break;
              case 'AS':
                this.AS = true;
                break;
              case 'NA':
                this.NA = true;
                break;
              case 'LA':
                this.LA = true;
                break;
              case 'OA':
                this.OA = true;
                break;
              case 'ME':
                this.ME = true;
                break;
              case 'AF':
                this.AF = true;
                break;
              case 'EU':
                this.EU = true;
                break;
              case 'RU':
                this.RU = true;
                break;
            }
          });
        }
      })
      .catch(error => {
        console.log(error);
      });

    this.fileSelectList.push(0);
  }


  private submitForm() {
    console.log('submitForm()');
    const options = {
      url: this.url + "/api/app/updateInfo",           // 默认是form的action，如果声明，则会覆盖
      type: 'POST',                                          // 默认是form的method，如果声明，则会覆盖
      beforeSubmit: this.beforeSubmit.bind(this),            // 提交前的回调函数
      success: this.success.bind(this),                       // 提交后的回调函数
      error: this.error.bind(this)

    };
    jQuery('#createForm').ajaxSubmit(options);
  }

  private beforeSubmit(formData, form, options) {

    console.log('form = ', form);
    console.log('options = ', options);

    const regionArr = [];

    if (this.CN) {
      regionArr.push('CN');
    }

    if (this.AS) {
      regionArr.push('AS');
    }

    if (this.NA) {
      regionArr.push('NA');
    }

    if (this.LA) {
      regionArr.push('LA');
    }

    if (this.OA) {
      regionArr.push('OA');
    }

    if (this.ME) {
      regionArr.push('ME');
    }

    if (this.AF) {
      regionArr.push('AF');
    }

    if (this.EU) {
      regionArr.push('EU');
    }

    if (this.RU) {
      regionArr.push('RU');
    }

    console.log('regionArr = ', regionArr);

    const origin = {
      name: "openRegion",
      value: JSON.stringify(regionArr)
    };
    formData.splice(0, 0, origin);

    const action = {
      name: 'action',
      value: 'U',
      type: 'text'
    };

    formData.splice(0, 0, action);

    const _id = {
      "name": "_id",
      "value": this.selectedScheme._id
    };
    formData.splice(0, 0, _id);

    const resourceName = {
      "name": "resourceName",
      "value": this.selectedScheme.resourceName
    };
    formData.splice(0, 0, resourceName);

    const version = {
      "name": "version",
      "value": this.selectedScheme.version,
    };
    formData.splice(0, 0, version);

    const token = {
      "name": "token",
      "value": this.userService.token.token
    };
    formData.splice(0, 0, token);

    const userId = {
      "name": "userId",
      "value": this.userService.user._id
    };
    formData.splice(0, 0, userId);
    const beta = {
      "name": "beta",
      "value": this.selectedScheme.beta
    };

    formData.splice(0, 0, beta);


    console.log(formData);
    // 可以校验输入参数
    return true;

  }

  private success(response) {
    console.log(response);
    if (response.success) {
      this.router.navigate(['/scheme-main', this.selectedScheme.resourceName]);
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

  private error(error) {
    console.log(error);

    swal({
      position: 'center',
      type: 'error',
      titleText: "Connection Refused",
      showConfirmButton: false,
      timer: 2000
    }).catch(swal.noop);
  }


  addFile() {

    const last = this.fileSelectList[this.fileSelectList.length-1];

    this.fileSelectList.push(last + 1);
  }

  deleteFile(index: number) {
    if (this.fileSelectList.length === 1) {

    } else {
      jQuery('#file' + this.fileSelectList[index]).remove();
      this.fileSelectList.splice(index, 1);


    }

  }


}


