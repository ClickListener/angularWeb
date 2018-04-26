/**
 * Created by zhangxu on 2018/2/8.
 */
import {Component} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../../services/user.service";
import {NGXLogger} from "ngx-logger";

@Component({
  templateUrl: './mainAdmin_developer_modify.html',
  styleUrls: ['./mainAdmin_developer_modify.css']
})


export class MainAdminDeveloperModifyComponent {

  id: string;

  companyId: string;

  beta = false;

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService,
              private router: Router, private logger: NGXLogger) {

    activatedRoute.paramMap.subscribe(paramMap => {

      this.id = paramMap['params'].id;
      this.companyId = paramMap['params'].companyId;
    });

    const user_Info = {
      "userId": userService.user._id,
      "token": userService.token.token,
      "uid": this.id
    };

   userService.getUserAuth(user_Info)
     .then(res => {
        this.logger.debug('res = ', res);
        this.parsePermission(res.data);
     })
     .catch(error => {
       this.logger.debug('error = ', error);
     });


  }


  private parsePermission(permission: any) {

    this.logger.debug('permission = ', permission);

    permission.forEach((item, index) => {
      if (item.resourceId === '5a6580ca5e149e1dfdf27962') {
        this.beta = (item.action.indexOf('R') !== -1);
        this.logger.debug('beta = ', this.beta);
        return;
      }

    });
  }


  updateBetaPermission() {

    const permissionArr = [];

    const betaPermission = {
      "rid": '5a6580ca5e149e1dfdf27962',
      "action": []
    };

    if (this.beta) {
      betaPermission.action.push('R');
    }

    permissionArr.push(betaPermission);


    const permissionInfo = {
      "userId": this.userService.user._id,
      "token": this.userService.token.token,
      "uid": this.id,
      "companyId": this.companyId,
      "auth": permissionArr,
      "isValid": true
    };

    this.userService.addUserAuth(permissionInfo)
      .then(res => {
        this.logger.debug(res);
        this.router.navigate(['/developer-manager']);
      })
      .catch(error => {
        this.logger.debug(error);
      });
  }
}
