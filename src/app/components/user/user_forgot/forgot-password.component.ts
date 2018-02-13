/**
 * Created by zhangxu on 2018/1/23.
 */
import {Component} from "@angular/core";
import {UserService} from "../../../services/user.service";
import swal from "sweetalert2";

@Component({
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})

export class ForgotPasswordComponent {

  email: string;

  constructor(private userService: UserService) {}


  forgotPassword() {

    const userInfo = {
      'userName': this.email
    };

    this.userService.forgotPassword(userInfo)
      .then(res => {
        if (res.success) {
          swal({
            position: 'bottom-right',
            type: 'success',
            titleText: 'Send successfully',
            showConfirmButton: false,
            timer: 2000,
            padding: 0
          }).catch(swal.noop);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

}
