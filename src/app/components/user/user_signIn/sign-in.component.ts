/**
 * Created by zhangxu on 2017/7/13.
 */
import {Component} from "@angular/core";
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";
import {User} from "../../../model/User";
import {License} from "../../../model/License";
import swal from "sweetalert2";


@Component({
    selector: 'sign-in',
    templateUrl : './sign-in.component.html',
    styleUrls : ['sign-in.component.css']
})

export class SignInComponent {


    constructor(private userService: UserService, private router: Router) {}

    user:User;

    signIn(email:string, password:string): void {
        console.log('email = ' + email + " password = " + password);

        const userInfo = {
          "email": email,
          "password": password
        };
        this.userService.signIn(userInfo)
            .then((res) => {

              if (res['success']) {
                swal({
                  position: 'bottom-right',
                  type: 'success',
                  titleText: 'Sign in success',
                  showConfirmButton: false,
                  timer: 2000,
                  padding: 0
                }).catch(swal.noop);


                this.router.navigate(['/']);
              } else {
                swal({
                  position: 'bottom-right',
                  type: 'error',
                  titleText: res['message'],
                  showConfirmButton: false,
                  timer: 2000,
                  padding: 0
                }).catch(swal.noop);
              }


            })
            .catch(error => {
                console.log("error = " + error.toString());
                alert(error._body.message);
            });
    }
}
