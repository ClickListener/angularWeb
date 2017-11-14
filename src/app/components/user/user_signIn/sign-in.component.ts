/**
 * Created by zhangxu on 2017/7/13.
 */
import {Component} from "@angular/core";
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";
import {User} from "../../../model/User";
import {License} from "../../../model/License";


@Component({
    selector: 'sign-in',
    templateUrl : './sign-in.component.html',
    styleUrls : ['sign-in.component.css']
})

export class SignInComponent {


    constructor(private userService: UserService, private router: Router) {}

    user:User;

    signIn(email:string, password:string) : void {
        console.log('email = ' + email + " password = " + password);
        this.userService.signIn({"email": email, "password": password})
            .then((res) => {
                this.user = res;

                console.log("email = " + JSON.stringify(this.user.email));
                console.log("email = " + JSON.stringify(this.user.licenseType));
                alert("登录成功");

                this.router.navigate(['/']);
            })
            .catch(error => {
                console.log("error = " + JSON.stringify(error));
                alert(error._body.message);
            })
    }
}