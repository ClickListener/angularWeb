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

  // fileUploader 初始化
  uploader: FileUploaderCustom = new FileUploaderCustom ({
    url: "http://localhost:3001/api/app/updateInfo",
    method: "POST",
    itemAlias: "addFile"
  });


  constructor(private activatedRoute: ActivatedRoute, private schemeService: SchemeService, private router: Router) {

    const schemeID = activatedRoute.snapshot.paramMap['params'].schemeID;

    this.selectedScheme = schemeService.findSchemeById(schemeID);

  }





  selectedFileOnChanged(event) {
    console.log(event);
    console.log(this.uploader.queue);
  }

  // 上传文件
  uploadFile() {

    // console.log(this.uploader.queue);

    const beta = jQuery("input[name='beta']:checked").val();
    console.log('this.beta = ' + beta);

    console.log('this.description = ' + this.selectedScheme.description);

    // 增加post中的body信息
    this.uploader.onBuildItemForm = (item, form) => {
      form.append('_id', this.selectedScheme._id);
      form.append('resourceName', this.selectedScheme.resourceName);
      form.append('version', this.selectedScheme.version);
      form.append('description', this.selectedScheme.description);
      form.append('beta', beta);
    };

    const self = this;

    console.log(this.uploader.queue);


    this.uploader.queue[0].onComplete = function (response, status, headers) {
      console.log("response = " + response);
      console.log("status = " + status);

      const res = JSON.parse(response);

      if (res.success) {
        self.router.navigate(['/scheme-main',self.selectedScheme.resourceName]);
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
          titleText: res.message,
          showConfirmButton: false,
          timer: 2000,
          padding: 0
        }).catch(swal.noop);
      }
    };

    this.uploader.queue[0].onError = function (response, status, headers) {
      console.log("response = " + response);
      console.log("status = " + status);

      swal({
        position: 'bottom-right',
        type: 'error',
        titleText: 'Communication fail!',
        showConfirmButton: false,
        timer: 2000,
        padding: 0
      }).catch(swal.noop);
    };

    this.uploader.uploadAllFiles();


  }
}


