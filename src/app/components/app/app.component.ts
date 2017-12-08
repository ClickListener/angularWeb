/**
 * Created by zhangxu on 2017/6/30.
 */

import {Component, OnInit, Input, OnChanges, SimpleChanges, DoCheck} from "@angular/core";
import {User} from "../../model/User";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {isUndefined} from "util";
declare const $: any;
declare const M: any;
@Component({
    selector: 'my-app',

    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']

})
export class AppComponent implements OnInit, OnChanges, DoCheck {


    user: User;
    private sideNav: any;

    constructor(private userService:UserService, private router:Router) {}

    ngOnInit(): void {
        console.log('ngOnInit()');
      const elem = document.querySelector('.sidenav');
      this.sideNav = new M.Sidenav(elem);

    }

    ngOnChanges(changes: SimpleChanges): void {
        console.log('ngOnChanges()');
    }

    signOut(): void {
        console.log('signOut');
        this.userService.signOut()
            .then(() => {
                this.router.navigate(['/']);
            })
            .catch((error:any) => {
                console.log('managerComponent---error = ' + error);
            })
    }

    closeNav(): void {
      this.sideNav.close();
      $('#container').css({"padding-left": "0px"});
    }

    openNav(): void {
      this.sideNav.open();
      if ($(window).width() > 922) {
        $('#container').css({"padding-left": "300px"});
      }
    }

    ngDoCheck(): void {
        this.user = this.userService.user;
    }




}
