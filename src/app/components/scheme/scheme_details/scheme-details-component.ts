/**
 * Created by zhangxu on 2017/12/13.
 */
import {Component} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {SchemeService} from "../../../services/scheme.service";
import swal from "sweetalert2";
import {UserService} from "../../../services/user.service";

declare const jQuery: any;

@Component({
  selector: 'scheme-details',
  templateUrl: './scheme-details.component.html',
  styleUrls: ['./scheme-details.component.css']
})

export class SchemeDetailsComponent {


  schemeSelected: any;


  constructor(private activatedRoute: ActivatedRoute, private schemeService: SchemeService, private userService: UserService) {

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
        this.schemeSelected = res.data;
      })
      .catch(error => {
        console.log(error);
      });


  }


  deleteFile(fileName:string, description: string): void {
    const body = {
      "_id": this.schemeSelected._id,
      "fileName": fileName,
      "description": description
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


