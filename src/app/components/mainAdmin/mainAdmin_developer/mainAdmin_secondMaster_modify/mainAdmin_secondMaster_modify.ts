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

  CN = false;
  AS = false;
  NA = false;
  LA = false;
  OA = false;
  ME = false;
  AF = false;
  EU = false;
  RU = false;

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

            console.log('CN= ', this.CN);
            console.log('AS= ', this.AS);
            console.log('NA= ', this.NA);
            console.log('LA= ', this.LA);
            console.log('OA= ', this.OA);
            console.log('ME= ', this.ME);
            console.log('AF= ', this.AF);
            console.log('EU= ', this.EU);
            console.log('RU= ', this.RU);
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
