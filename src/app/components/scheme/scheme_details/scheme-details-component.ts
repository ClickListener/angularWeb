/**
 * Created by zhangxu on 2017/12/13.
 */
import {Component} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {SchemeService} from "../../../services/scheme.service";
import swal from "sweetalert2";
import {UserService} from "../../../services/user.service";
import {User} from "../../../model/User";

import * as myGlobals from '../../../../environments/config';

declare const jQuery: any;


@Component({
  selector: 'scheme-details',
  templateUrl: './scheme-details.component.html',
  styleUrls: ['./scheme-details.component.css']
})

export class SchemeDetailsComponent {


  url = myGlobals.url;
  schemeSelected: any;

  user: any;
  token: string;


  constructor(private activatedRoute: ActivatedRoute, private schemeService: SchemeService, private userService: UserService) {

    this.user = userService.user;
    this.token = userService.token.token;

    const schemeID = activatedRoute.snapshot.paramMap['params'].schemeID;
    schemeService.schemeID = schemeID;

    const fileInfo = {
      "userId": userService.user._id,
      "token": userService.token.token,
      "fileId": schemeID
    };
    schemeService.findFileInfo(fileInfo)
      .then(res => {
        console.log(res);
        if (res.success) {
          this.schemeSelected = res.data;
        }
      })
      .catch(error => {
        console.log(error);
      });


  }


  deleteFile(fileName:string, description: string, _id: string): void {
    const body = {
      "userId": this.user._id,
      "token": this.token,
      "fileName": fileName,
      "description": description,
      "_id": _id
    };

    const self = this;

    swal({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      type: 'warning',
      showCancelButton: true,
      animation: false,
      customClass: 'animated tada',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(function () {

      self.schemeService.deleteFile(body)
        .then(res => {
          if (res.success) {
            swal(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            );
            jQuery('#' + fileName.replace('.', '_')).remove();
          } else {
            swal(
              'Fail!',
              'Something went wrong!',
              'error'
            );
          }
        })
        .catch(error => {
          console.log('error = ' + error.toString());
        });
    }).catch(swal.noop);
  }
}


