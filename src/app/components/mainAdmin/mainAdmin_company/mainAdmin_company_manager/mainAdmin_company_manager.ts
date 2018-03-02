/**
 * Created by zhangxu on 2018/2/8.
 */
import {Component} from "@angular/core";
import {CompanyService} from "../../../../services/company.service";
import {UserService} from "../../../../services/user.service";

@Component({
  templateUrl: './mainAdmin_company_manager.html',
  styleUrls: ['./mainAdmin_company_manager.css']
})

export class MainAdminCompanyManagerComponent {

  companyList: Array<any>;

  constructor(private companyService: CompanyService, private userService: UserService) {


    const userInfo = {
      "userId": userService.user._id,
      "token": userService.token.token
    };

    companyService.getCompanyList(userInfo)
      .then( res => {
        console.log(res);

        if (res.success) {
          this.companyList = res.data;

          this.companyList.forEach((company) => {
            const user_Info = {
              "userId": userService.user._id,
              "token": userService.token.token,
              "uid": company.mDeveloperId
            };

            userService.getUserInfo(user_Info)
              .then(response => {
                const mDeveloper = {
                  "email": response.user.email,
                  "username": response.user.username
                };

                company.mDeveloper = mDeveloper;
                console.log( this.companyList);
              })
              .catch(error => {
                console.log(error);
              });
          });
        }

      })
      .catch(error => {
        console.log(error);
      });
  }
}
