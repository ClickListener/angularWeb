/**
 * Created by zhangxu on 2018/4/3.
 */
import {Component} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../../services/user.service";
import swal from "sweetalert2";
import {NGXLogger} from "ngx-logger";

@Component({
  templateUrl: './mainAdmin_secondMaster_modify.html',
  styleUrls: ['./mainAdmin_secondMaster_modify.css']
})

export class MainAdminSecondMasterModifyComponent {


  id: string;
  admin: any;

  CN = false;
  AS = false;
  NA = false;
  LA = false;
  OA = false;
  ME = false;
  AF = false;
  EU = false;
  RU = false;

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService,
              private router: Router, private logger: NGXLogger) {
    activatedRoute.paramMap.subscribe((paramMap) => {
      this.id = paramMap['params'].param;

      const userInfo = {
        "userId": userService.user._id,
        "token": userService.token.token,
        "uid": this.id
      };

      this.userService.getUserInfo(userInfo)
        .then(res => {
          this.logger.debug(res);
          if (res.success) {
            this.admin = res.user;

            this.admin.openRegion.forEach( region => {
              switch (region) {
                case 'CN':
                  this.CN = true;
                  break;
                case 'AS':
                  this.AS = true;
                  break;
                case 'NA':
                  this.NA = true;
                  break;
                case 'LA':
                  this.LA = true;
                  break;
                case 'OA':
                  this.OA = true;
                  break;
                case 'ME':
                  this.ME = true;
                  break;
                case 'AF':
                  this.AF = true;
                  break;
                case 'EU':
                  this.EU = true;
                  break;
                case 'RU':
                  this.RU = true;
                  break;
              }
            });

            this.logger.debug('CN= ', this.CN);
            this.logger.debug('AS= ', this.AS);
            this.logger.debug('NA= ', this.NA);
            this.logger.debug('LA= ', this.LA);
            this.logger.debug('OA= ', this.OA);
            this.logger.debug('ME= ', this.ME);
            this.logger.debug('AF= ', this.AF);
            this.logger.debug('EU= ', this.EU);
            this.logger.debug('RU= ', this.RU);
          }
        })
        .catch(error => {
          this.logger.debug(error);
        });

    });
  }

  updateSecondMaster() {

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

    this.admin.openRegion = regionArr;

    const updateInfo = {
      'userId': this.userService.user._id,
      'token': this.userService.token.token,
      'user': this.admin
    };

    this.userService.updateUser(updateInfo)
      .then(res => {

        this.logger.debug(res);

        if (res.success) {
          this.router.navigate(['/secondMaster/secondMaster-manager']);
          swal({
            position: 'center',
            type: 'success',
            titleText: 'Update successfully',
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
