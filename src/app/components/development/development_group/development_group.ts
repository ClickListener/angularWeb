/**
 * Created by zhangxu on 11/01/2018.
 */
import {Component, OnInit} from "@angular/core";
import {CompanyService} from "../../../services/company.service";
import {UserService} from "../../../services/user.service";
import {User} from "../../../model/User";

@Component({
  templateUrl: './development_group.html',
  styleUrls: ['./development_group.css']
})


export class DevelopmentGroupComponent {

  developerList: Array<any>; // 普通开发者 list
  master: any; // 主开发者信息

  companyInfo: any;  // 用户所属公司信息

  private allList: Array<any>;     // 所有开发者 list

  user: any; // 当前登录用户信息


  constructor(private companyService: CompanyService, private userService: UserService) {

    this.userService.getUserInfo()
      .then(async res => {

        if (res.success) {

          const queryDeveloperList = {
            "userId": userService.user._id,
            "token": userService.token.token,
            "companyId": res.user.companyId
          };

          const developerResponse = await userService.getUserList(queryDeveloperList);

          if (developerResponse.success) {
            this.allList = developerResponse.data;

            this.master = this.allList.find((developer, index, arr) => {
              if (developer.type === 3) {
                arr.splice(index, 1);
                this.developerList = arr;
              }

              return developer.type === 3;
            });

            console.log(this.developerList);
          }

          const queryCompanyInfo = {
            "userId": userService.user._id,
            "token": userService.token.token,
            "cid": res.user.companyId
          };
          const companyResponse = await companyService.findCompany(queryCompanyInfo);

          if (companyResponse.success) {
            this.companyInfo = companyResponse.data;
          }
        }


      })
      .catch(error => {
        console.log(error);
      });






  }
}
