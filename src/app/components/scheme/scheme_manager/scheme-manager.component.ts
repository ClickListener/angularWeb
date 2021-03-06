/**
 * Created by zhangxu on 2017/12/13.
 */
import {Component, DoCheck, OnChanges, OnInit, SimpleChanges, ViewChild} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {PaginationComponent} from "../../tools/pagination/pagination.component";
import {SchemeService} from "../../../services/scheme.service";
import swal from "sweetalert2";
import {Input} from "@angular/compiler/src/core";
import {UserService} from "../../../services/user.service";
import {NGXLogger} from "ngx-logger";

@Component({
  selector: 'scheme-manager',
  templateUrl: './scheme-manager.component.html',
  styleUrls: ['./scheme-manager.component.css']
})

export class SchemeManagerComponent {



  param: string;

  schemeAll: Array<any>;

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

  constructor(private activatedRoute: ActivatedRoute, private schemeService: SchemeService,
              private userService: UserService, private router: Router, private logger: NGXLogger) {

    if (!userService.user) {
      this.router.navigate(['/sign-in']);
      return;
    }

    // 如果同一个页面，使用同样的url，但是参数不同，只有第一次加载的时候，会走constructor(),和ngOnInit()方法，快照版式无法实时的获取新的参数
    // stackoverflow 中问题：
    // https://stackoverflow.com/questions/39533291/angular2-router-2-0-0-not-reloading-components-when-same-url-loaded-with-differe

    // 官方建议使用paramMap 替代 params
    activatedRoute.paramMap.subscribe(paramMap => {
      this.param = paramMap['params'].param;

      this.searchVersion = '';

      const fileInfo = {
        "userId": userService.user._id,
        "token": userService.token.token,
        "appName": this.param
      };

      schemeService.queryScheme(fileInfo)
        .then(res => {
          if (res.success) {
            this.schemeAll = res.data.reverse();
            this.paginationComponent.init(4, this.findBySearch());
          }
        })
        .catch(error => {
          this.logger.debug('error = ' + error.toString());
        });
    });


  }


  schemeChange($event) {
    this.singlePage = $event;
  }

  deleteScheme(version: string, platform: string) {
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

      const schemeInfo = {
        "userId": self.userService.user._id,
        "token": self.userService.token.token,
        "appName": self.param,
        "version": version,
        "platform": platform
      };
      self.schemeService.deleteScheme(schemeInfo)
        .then(res => {
          if (res.success) {
            const fileInfo = {
              "userId": self.userService.user._id,
              "token": self.userService.token.token,
              "appName": self.param,
            };
            self.schemeService.queryScheme(fileInfo)
              .then(response => {
                self.schemeAll = response.data.reverse();
                self.paginationComponent.deleteItem(self.findBySearch());
              })
              .catch(error => {
                this.logger.debug('error => ' + error.toString());
              });
            swal(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            );
          }
        })
        .catch(error => {
          this.logger.debug('ManagerComponent--error = ' + JSON.stringify(error));
        });
    }).catch(swal.noop);
  }



  private findBySearch(): any {
    const self = this;
    const searchResult = [];
    if (this.schemeAll !== undefined) {

      if (this.searchVersion !== undefined && this.searchVersion !== null && this.searchVersion !== '') {

        this.schemeAll.forEach(function (scheme) {
          if (scheme.version.indexOf(self.searchVersion) !== -1) {
            searchResult.push(scheme);
          }
        });
      } else {
        return this.schemeAll;
      }
    }
    return searchResult;
  }

  inputChange() {
    this.paginationComponent.init(4, this.findBySearch());
  }








}
