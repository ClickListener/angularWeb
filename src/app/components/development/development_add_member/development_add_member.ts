/**
 * Created by zhangxu on 16/01/2018.
 */
import {Component, DoCheck} from "@angular/core";
import {CompanyService} from "../../../services/company.service";
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";

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


  constructor(private companyService: CompanyService, private userService: UserService, private router: Router) {

    this.userService.getUserInfo();

    if (userService.resourceList.length === 0) {
      userService.getResourceList();
    }
    console.log(userService.resourceList);
  }


  inviteUserToGroup() {

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
      "userName": this.emailOrUserName,
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

        if (res.success) {
          const response = await this.userService.addUserAuth(permissionInfo);
          if (response.success) {
            this.router.navigate(['/development-main/development-group']);
          }
        }
      })
      .catch(error => {
        console.log(error);
      });

  }
}
