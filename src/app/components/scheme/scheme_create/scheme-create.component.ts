/**
 * Created by zhangxu on 2017/12/13.
 */
import {Component, DoCheck, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {FileUploader} from "ng2-file-upload";
import swal from "sweetalert2";
import {HttpClient} from "@angular/common/http";
import {UserService} from "../../../services/user.service";

import * as myGlobals from '../../../../environments/config';
import {NGXLogger} from "ngx-logger";

declare const jQuery: any;

@Component({
  selector: 'scheme-create',
  templateUrl: './scheme-create.component.html',
  styleUrls: ['./scheme-create.component.css']
})

export class SchemeCreateComponent {



  url = myGlobals.url;

  resourceName: string;
  description: string;

  version: string;  // 版本号


  CN = true;
  AS = true;
  NA = true;
  LA = true;
  OA = true;
  ME = true;
  AF = true;
  EU = true;
  RU = true;


  fileSelectList = [];



  constructor(private activatedRoute: ActivatedRoute, private router: Router,
              private http: HttpClient, private userService: UserService, private logger: NGXLogger) {


    if (!userService.user) {
      this.router.navigate(['/sign-in']);
      return;
    }

    // 通过 parent 属性获得父组件，通过父组件的paramMap获得参数
    this.activatedRoute.parent.paramMap.subscribe(paramMap => {
      this.resourceName = paramMap['params'].param;
      this.logger.debug('this.param = ' + this.resourceName);
    });


    this.fileSelectList.push(0);

  }

  private submitForm() {
    let url = '';
    if (this.resourceName !== 'PublicFile') {
      url = this.url + "/api/app/upload";
    } else {
      url = this.url + "/api/app/uploadPublicFiles";
    }
    const options = {
      url: url,           // 默认是form的action，如果声明，则会覆盖
      type: 'POST',                                          // 默认是form的method，如果声明，则会覆盖
      beforeSubmit: this.beforeSubmit.bind(this),            // 提交前的回调函数
      success: this.success.bind(this),                       // 提交后的回调函数
      error: this.error.bind(this)

    };
    jQuery('#createForm').ajaxSubmit(options);
  }

  private beforeSubmit(formData, form, options) {

    this.logger.debug('form = ', form);
    this.logger.debug('options = ', options);

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

    this.logger.debug('regionArr = ', regionArr);

    const origin = {
      name: "openRegion",
      value: JSON.stringify(regionArr)
    };
    formData.splice(0, 0, origin);

    const token = {
      name: "token",
      value: this.userService.token.token
    };

    formData.splice(0, 0, token);

    const userId = {
      name: "userId",
      value: this.userService.user._id
    };

    formData.splice(0, 0, userId);


    if (this.resourceName === 'RNSDK') {
      const platform = {
        name: "platform",
        value: 'all'
      };

      formData.splice(0, 0, platform);
    }



    const action = {
      name: 'action',
      value: 'C',
      type: 'text'
    };

    formData.splice(0, 0, action);

    const resourceName = {
      name: "resourceName",
      value: this.resourceName,
      type: "text"
    };

    formData.splice(0, 0, resourceName);
    this.logger.debug(formData);

  }

  private success(response) {
    this.logger.debug('res = ', response);
    if (response.success) {
      this.router.navigate(['/scheme-main', this.resourceName]);
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
    this.logger.debug(error);

    swal({
      position: 'center',
      type: 'error',
      titleText: "Connection Refused",
      showConfirmButton: false,
      timer: 2000
    }).catch(swal.noop);
  }



  addFile(index: number) {

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

  onlyNumber(obj: any) {

    let t;
    if (obj.version) {
      // 得到第一个字符是否为负号
      t = obj.version.charAt(0);
    }

    // 先把非数字的都替换掉，除了数字和.
    obj.version = obj.version.replace(/[^\d\.]/g, '');
    // 必须保证第一个为数字而不是.
    obj.version = obj.version.replace(/^\./g, '');
    // 保证只有出现一个.而没有多个.
    obj.version = obj.version.replace(/\.{2,}/g, '.');
    // 如果第一位是负号，则允许添加
    if (t === '-') {
      obj.version = '-' + obj.version;
    }
  }


}
