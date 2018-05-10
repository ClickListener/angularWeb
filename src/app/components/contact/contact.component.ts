import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as myGlobals from '../../../environments/config';
declare const jQuery: any;


import {UserService} from "../../services/user.service";
import swal from "sweetalert2";
import {NGXLogger} from "ngx-logger";
import {Router} from "@angular/router";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class ContactComponent implements OnInit {


  requester: string;
  subject: string;
  description: string;

  fileList: Array<File>;

  constructor(private userService: UserService, private logger: NGXLogger, private router: Router) {
    this.fileList = new Array();
  }

  ngOnInit() {
  }


  submit() {

    const formData: FormData = new FormData();
    formData.append('description', this.description);
    formData.append('subject', this.subject);
    formData.append('email', this.requester);
    formData.append('priority', '1');
    formData.append('status', '2');


    if (this.fileList.length !== 0) {

      for (let i = 0; i < this.fileList.length; i++) {
        formData.append('attachments[]', this.fileList[i], this.fileList[i].name);
      }
    }


    this.userService.contactUs(formData)
      .then(res => {
        if (res.status === 201) {

          this.router.navigate(['/']);
          swal({
            position: 'center',
            type: 'success',
            titleText: "Send successfully!",
            showConfirmButton: false,
            timer: 2000
          }).catch(swal.noop);
        }
      })
      .catch(error => {
        swal({
          position: 'center',
          type: 'error',
          titleText: 'Error ID: ' + error['status'],
          showConfirmButton: true,
          // timer: 2000
        }).catch(swal.noop);
      });
  }


  previewImg(event) {

    const file = event.target.files[0];
    if (file) {
      this.fileList.push(file);
    }
  }


  removeFile(index: number) {
    this.fileList.splice(index, 1);
  }


}
