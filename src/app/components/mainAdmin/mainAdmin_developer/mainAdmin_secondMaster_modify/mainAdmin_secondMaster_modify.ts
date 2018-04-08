/**
 * Created by zhangxu on 2018/4/3.
 */
import {Component} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../../services/user.service";
import swal from "sweetalert2";

@Component({
  templateUrl: './mainAdmin_secondMaster_modify.html',
  styleUrls: ['./mainAdmin_secondMaster_modify.css']
})

export class MainAdminSecondMasterModifyComponent {


  id: string;
  admin: any;

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService, private router: Router) {
    activatedRoute.paramMap.subscribe((paramMap) => {
      this.id = paramMap['params'].param;

      const userInfo = {
        "userId": userService.user._id,
        "token": userService.token.token,
        "uid": this.id
      };

      this.userService.getUserInfo(userInfo)
        .then(res => {
          console.log(res);
          if (res.success) {
            this.admin = res.user;
          }
        })
        .catch(error => {
          console.log(error);
        });

    });
  }

  updateSecondMaster() {

    const updateInfo = {
      'userId': this.userService.user._id,
      'token': this.userService.token.token,
      'user': this.admin
    };

    this.userService.updateUser(updateInfo)
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
