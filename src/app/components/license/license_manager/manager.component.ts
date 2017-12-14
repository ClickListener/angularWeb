/**
 * Created by zhangxu on 2017/9/19.
 */
import {AfterViewInit, Component, DoCheck, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {Router} from '@angular/router';
import {User} from '../../../model/User';
import {LicenseService} from '../../../services/license.service';
import {License} from '../../../model/License';


import swal from 'sweetalert2';
import {PaginationComponent} from "../../tools/pagination/pagination.component";

declare let jQuery:any;

@Component({
  selector: 'manager-license',
  templateUrl: './manager.component.html',
  styleUrls: ['manager.component.css']
})

export class ManagerComponent implements OnInit {


  data = 10;


  user: User;
  licenses: License[];
  paginationNum = 0; // 分页数
  curPage = 1; // 当前页数
  paginationArr:Array<any>;

  @ViewChild(PaginationComponent)
  private paginationComponent: PaginationComponent;


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


  licensesChange($event) {
    this.licenses = $event;
  }



  ngOnInit() {

    this.licenseService.getAllLicense('5a0269747ac9d897d0f57b60')
      .then(licenses => {
          this.paginationComponent.init(5, licenses);
      })
      .catch(error => {
        console.log('error = ' + error.toString());
      });
    this.user = this.userService.user;

  }


  createNewLicense(): void {
    this.router.navigate(['./create-newLicense']);
  }

  // 下载License
  downloadLicense(licenseId: string): void {
    this.licenseService.downloadLicense(licenseId)
      .then(res => {
        console.log('res = ' + res);
        if (res.success) {
          swal({
            position: 'bottom-right',
            type: 'success',
            titleText: 'Download successfully',
            showConfirmButton: false,
            timer: 2000,
            padding: 0
          }).catch(swal.noop);
        } else {
          swal(
            'Fail!',
            res.message,
            'error'
          ).catch(swal.noop);
        }

      })
      .catch(error => {
        console.log('error = ' + error);
      });
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

                self.paginationComponent.deleteItem(licenses);

              })
              .catch(error => {
                console.log('error => ' + error.toString());
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
