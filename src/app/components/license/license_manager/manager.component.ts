/**
 * Created by zhangxu on 2017/9/19.
 */
import {AfterViewInit, Component, DoCheck, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {Router} from '@angular/router';
import {User} from '../../../model/User';
import {LicenseService} from '../../../services/license.service';
import {License} from '../../../model/License';

import swal from 'sweetalert2';
import {PaginationService} from '../../../services/pagination.service';

declare let jQuery:any;

@Component({
  selector: 'manager-license',
  templateUrl: './manager.component.html',
  styleUrls: ['manager.component.css']
})

export class ManagerComponent implements OnInit, OnChanges {



  user: User;
  licenses: License[];
  paginationNum = 0; // 分页数
  curPage = 1; // 当前页数
  paginationArr:Array<any>;

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

  constructor(private userService: UserService, private router: Router, private licenseService: LicenseService,
              private paginationService: PaginationService) {
    console.log('this.license = ' + JSON.stringify(this.licenses));
  }


  // 根据点击显示数据
  changePagination(page:number) {

    if (this.curPage !== page) {
      this.curPage = page;


      const id = page -1;

      // 分页数量激活
      for (let i = 0; i < this.paginationNum; i++) {
        if (i === id) {
          jQuery('#li' + i).addClass('active');
        } else {
          jQuery('#li' + i).removeClass('active');
        }
      }
      console.log(jQuery('#li1'));

      this.licenses = this.paginationService.paginationChange(page, null);
    }

  }


  ngOnInit() {
    this.licenseService.getAllLicense('5a0269747ac9d897d0f57b60')
      .then(licenses => {
        console.log('licenses = ' + JSON.stringify(licenses));
        console.log('licenses.length = ' + licenses.length);
        this.paginationNum = Math.ceil(licenses.length/2); // 向上取整
        console.log('this.paginationNum = ' + this.paginationNum);
        this.paginationArr = Array(this.paginationNum).fill(0);

        this.licenses = this.paginationService.paginationChange(1, licenses);

        // 当页面加载完毕时， 将第一个pagination置为active
        jQuery('document').ready(function () {
          jQuery('#li0').addClass('active');
          console.log('ready()');
        });

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
            title: 'Download successfully',
            showConfirmButton: false,
            timer: 2000
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
                self.licenses = self.paginationService.paginationChange(0, licenses);
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
