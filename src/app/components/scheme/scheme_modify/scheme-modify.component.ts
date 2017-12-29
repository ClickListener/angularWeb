/**
 * Created by zhangxu on 2017/12/13.
 */
import {Component} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {SchemeService} from "../../../services/scheme.service";
import {FileUploaderCustom} from "../../../services/FileUploaderCustom";
import swal from "sweetalert2";

declare const jQuery: any;

@Component({
  selector: 'scheme-modify',
  templateUrl: './scheme-modify.component.html',
  styleUrls: ['./scheme-modify.component.css']
})

export class SchemeModifyComponent {

  selectedScheme: any;

  constructor(private activatedRoute: ActivatedRoute, private schemeService: SchemeService, private router: Router) {

    const schemeID = activatedRoute.snapshot.paramMap['params'].schemeID;

    this.selectedScheme = schemeService.findSchemeById(schemeID);


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
        if (jQuery('#inputView').children().length !== 1 ) {
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

    const extraData = [
      {
        name: "_id",
        value: this.selectedScheme._id,
        type: "text"
      },
      {
        name: "resourceName",
        value: this.selectedScheme.resourceName,
        type: "text"
      },
      {
        name: "version",
        value: this.selectedScheme.version,
        type: "text"
      }
    ];

    for (let i = 0; i < extraData.length; i++) {
      formData.splice(i, 0, extraData[i]);
    }
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


