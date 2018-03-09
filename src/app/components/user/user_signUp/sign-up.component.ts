/**
 * Created by zhangxu on 2017/7/13.
 */
import {Component} from "@angular/core";
import {UserService} from "../../../services/user.service";

import {Router} from '@angular/router'
import swal from "sweetalert2";
import {LowerCasePipe} from "@angular/common";

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent {


  nameValue: string;
  emailValue: string;
  passwordValue: string;
  confirmPasswordValue: string;
  agreeValue: boolean;

  buttonDisable = false;  // 提交按钮状态

  constructor(private userService: UserService, private router: Router, private lowerCasePipe: LowerCasePipe) {
    if (this.userService.user) {
      this.router.navigate(['/']);
    }
  }

  signUp() {

    this.buttonDisable = true;

    const signUp_info = {
      addUser: {
        "username": this.lowerCasePipe.transform(this.nameValue),
        "email": this.emailValue,
        "password": this.passwordValue,
        "type": 4
      }
    };

    console.log('signUp_info: ', signUp_info);

    this.userService.signUp(signUp_info)
      .then((res) => {
        console.log(res);
        this.buttonDisable = false;
        if (res['success']) {
          // this.router.navigate(['/confirm-hint']);
          swal({
            position: 'center',
            type: 'success',
            text: 'Please check your email to confirm.',
            showConfirmButton: true,
            allowOutsideClick: false
          }).then(() => {
            this.router.navigate(['/sign-in']);
          });
        }

      })
      .catch(error => {
        this.buttonDisable = false;
        console.log("error = " + JSON.stringify(error));
      });

  }
}
