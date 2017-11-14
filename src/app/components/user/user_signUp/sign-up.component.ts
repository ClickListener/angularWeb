/**
 * Created by zhangxu on 2017/7/13.
 */
import {Component} from "@angular/core";
import {UserService} from "../../../services/user.service";

import {Router} from '@angular/router'

@Component({
    selector: 'sign-up',
    templateUrl : './sign-up.component.html',
    styleUrls : ['./sign-up.component.css']
})

export class SignUpComponent {

    constructor(private userService : UserService, private router: Router) {}

    signUp(email: string, password: string) {
        console.log("email = " + email + "password = " + password);

        this.userService.signUp({"email": email, "password":password})
            .then(() => {
                alert("注册成功");
                this.router.navigate(['/'])
            })
            .catch(error => {
                console.log("error = " + JSON.stringify(error));
            })

    }
}