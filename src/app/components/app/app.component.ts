/**
 * Created by zhangxu on 2017/6/30.
 */

import {Component, OnInit, Input, OnChanges, SimpleChanges, DoCheck} from "@angular/core";
import {User} from "../../model/User";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {isUndefined} from "util";
declare const $: any;
@Component({
    selector: 'my-app',

    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']

})
export class AppComponent implements OnInit {


    user: User;
    private sideNav: any;

    constructor(private userService:UserService, private router:Router) {}

    ngOnInit(): void {

      $("#menu-toggle, .mask").click(function(e) {
        e.preventDefault();
        $(".wrapper").toggleClass("toggled");
      });


      // 初始化的时候
      this.clickActionForSideNav();
      // 当屏幕变化的时候
      const self = this;
      $(window).resize(function () {
        self.clickActionForSideNav();
      });

    }

    // 当屏幕小于992时，点击侧边栏选项，侧边栏自动隐藏
    private clickActionForSideNav(): void {
      if ($(window).width() < 992) {
        // 当页面大小变化的时候，会给标签绑定多次点击事件。
        $("li>ul>li").unbind('click').click(function (e) {
          e.preventDefault();
          $(".wrapper").toggleClass("toggled");
        });

        $("li.class-li").unbind('click').click(function (e) {
          e.preventDefault();
          $(".wrapper").toggleClass("toggled");
        });
      } else {
        $("li>ul>li").unbind('click');
        $("li.class-li").unbind('click');
      }
    }

  // 防止向上冒泡
  stop_Propagation(event): void {

    if (event && event.stopPropagation) {
      event.stopPropagation();
    } else {
      window.event.cancelBubble=true;
    }

  }

    signOut(): void {
        console.log('signOut');
        this.userService.signOut()
            .then(() => {
                this.router.navigate(['/']);
            })
            .catch((error:any) => {
                console.log('managerComponent---error = ' + error);
            });
    }




}
