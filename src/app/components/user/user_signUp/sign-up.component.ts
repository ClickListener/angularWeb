/**
 * Created by zhangxu on 2017/7/13.
 */
import {Component} from "@angular/core";
import {UserService} from "../../../services/user.service";

import {Router} from '@angular/router'
import swal from "sweetalert2";

@Component({
    selector: 'sign-up',
    templateUrl : './sign-up.component.html',
    styleUrls : ['./sign-up.component.css']
})

export class SignUpComponent {


  nameValue: string;
  emailValue: string;
  passwordValue: string;
  confirmPasswordValue: string;
  agreeValue: boolean;

    constructor(private userService: UserService, private router: Router) {}

    signUp() {


        const signUp_info = {
          addUser: {
            "username": this.nameValue,
            "email": this.emailValue,
            "password": this.passwordValue,
            "type": 4
          }
        };

        console.log('signUp_info: ', signUp_info);

        this.userService.signUp(signUp_info)
            .then((res) => {
              console.log(res);
              if (res['success']) {
                this.router.navigate(['/confirm-hint']);
                swal({
                  position: 'center',
                  type: 'success',
                  titleText: 'Sign up success',
                  showConfirmButton: false,
                  timer: 2000,
                  padding: 0,
                  width: 300
                }).catch(swal.noop);
              }

            })
            .catch(error => {
                console.log("error = " + JSON.stringify(error));
            });

    }
}
