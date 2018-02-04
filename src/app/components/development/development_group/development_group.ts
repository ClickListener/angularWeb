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



    // 获得当前用户信息，拿到companyId，然后通过CompanyId获取改公司下的所有开发者 和 该公司的信息
    this.userService.getUserInfo()
      .then(async res => {

        if (res.success) {


          this.user = userService.user;

          // 获得该公司下的所有开发者
          const queryDeveloperList = {
            "userId": this.user._id,
            "token": userService.token.token,
            "companyId": res.user.companyId
          };

          const developerResponse = await userService.getUserList(queryDeveloperList);

          if (developerResponse.success) {
            this.allList = developerResponse.data;

            this.allList.find((developer, index, arr) => {
              if (developer._id === this.user._id) {
                arr.splice(index, 1);
                this.developerList = arr;
              }
              return developer._id === this.user._id;
            });

            console.log(this.master);

          }

          // 获得公司信息
          const queryCompanyInfo = {
            "userId": this.user._id,
            "token": userService.token.token,
            "cid": res.user.companyId
          };
          const companyResponse = await companyService.findCompany(queryCompanyInfo);

          if (companyResponse.success) {
            this.companyInfo = companyResponse.data;
          }


          // 获得当前用户的权限
          const userInfo = {
            "userId": this.user._id,
            "token": userService.token.token
          };

          const permissionResponse = await userService.getUserAuth(userInfo);



        }


      })
      .catch(error => {
        console.log(error);
      });






  }
}
