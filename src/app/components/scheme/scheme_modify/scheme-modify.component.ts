/**
 * Created by zhangxu on 2017/12/13.
 */
import {Component} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {SchemeService} from "../../../services/scheme.service";
import {FileUploaderCustom} from "../../../services/FileUploaderCustom";
import swal from "sweetalert2";
import {UserService} from "../../../services/user.service";

declare const jQuery: any;

@Component({
  selector: 'scheme-modify',
  templateUrl: './scheme-modify.component.html',
  styleUrls: ['./scheme-modify.component.css']
})

export class SchemeModifyComponent {

  selectedScheme: any;

  constructor(private activatedRoute: ActivatedRoute, private schemeService: SchemeService, private router: Router, private userService: UserService) {

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
        }
      })
      .catch(error => {
        console.log(error);
      });


    jQuery(document).ready(function () {
      jQuery('#inputView').on('click', '.add', function () {
        console.log('click');
        jQuery('#inputView').append('<div>\n' +
          '              <input type="file" name="addFile"/>\n' +
          '              <a class="add"><i class="fa fa-plus"></i></a>\n' +
          '              <a class="delete"><i class="fa fa-minus"></i></a>\n' +
          '            </div>');
      });

      jQuery('#inputView').on('click', '.delete', function () {
        console.log('delete');
        if (jQuery('#inputView').children().length !== 1) {
          jQuery(this).parent().remove();
        }

      });
    });


  }


  private submitForm() {
    console.log('submitForm()');
    const options = {
      url: "http://localhost:3001/api/app/updateInfo",           // 默认是form的action，如果声明，则会覆盖
      type: 'POST',                                          // 默认是form的method，如果声明，则会覆盖
      beforeSubmit: this.beforeSubmit.bind(this),            // 提交前的回调函数
      success: this.success.bind(this)                       // 提交后的回调函数

    };
    jQuery('#createForm').ajaxSubmit(options);
  }

  private beforeSubmit(formData) {

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


}


