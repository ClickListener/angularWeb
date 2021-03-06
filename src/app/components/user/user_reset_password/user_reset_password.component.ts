/**
 * Created by zhangxu on 2018/2/8.
 */
import {Component} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../services/user.service";
import swal from "sweetalert2";
import {NGXLogger} from "ngx-logger";

@Component({
  templateUrl: './user_reset_password.component.html',
  styleUrls: ['./user_reset_password.component.css']
})

export class UserResetPasswordComponent {


  userId: string;
  random: string;


  password: string;

  confirmPassword: string;

  buttonDisable = false;  // 提交按钮状态


  constructor(private activatedRoute: ActivatedRoute, private userService: UserService,
              private router: Router, private logger: NGXLogger) {


    activatedRoute.paramMap.subscribe(paramMap => {
      this.userId = paramMap['params'].userId;
      this.random = paramMap['params'].random;

      const userInfo = {
        'userId': this.userId,
        'random': this.random
      };

      this.userService.checkUserIsValid(userInfo)
        .then(res => {
          this.logger.debug(res);
          if (!res.success) {
            swal({
              position: 'center',
              type: 'error',
              title: res.message,
              text: 'Please resend a new request',
              showConfirmButton: true,
              // timer: 2000
            }).then(() => {
              this.router.navigate(['forgot-password']);
            })
              .catch(swal.noop);

          }
        })
        .catch(error => {
          this.logger.debug(error);
        });

      this.logger.debug('userId = ', this.userId);
      this.logger.debug('random = ', this.random);
    });
  }



  resetPassword() {

    this.buttonDisable = true;

    const passwordInfo = {
      'userId': this.userId,
      'user': {
        'random': this.random,
        'password': this.password
      }

    };


    this.userService.updateUser(passwordInfo)
      .then(res => {

        this.buttonDisable = false;

        if (res.success) {

          this.router.navigate(['/sign-in']);

          swal({
            titleText: 'Reset password successfully! ',
            position: 'center',
            type: 'success',
            timer: 2000,
            padding: 0,
            showConfirmButton: false,
            width: 300
          }).catch(swal.noop);

        }
      })
      .catch(error => {
        // this.buttonDisable = false;
        this.logger.debug(error);
      });

  }
}
