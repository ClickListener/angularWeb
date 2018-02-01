/**
 * Created by zhangxu on 11/01/2018.
 */
import {Component} from "@angular/core";
import {CompanyService} from "../../../services/company.service";
import {UserService} from "../../../services/user.service";

@Component({
  templateUrl: './development_group.html',
  styleUrls: ['./development_group.css']
})


export class DevelopmentGroupComponent {
  constructor(private companyService: CompanyService, private userService: UserService) {

    const userInfo = {
      "userId": userService.user._id,
      "token": userService.token.token
    }
    this.companyService.getCompanyList(userInfo)
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      })
  }
}
