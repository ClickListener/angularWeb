/**
 * Created by zhangxu on 16/01/2018.
 */
import {Component} from "@angular/core";
import {CompanyService} from "../../../services/company.service";
import {UserService} from "../../../services/user.service";

@Component({
  templateUrl: './development_add_member.html',
  styleUrls: ['./development_add_member.css']
})


export class DevelopmentAddMemberComponent {
  constructor(private companyService: CompanyService, private userService: UserService) {}


  inviteUserToGroup(emailOrUserName: string) {

    const userInfo = {
      "inviteEmail": emailOrUserName,
      "userId": this.userService.user._id,
      "token": this.userService.token.token
    }

    this.companyService.inviteUserToGroup(userInfo)
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      });

  }
}
