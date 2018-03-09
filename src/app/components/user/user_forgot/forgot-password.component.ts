/**
 * Created by zhangxu on 2018/1/23.
 */
import {Component} from "@angular/core";
import {UserService} from "../../../services/user.service";
import swal from "sweetalert2";
import {LowerCasePipe} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})

export class ForgotPasswordComponent {

  email: string;

  constructor(private userService: UserService, private lowerCasePipe: LowerCasePipe, private router: Router) {
  }




  buttonDisable = false;  // 提交按钮状态

  forgotPassword() {

    this.buttonDisable = true;

    const email = this.lowerCasePipe.transform(this.email);

    const userInfo = {
      'userName': email
    };


    this.userService.forgotPassword(userInfo)
      .then(res => {

        this.buttonDisable = false;

        if (res.success) {
          swal({
            position: 'center',
            type: 'success',
            titleText: 'Send successfully',
            showConfirmButton: false,
            timer: 2000,
            padding: 0,
            width: 300
          }).catch(swal.noop);
        }
      })
      .catch(error => {
        this.buttonDisable = false;
        console.log(error);
      });
  }

}
