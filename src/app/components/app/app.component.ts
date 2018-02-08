/**
 * Created by zhangxu on 2017/6/30.
 */

import {Component, OnInit, Input, OnChanges, SimpleChanges, DoCheck} from "@angular/core";
import {User} from "../../model/User";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {isUndefined} from "util";

declare const jQuery: any;

@Component({
  selector: 'my-app',

  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})
export class AppComponent implements OnInit, DoCheck {


  user: User;
  private sideNav: any;

  constructor(private userService: UserService, private router: Router) {
    userService.getResourceList();
  }

  ngDoCheck(): void {
    this.user = this.userService.user;


    if (this.user) {
      jQuery('#development_primary').attr('data-target', '#development_collapse');
    } else {

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


    console.log(this.user);

    if (this.user) {
      jQuery('#development_primary').attr('data-target', '#development_collapse');
    }

    // jQuery('#development_primary').attr('data-target', '#development_collapse');
    // jQuery('#development_primary').removeAttr('data-target', '#development_collapse');


    console.log(jQuery('#development_primary').data('target'));

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
    console.log('signOut');
    this.userService.signOut();

    this.router.navigate(['/']);
  }


}
