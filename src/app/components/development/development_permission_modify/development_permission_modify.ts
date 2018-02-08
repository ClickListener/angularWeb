/**
 * Created by zhangxu on 2018/2/7.
 */
import {Component} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
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

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService) {

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
}
