/**
 * Created by zhangxu on 2018/4/3.
 */
import {Component} from "@angular/core";
import {UserService} from "../../../../services/user.service";
import {LowerCasePipe} from "@angular/common";
import swal from "sweetalert2";
import {Router} from "@angular/router";
import {NGXLogger} from "ngx-logger";

@Component({
  templateUrl: 'mainAdmin_secondMaster_create.html',
  styleUrls: ['mainAdmin_secondMaster_create.css']
})


export class MainAdminSecondMasterCreateComponent {

  origin: string;

  name: string;

  email: string;

  password: string;

  CN = true;
  AS = true;
  NA = true;
  LA = true;
  OA = true;
  ME = true;
  AF = true;
  EU = true;
  RU = true;

  constructor(private userService: UserService, private lowerCasePipe: LowerCasePipe,
              private router: Router, private logger: NGXLogger) {}

  createNewSecondMaster() {
    this.logger.debug('createNewSecondMaster()');

    const regionArr = [];

    if (this.CN) {
      regionArr.push('CN');
    }

    if (this.AS) {
      regionArr.push('AS');
    }

    if (this.NA) {
      regionArr.push('NA');
    }

    if (this.LA) {
      regionArr.push('LA');
    }

    if (this.OA) {
      regionArr.push('OA');
    }

    if (this.ME) {
      regionArr.push('ME');
    }

    if (this.AF) {
      regionArr.push('AF');
    }

    if (this.EU) {
      regionArr.push('EU');
    }

    if (this.RU) {
      regionArr.push('RU');
    }

    const signUp_info = {
      userId: this.userService.user._id,
      token: this.userService.token.token,
      addUser: {
        "username": this.lowerCasePipe.transform(this.name),
        "email": this.email,
        "password": this.password,
        "type": 2,
        "openRegion": regionArr
      }
    };

    this.userService.signUp(signUp_info)
      .then(res => {
        this.logger.debug(res);

        if (res.success) {
          this.router.navigate(['/secondMaster/secondMaster-manager']);
          swal({
            position: 'center',
            type: 'success',
            titleText: 'Create successfully',
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
        this.logger.debug(error);
      });
  }
}
