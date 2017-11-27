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

      if (page === -3 && this.curPage !== 1) {
        this.curPage--;
      } else if ( page === -4) {
        this.curPage = 1;
      } else if (page === -2 && this.curPage !== this.paginationNum) {
        this.curPage++;
      } else if (page === -1) {
        this.curPage = this.paginationNum;
      } else {
        this.curPage = page;
      }

      const id = this.curPage -1;

      // 分页当前页激活，移除其他激活项
      for (let i = 0; i < this.paginationNum; i++) {
        if (i === id) {
          jQuery('#li' + i).addClass('active');
        } else {
          jQuery('#li' + i).removeClass('active');
        }
      }
      this.licenses = this.paginationService.paginationChange(this.curPage, null);


    }


    if (this.curPage === 1 ) {
      jQuery('#first').addClass('disabled');
      jQuery('#previous').addClass('disabled');
    } else {
      jQuery('#first').removeClass('disabled');
      jQuery('#previous').removeClass('disabled');
    }

    if (this.curPage === this.paginationNum) {
      jQuery('#last').addClass('disabled');
      jQuery('#next').addClass('disabled');
    } else {
      jQuery('#last').removeClass('disabled');
      jQuery('#next').removeClass('disabled');
    }

  }


  ngOnInit() {
    this.licenseService.getAllLicense('5a0269747ac9d897d0f57b60')
      .then(licenses => {

        // 计算总页面数，新建一个Array,以便使用ngFor, 因为这玩意不支持类似于for(i; i<10; i++)
        this.paginationNum = Math.ceil(licenses.length/5); // 向上取整
        this.paginationArr = Array(this.paginationNum).fill(0);

        this.licenses = this.paginationService.paginationChange(1, licenses);

        // 当页面加载完毕时， 将第一个pagination置为active
        jQuery('document').ready(function () {
          jQuery('#li0').addClass('active');
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

                // 处理如果删除License导致减少页数
                self.paginationNum = Math.ceil(licenses.length/5); // 向上取整

                if (self.curPage > self.paginationNum) {
                  self.paginationArr = Array(self.paginationNum).fill(0);
                }
                self.licenses = self.paginationService.paginationChange(0, licenses);

                self.changePagination(self.curPage -1);
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
