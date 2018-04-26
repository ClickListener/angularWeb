/**
 * Created by zhangxu on 2017/6/30.
 */

import {Component, OnInit, Input, OnChanges, SimpleChanges, DoCheck} from "@angular/core";
import {User} from "../../model/User";
import {UserService} from "../../services/user.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {isUndefined} from "util";
import swal from "sweetalert2";
import {Location} from "@angular/common";
import {NGXLogger} from "ngx-logger";

declare const jQuery: any;

@Component({
  selector: 'my-app',

  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})
export class AppComponent implements OnInit, DoCheck {


  user: any;
  private sideNav: any;

  constructor(private userService: UserService, private router: Router,
              private _location: Location, private logger: NGXLogger) {

    userService.getResourceList();

    this.logger.debug('url ========', _location.path())


    if (userService.user && _location.path() !== '/sign-up-confirm'
      && _location.path().indexOf('/reset-password') === -1 && _location.path().indexOf('/development-main/development-group') === -1) {

      const userInfo = {
        "userId": userService.user._id,
        "token": userService.token.token
      };

      userService.getUserInfo(userInfo);
    }
    if (userService.user && _location.path().indexOf('/reset-password') !== -1) {
      userService.signOutWithoutNavigate();
    }


  }

  ngDoCheck(): void {
    this.user = this.userService.user;


    if (this.user && this.user.companyId) {
      jQuery('#development_primary').attr('data-target', '#development_collapse');
      jQuery('#development_primary').removeAttr('class', 'active');
    } else {
      jQuery('#development_primary').removeAttr('data-target', '#development_collapse');
    }
  }

  ngOnInit(): void {

    jQuery("#menu-toggle, .mask").click(function (e) {
      e.preventDefault();
      jQuery(".wrapper").toggleClass("toggled");
    });


    // 初始化的时候
    this.clickActionForSideNav();
    // 当屏幕变化的时候
    const self = this;
    jQuery(window).resize(function () {
      self.clickActionForSideNav();
    });

    this.user = this.userService.user;


    this.logger.debug(this.user);

    if (this.user) {
      jQuery('#development_primary').attr('data-target', '#development_collapse');
    }


    this.logger.debug(jQuery('#development_primary').data('target'));

  }

  // 当屏幕小于992时，点击侧边栏选项，侧边栏自动隐藏
  private clickActionForSideNav(): void {
    if (jQuery(window).width() < 992) {
      // 当页面大小变化的时候，会给标签绑定多次点击事件。
      jQuery("li>ul>li").unbind('click').click(function (e) {
        e.preventDefault();
        jQuery(".wrapper").toggleClass("toggled");
      });

      jQuery("li.class-li").unbind('click').click(function (e) {
        e.preventDefault();
        jQuery(".wrapper").toggleClass("toggled");
      });
    } else {
      jQuery("li>ul>li").unbind('click');
      jQuery("li.class-li").unbind('click');
    }
  }

  // 防止向上冒泡
  stop_Propagation(event): void {


    if (event && event.stopPropagation) {
      event.stopPropagation();
    } else {
      window.event.cancelBubble = true;
    }

  }

  signOut(): void {

    this.logger.debug('signOut');
    this.userService.signOut();

    this.router.navigate(['/']);
  }


  navigateDocument(schemeName: string) {

    if (!this.user) {
      swal({
        text: 'Please Sign in first.',
        showCancelButton: true,
        confirmButtonText: 'Sign in',
        cancelButtonText: 'Cancel',
        allowOutsideClick: false,
        reverseButtons: true
      }).then( () => {
        this.router.navigate(['/sign-in']);
      })
        .catch(swal.noop);
    }

    // if (this.user) {
    //   this.router.navigate(['/document-main', schemeName]);
    // } else {
    //   swal({
    //     text: 'Please Sign in first.',
    //     showCancelButton: true,
    //     confirmButtonText: 'Sign in',
    //     cancelButtonText: 'Cancel',
    //     allowOutsideClick: false,
    //     reverseButtons: true
    //   }).then( () => {
    //     this.router.navigate(['/sign-in']);
    //   })
    //     .catch(swal.noop);
    //
    // }
  }


}
