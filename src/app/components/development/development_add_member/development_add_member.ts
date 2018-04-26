/**
 * Created by zhangxu on 16/01/2018.
 */
import {Component, DoCheck} from "@angular/core";
import {CompanyService} from "../../../services/company.service";
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";
import {Location, LowerCasePipe} from "@angular/common";
import {NGXLogger} from "ngx-logger";
import swal from "sweetalert2";

@Component({
  templateUrl: './development_add_member.html',
  styleUrls: ['./development_add_member.css']
})


export class DevelopmentAddMemberComponent {


  emailOrUserName: string;
  createApp = false;
  checkLicenseData = false;
  editApp = false;
  deleteApp = false;
  addMembers = false;


  buttonDisable = false;  // 提交按钮状态


  constructor(private companyService: CompanyService, private userService: UserService, private router: Router
    , private lowerCasePipe: LowerCasePipe, private _location: Location, private logger: NGXLogger) {


    if (!userService.user) {
      this.router.navigate(['/sign-in']);
      return;
    }
    const userInfo = {
      "userId": userService.user._id,
      "token": userService.token.token
    };

    this.userService.getUserInfo(userInfo);

    if (userService.resourceList.length === 0) {
      userService.getResourceList();
    }
    this.logger.debug(userService.resourceList);
  }


  inviteUserToGroup() {

    this.buttonDisable = true;

    const permissionArr = [];


    const appCountPermission = {
      "rid": '5a6582505e149e1dfdf27963',
      "action": []
    };
    const appLicensePermission = {
      "rid": '5a6585df5e149e1dfdf27964',
      "action": []
    };
    const companyPermission = {
      "rid": '5a6ae53f5e149e1dfdf27966',
      "action": []
    };
    const invitePermission = {
      "rid": '5a71639e5e149e1dfdf27969',
      "action": []
    };



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

    if (this.addMembers) {
      invitePermission.action.push('C');
    }

    permissionArr.push(appLicensePermission);
    permissionArr.push(appCountPermission);
    permissionArr.push(companyPermission);
    permissionArr.push(invitePermission);


    const permissionInfo = {
      "userId": this.userService.user._id,
      "token": this.userService.token.token,
      "companyId": this.userService.user.companyId,
      "userName": this.lowerCasePipe.transform(this.emailOrUserName),
      "auth": permissionArr
    };


    const userInfo = {
      "inviteName": this.emailOrUserName,
      "userId": this.userService.user._id,
      "token": this.userService.token.token,
      "companyId": this.userService.user.companyId
    };

    this.companyService.inviteUserToGroup(userInfo)
      .then(async res => {

        this.buttonDisable = false;

        if (res.success) {
          const response = await this.userService.addUserAuth(permissionInfo);

          if (response.success) {

            swal({
              position: 'center',
              type: 'success',
              text: 'Please remind member to confirm your invitation',
              showConfirmButton: true,
              allowOutsideClick: false
            }).then(() => {
              this.router.navigate(['/development-main/development-group', this.userService.user._id]);
            });
          }
        }
      })
      .catch(error => {
        this.buttonDisable = false;
        this.logger.error(error);
      });

  }

  // 使用Location Service 实现后退功能
  cancel() {
    this._location.back();
  }
}
