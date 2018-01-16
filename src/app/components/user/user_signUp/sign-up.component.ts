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

    constructor(private userService: UserService, private router: Router) {}

    signUp(name:string, email: string, password: string, confirmPassword: string) {
        console.log("email = " + email + "password = " + password);


        const signUp_info = {
          "username": name,
          "email": email,
          "password": password,
          "type": 4
        };
        this.userService.signUp(signUp_info)
            .then(() => {
                alert("注册成功");
                this.router.navigate(['/']);
            })
            .catch(error => {
                console.log("error = " + JSON.stringify(error));
            })

    }
}
