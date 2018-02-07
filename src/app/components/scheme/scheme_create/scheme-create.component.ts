/**
 * Created by zhangxu on 2017/12/13.
 */
import {Component, DoCheck, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {FileUploader} from "ng2-file-upload";
import swal from "sweetalert2";
import {FileUploaderCustom} from "../../../services/FileUploaderCustom";
import {HttpClient} from "@angular/common/http";
import {UserService} from "../../../services/user.service";

import * as myGlobals from '../../../../environments/config';

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


  constructor(private activatedRoute: ActivatedRoute, private router: Router,
              private http: HttpClient, private userService: UserService) {

    // 通过 parent 属性获得父组件，通过父组件的paramMap获得参数
    this.activatedRoute.parent.paramMap.subscribe(paramMap => {
      this.resourceName = paramMap['params'].param;
      console.log('this.param = ' + this.resourceName);
    });

    jQuery(document).ready(function () {
      jQuery('#inputView').on('click', '.add', function () {
        console.log('click');
        jQuery('#inputView').append('<div>\n' +
          '          <input type="file" name="thumbnail"/>\n' +
          '          <a class="add"><i class="fa fa-plus"></i></a>\n' +
          '          <a class="delete"><i class="fa fa-minus"></i></a>\n' +
          '        </div>');
      });

      jQuery('#inputView').on('click', '.delete', function () {
        console.log('delete');
        if (jQuery('#inputView').children().length !== 1 ) {
          jQuery(this).parent().remove();
        }

      });
    });


  }

  private submitForm() {
    const options = {
      url: this.url + "/api/app/upload",           // 默认是form的action，如果声明，则会覆盖
      type: 'POST',                                          // 默认是form的method，如果声明，则会覆盖
      beforeSubmit: this.beforeSubmit.bind(this),            // 提交前的回调函数
      success: this.success.bind(this)                       // 提交后的回调函数

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

    const resourceName = {
      name: "resourceName",
      value: this.resourceName,
      type: "text"
    };

    formData.splice(0, 0, resourceName);
    console.log(formData);

  }

  private success(response) {
    console.log('res = ', response);
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



}
