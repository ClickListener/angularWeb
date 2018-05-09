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


  file: File;

  requester: string;
  subject: string;
  description: string;

  constructor(private userService: UserService, private logger: NGXLogger, private router: Router) {
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

    if (this.file) {
      formData.append('attachments[]', this.file, this.file.name);
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

    this.file = event.target.files[0];
    console.log('file = ', this.file);
  }


}
