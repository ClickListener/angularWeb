/**
 * Created by zhangxu on 2017/12/13.
 */
import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {FileUploader} from "ng2-file-upload";
import swal from "sweetalert2";
import {FileUploaderCustom} from "../../../services/FileUploaderCustom";
import {HttpClient} from "@angular/common/http";

declare const jQuery: any;

@Component({
  selector: 'scheme-create',
  templateUrl: './scheme-create.component.html',
  styleUrls: ['./scheme-create.component.css']
})

export class SchemeCreateComponent implements OnInit {

  resourceName: string;
  description: string;

  version: string;  // 版本号

  beta: boolean;


  // fileUploader 初始化
  uploader: FileUploaderCustom = new FileUploaderCustom ({
    url: "http://localhost:3001/api/app/upload",
    method: "POST",
    itemAlias: "thumbnail"
  });


  ngOnInit(): void {
    console.log('ngOnInit()');
  }


  constructor(private activatedRoute: ActivatedRoute, private router: Router) {

    // 通过 parent 属性获得父组件，通过父组件的paramMap获得参数
    this.activatedRoute.parent.paramMap.subscribe(paramMap => {
      this.resourceName = paramMap['params'].param;
      console.log('this.param = ' + this.resourceName);
    });
  }


  // 当选择或者改变选择文件得时候，会回调这个方法
  selectedFileOnChanged(event) {
    console.log(event);
    console.log(this.uploader.queue[0]);
  }

  // 上传文件
  uploadFile() {

    this.beta = jQuery("input[name='beta']:checked").val();
    console.log('this.beta = ' + this.beta);

    // 增加post中的body信息
    this.uploader.onBuildItemForm = (item, form) => {
      form.append('resourceName', this.resourceName);
      form.append('version', this.version);
      form.append('description', this.description);
      form.append('beta', this.beta);
    };

    const self = this;


    this.uploader.queue[0].onComplete = function (response, status, headers) {
      console.log("response = " + response);
      console.log("status = " + status);

      const res = JSON.parse(response);

      if (res.success) {
        self.router.navigate(['/scheme-main',self.resourceName]);
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
