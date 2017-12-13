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
      console.log('ngOnInit()');

      $("#menu-toggle, .appear, .mask").click(function(e) {
        e.preventDefault();
        $(".wrapper").toggleClass("toggled");
      });

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
