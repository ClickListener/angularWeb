/**
 * Created by zhangxu on 2017/12/13.
 */
import {Component, DoCheck, OnChanges, OnInit, SimpleChanges, ViewChild} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {PaginationComponent} from "../../tools/pagination/pagination.component";
import {SchemeService} from "../../../services/scheme.service";
import swal from "sweetalert2";
import {Input} from "@angular/compiler/src/core";

@Component({
  selector: 'scheme-manager',
  templateUrl: './scheme-manager.component.html',
  styleUrls: ['./scheme-manager.component.css']
})

export class SchemeManagerComponent implements OnInit {



  param: string;

  schemes = [
    {
      "project": "SDK",
      "version": "1.0.0",
      "CreateTime": "2017-12-12"
    },
    {
      "project": "SDK",
      "version": "2.0.0",
      "CreateTime": "2017-12-12"
    },
    {
      "project": "SDK",
      "version": "3.0.0",
      "CreateTime": "2017-12-12"
    },
    {
      "project": "SDK",
      "version": "4.0.0",
      "CreateTime": "2017-12-12"
    },
    {
      "project": "SDK",
      "version": "2.0.0",
      "CreateTime": "2017-12-12"
    },
    {
      "project": "SDK",
      "version": "3.0.0",
      "CreateTime": "2017-12-12"
    },
    {
      "project": "SDK",
      "version": "4.0.0",
      "CreateTime": "2017-12-12"
    },
    {
      "project": "SDK",
      "version": "2.0.0",
      "CreateTime": "2017-12-12"
    },
    {
      "project": "SDK",
      "version": "3.0.0",
      "CreateTime": "2017-12-12"
    },
    {
      "project": "SDK",
      "version": "4.0.0",
      "CreateTime": "2017-12-12"
    }
  ];

  singlePage: Array<any>;

  searchVersion: string;

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

  ngOnInit(): void {}

  constructor(private activatedRoute: ActivatedRoute, private schemeService: SchemeService) {

    // 如果同一个页面，使用同样的url，但是参数不同，只有第一次加载的时候，会走constructor(),和ngOnInit()方法，快照版式无法实时的获取新的参数
    // stackoverflow 中问题：
    // https://stackoverflow.com/questions/39533291/angular2-router-2-0-0-not-reloading-components-when-same-url-loaded-with-differe

    // 官方建议使用paramMap 替代 params
    activatedRoute.paramMap.subscribe(paramMap => {
      this.param = paramMap['params'].param;
    });
    schemeService.queryScheme(this.param, '5a0269747ac9d897d0f57b60')
      .then(res => {
        if (res.success) {
          this.paginationComponent.init(4, res.data);
        }
      })
      .catch(error => {
        console.log('error = ' + error.toString());
      });

  }


  schemeChange($event) {
    this.singlePage = $event;
  }

  deleteScheme(version: string) {
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
      self.schemeService.deleteScheme(self.param, version)
        .then(res => {
          console.log('res = ' + JSON.stringify(res));
          if (res.success) {
            self.schemeService.queryScheme(self.param,'5a0269747ac9d897d0f57b60')
              .then(response => {
                self.paginationComponent.deleteItem(response.data);
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



  // private findBySearch(): any {
  //   const self = this;
  //   const searchResult = [];
  //   if (this.schemeAll !== undefined) {
  //     if (this.searchVersion !== undefined && this.searchVersion !== null && this.searchVersion !== '') {
  //       this.schemeAll.forEach(function (scheme) {
  //         if (scheme.version.indexOf(self.searchVersion) !== -1) {
  //           searchResult.push(scheme);
  //         }
  //       });
  //     } else {
  //       return this.schemeAll;
  //     }
  //   }
  //   return searchResult;
  // }









}
