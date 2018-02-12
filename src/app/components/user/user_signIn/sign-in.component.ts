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
  }

  user: User;

  emailOrUserName: string;
  password: string;

  signIn(): void {

    const userInfo = {
      "email": this.lowerCasePipe.transform(this.emailOrUserName),
      "password": this.password
    };

    console.log('userInfo: ', userInfo);

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
        }


      })
      .catch(error => {
        console.log("error = " + error.toString());
        alert(error._body.message);
      });
  }
}
