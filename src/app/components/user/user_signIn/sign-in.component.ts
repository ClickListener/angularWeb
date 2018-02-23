/**
 * Created by zhangxu on 2017/7/13.
 */
import {Component} from "@angular/core";
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";
import {User} from "../../../model/User";
import {License} from "../../../model/License";
import swal from "sweetalert2";
import {LowerCasePipe} from "@angular/common";


@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['sign-in.component.css']
})

export class SignInComponent {


  constructor(private userService: UserService, private router: Router, private lowerCasePipe: LowerCasePipe) {

    this.user = userService.user;

    if (this.user) {
      this.router.navigate(['/']);
    }
  }

  user: any;


  emailOrUserName: string;
  password: string;

  signIn(): void {

    const email = this.emailOrUserName.trim(); // 去除首尾空格
    const userInfo = {
      "email": this.lowerCasePipe.transform(email),
      "password": this.password
    };

    console.log('userInfo: ', userInfo);

    this.userService.signIn(userInfo)
      .then((res) => {

        if (res['success']) {
          swal({
            position: 'center',
            type: 'success',
            titleText: 'Sign in success',
            showConfirmButton: false,
            timer: 2000,
            padding: 0,
            width: 300
          }).catch(swal.noop);


          this.router.navigate(['/']);
        }


      })
      .catch(error => {
        console.log("error = " + error.toString());
      });
  }
}
