/**
 * Created by zhangxu on 2017/7/13.
 */
import {Component} from "@angular/core";
import {UserService} from "../../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../../model/User";
import {License} from "../../../model/License";
import swal from "sweetalert2";
import {LowerCasePipe} from "@angular/common";
import {NGXLogger} from "ngx-logger";


@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['sign-in.component.css']
})

export class SignInComponent {


  constructor(private userService: UserService, private router: Router,
              private lowerCasePipe: LowerCasePipe, private logger: NGXLogger) {

    this.user = userService.user;

    if (this.user) {
      this.router.navigate(['/']);
    }

    this.preUrl = userService.preUrl;
  }

  user: any;


  emailOrUserName: string;
  password: string;

  buttonDisable = false;  // 提交按钮状态

  preUrl: string;

  signIn(): void {

    this.buttonDisable = true;

    const email = this.emailOrUserName.trim(); // 去除首尾空格
    const userInfo = {
      "email": this.lowerCasePipe.transform(email),
      "password": this.password
    };

    this.logger.debug('userInfo: ', userInfo);

    this.userService.signIn(userInfo)
      .then((res) => {

        this.buttonDisable = false;

        if (res['success']) {
          swal({
            position: 'center',
            type: 'success',
            titleText: 'Sign in successfully',
            showConfirmButton: false,
            timer: 2000,
            padding: 0,
            width: 300
          }).catch(swal.noop);


          this.logger.debug('this.preUrl', this.preUrl);

          if (this.preUrl && this.preUrl !== '/sign-up-confirm' && this.preUrl.indexOf('/reset-password') === -1) {
            this.router.navigate([this.preUrl]);
          } else {
            this.router.navigate(['/']);
          }


        }


      })
      .catch(error => {

        this.buttonDisable = false;
        this.logger.debug("error = " + error.toString());
      });
  }
}
