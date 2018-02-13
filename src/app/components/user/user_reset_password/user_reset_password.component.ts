/**
 * Created by zhangxu on 2018/2/8.
 */
import {Component} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../services/user.service";
import swal from "sweetalert2";

@Component({
  templateUrl: './user_reset_password.component.html',
  styleUrls: ['./user_reset_password.component.css']
})

export class UserResetPasswordComponent {


  userId: string;
  random: string;


  password: string;

  confirmPassword: string;


  constructor(private activatedRoute: ActivatedRoute, private userService: UserService, private router: Router) {

    activatedRoute.paramMap.subscribe(paramMap => {
      this.userId = paramMap['params'].userId;
      this.random = paramMap['params'].random;

      console.log('userId = ', this.userId);
      console.log('random = ', this.random);
    });
  }



  resetPassword() {

    const passwordInfo = {
      'userId': this.userId,
      'user': {
        'random': this.random,
        'password': this.password
      }

    };


    this.userService.updateUser(passwordInfo)
      .then(res => {
        if (res.success) {

          this.router.navigate(['/sign-in']);

          swal({
            titleText: 'Reset password successfully! ',
            position: 'bottom-right',
            type: 'success',
            timer: 2000,
            padding: 0,
            showConfirmButton: false
          }).catch(swal.noop);

        }
      })
      .catch(error => {
        console.log(error);
      });

  }
}
