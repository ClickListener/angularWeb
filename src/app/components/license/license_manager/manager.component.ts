/**
 * Created by zhangxu on 2017/9/19.
 */
import {Component, DoCheck, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {Router} from '@angular/router';
import {User} from '../../../model/User';
import {LicenseService} from '../../../services/license.service';
import {License} from '../../../model/License';

import swal from 'sweetalert2';

@Component({
  selector: 'manager-license',
  templateUrl: './manager.component.html',
  styleUrls: ['manager.component.css']
})

export class ManagerComponent implements OnInit, OnChanges {



  user: User;
  licenses: License[];

  ngOnChanges(): void {
    console.log('ngOnChanges()');
  }

  // 防止向上冒泡
  stop_Propagation(event): void {

    if (event && event.stopPropagation) {
      event.stopPropagation();
    } else {
      window.event.cancelBubble=true;
    }

  }

  constructor(private userService: UserService, private router: Router, private licenseService: LicenseService) {
    console.log('this.license = ' + JSON.stringify(this.licenses));
  }


  ngOnInit() {
    this.licenseService.getAllLicense('5a0269747ac9d897d0f57b60')
      .then(licenses => {
        this.licenses = licenses;
      })
      .catch(error => {
        console.log('error = ' + JSON.stringify(error));
      });

    this.user = this.userService.user;

  }


  createNewLicense(): void {
    this.router.navigate(['./create-newLicense']);
  }

  // 下载License
  downloadLicense(licenseId: string): void {
    this.licenseService.downloadLicense(licenseId);
  }

  // 修改License，跳转到修改界面
  modifyLicense(licenseId: string): void {

    this.router.navigate(['./modify-license', licenseId]);
  }

  deleteLicense(licenseId: string): void {

    console.log('deleteLicense()');


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
      self.licenseService.deleteLicense(licenseId)
        .then(res => {
          console.log('res = ' + JSON.stringify(res));
          if (res.success) {
            self.licenseService.getAllLicense('5a0269747ac9d897d0f57b60')
              .then(licenses => {
                self.licenses = licenses;
                console.log('aa = ' + JSON.stringify(licenses));
              })
              .catch(error => {
                console.log('error => ' + JSON.stringify(error));
              });
            swal(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            );
          } else {
            swal(
              'Fail!',
              'Something went wrong!',
              'error'
            );
          }
        })
        .catch(error => {
          console.log('ManagerComponent--error = ' + JSON.stringify(error));
        });
    }).catch(swal.noop);


  }

}
