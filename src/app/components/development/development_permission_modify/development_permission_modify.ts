/**
 * Created by zhangxu on 2018/2/7.
 */
import {Component} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../services/user.service";

@Component({
  templateUrl: './development_permission_modify.html',
  styleUrls: ['./development_permission_modify.css']
})

export class DevelopmentPermissionModifyComponent {

  userId: string;
  userInfo: any;

  createApp: boolean;

  editApp: boolean;
  deleteApp: boolean;

  checkLicenseData: boolean;

  sdkDownload: boolean;

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService, private router: Router) {

    activatedRoute.paramMap.subscribe(paramMap => {
      this.userId = paramMap['params'].param;
    });

    const developerInfo = {
      "userId": userService.user._id,
      "token": userService.token.token,
      "uid": this.userId
    };

    userService.getUserInfo(developerInfo)
      .then(res => {
        console.log(res);

        if (res.success) {
          this.userInfo = res.user;
        }
      })
      .catch(error => {
        console.log(error);
      });

    // 获得当前用户的权限
    const userInfo = {
      "userId": userService.user._id,
      "token": userService.token.token,
      "uid": this.userId
    };

    userService.getUserAuth(userInfo)
      .then(res => {
        if (res.success) {
          this.parsePermission(res.data);
        }
      })
      .catch(error => {
        console.log(error);
      });


  }


  private parsePermission(permission: any) {

    console.log('permission = ', permission);


    permission.forEach((item, index) => {
      if (item.resourceId === '5a6585df5e149e1dfdf27964') {
        this.createApp = (item.action.indexOf('C') !== -1);
        this.editApp = (item.action.indexOf('U') !== -1);
        this.deleteApp = (item.action.indexOf('D') !== -1);
        this.checkLicenseData = (item.action.indexOf('R') !== -1);
      }

    });

  }


  upDatePermission() {

    const permissionArr = [];


    // const appCountPermission = {
    //   "rid": '5a6582505e149e1dfdf27963',
    //   "action": []
    // };
    const appLicensePermission = {
      "rid": '5a6585df5e149e1dfdf27964',
      "action": []
    };
    // const companyPermission = {
    //   "rid": '5a6ae53f5e149e1dfdf27966',
    //   "action": []
    // };
    // const invitePermission = {
    //   "rid": '5a71639e5e149e1dfdf27969',
    //   "action": []
    // };


    if (this.createApp) {
      appLicensePermission.action.push('C');
    }

    if (this.checkLicenseData) {
      appLicensePermission.action.push('R');
    }
    if (this.editApp) {
      appLicensePermission.action.push('U');
    }

    if (this.deleteApp) {
      appLicensePermission.action.push('D');
    }


    permissionArr.push(appLicensePermission);
    // permissionArr.push(appCountPermission);
    // permissionArr.push(companyPermission);
    // permissionArr.push(invitePermission);


    const permissionInfo = {
      "userId": this.userService.user._id,
      "token": this.userService.token.token,
      "uid": this.userId,
      "companyId": this.userService.user.companyId,
      "auth": permissionArr,
      "isValid": true
    };

    this.userService.addUserAuth(permissionInfo)
      .then(res => {
        console.log(res);
        this.router.navigate(['/development-main/development-group']);
      })
      .catch(error => {
        console.log(error);
      });


  }


}
