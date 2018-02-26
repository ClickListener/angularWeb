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

  developerList: Array<any>; // 开发者 list

  companyInfo: any;  // 用户所属公司信息

  private allList: Array<any>;     // 所有开发者 list

  user: any; // 当前登录用户信息

  createApp: boolean;

  editApp: boolean;
  deleteApp: boolean;

  checkLicenseData: boolean;

  sdkDownload: boolean;

  addMembers: boolean;


  countryList: Array<any>;

  constructor(private companyService: CompanyService, private userService: UserService) {



    const userInfo = {
      "userId": userService.user._id,
      "token": userService.token.token
    };

    // 获得当前用户信息，拿到companyId，然后通过CompanyId获取改公司下的所有开发者 和 该公司的信息
    this.userService.getUserInfo(userInfo)
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

          }

          if (companyService.countryList === undefined ) {
            this.countryList = await companyService.getCountryList();
          } else {
            this.countryList = companyService.countryList;
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

            const countryFind = this.countryList.find((country, index, arr) => {
              return country.code === this.companyInfo.country;
            });

            this.companyInfo.country = countryFind.en;
          }


          this.developerList.forEach( async (developer, index) => {
            const user_Info = {
              "userId": this.user._id,
              "token": userService.token.token,
              "uid": developer._id
            };

            if (developer.type === 4) {
              const permissionResponse = await userService.getUserAuth(user_Info);

              if (permissionResponse.success) {
                const permissionString = this.parsePermission(permissionResponse.data);

                developer['permission'] = permissionString;
              }
            }

            console.log('developer', developer);
          });

          // 获得当前用户的权限



        }


      })
      .catch(error => {
        console.log(error);
      });

  }



  private parsePermission(permission: any): string {

    console.log('permission = ', permission);

    let permissionString = '';


    permission.forEach((item, index) => {
      if (item.resourceId === '5a6585df5e149e1dfdf27964') {
        this.createApp = (item.action.indexOf('C') !== -1);
        this.editApp = (item.action.indexOf('U') !== -1);
        this.deleteApp = (item.action.indexOf('D') !== -1);
        this.checkLicenseData = (item.action.indexOf('R') !== -1);
      } else if (item.resourceId === '5a71639e5e149e1dfdf27969') {
        this.addMembers = (item.action.indexOf('C') !== -1);
      }

    });

    if (this.createApp) {
      if (permissionString === null || permissionString === '') {
        permissionString += 'Create App';
      } else {
        permissionString += ',Create App';
      }
    }

    if (this.editApp) {
      if (permissionString === null || permissionString === '') {
        permissionString += 'Edit App';
      } else {
        permissionString += ',Edit App';
      }
    }

    if (this.deleteApp) {
      if (permissionString === null || permissionString === '') {
        permissionString += 'Delete App';
      } else {
        permissionString += ',Delete App';
      }
    }

    if (this.checkLicenseData) {
      if (permissionString === null || permissionString === '') {
        permissionString += 'Check The License Data';
      } else {
        permissionString += ',Check The License Data';
      }
    }

    console.log('permissionString', permissionString);

    return permissionString;



  }



  removeCompanyId(developer: any) {
    const userInfo = {
      "userId": this.user._id,
      "token": this.userService.token.token,
      "uid": developer._id,
      "companyId": developer.companyId
    };
    this.companyService.removeCompanyId(userInfo)
      .then(async res => {
        console.log(res);

        if (res.success) {
          // 获得该公司下的所有开发者
          const queryDeveloperList = {
            "userId": this.user._id,
            "token": this.userService.token.token,
            "companyId": this.user.companyId
          };

          const developerResponse = await this.userService.getUserList(queryDeveloperList);

          if (developerResponse.success) {
            this.allList = developerResponse.data;

            this.allList.find((findDeveloper, index, arr) => {
              if (findDeveloper._id === this.user._id) {
                arr.splice(index, 1);
                this.developerList = arr;
              }
              return findDeveloper._id === this.user._id;
            });

            this.developerList.forEach( async (_developer, index) => {
              const user_Info = {
                "userId": this.user._id,
                "token": this.userService.token.token,
                "uid": _developer._id
              };

              if (_developer.type === 4) {
                const permissionResponse = await this.userService.getUserAuth(user_Info);

                if (permissionResponse.success) {
                  const permissionString = this.parsePermission(permissionResponse.data);

                  _developer['permission'] = permissionString;
                }
              }

              console.log('_developer', _developer);
            });


          }
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
}
