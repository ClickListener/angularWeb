/**
 * Created by zhangxu on 2018/4/3.
 */
import {Component} from "@angular/core";
import {UserService} from "../../../../services/user.service";
import {LowerCasePipe} from "@angular/common";
import swal from "sweetalert2";
import {Router} from "@angular/router";

@Component({
  templateUrl: 'mainAdmin_secondMaster_create.html',
  styleUrls: ['mainAdmin_secondMaster_create.css']
})


export class MainAdminSecondMasterCreateComponent {

  origin: string;

  name: string;

  email: string;

  password: string;

  constructor(private userService: UserService, private lowerCasePipe: LowerCasePipe, private router: Router) {}

  createNewSecondMaster() {
    console.log('createNewSecondMaster()');

    const signUp_info = {
      userId: this.userService.user._id,
      token: this.userService.token.token,
      addUser: {
        "username": this.lowerCasePipe.transform(this.name),
        "email": this.email,
        "password": this.password,
        "type": 2,
        "orgin": this.origin
      }
    };

    this.userService.signUp(signUp_info)
      .then(res => {
        console.log(res);

        if (res.success) {
          this.router.navigate(['/secondMaster/secondMaster-manager']);
          swal({
            position: 'center',
            type: 'success',
            titleText: 'Create success',
            showConfirmButton: false,
            timer: 2000,
            padding: 0,
            width: 300
          }).catch(swal.noop);
        } else {
          swal({
            position: 'center',
            type: 'error',
            titleText: res.message,
            showConfirmButton: false,
            timer: 2000,
            padding: 0,
            width: 300
          }).catch(swal.noop);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
}
