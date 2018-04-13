/**
 * Created by zhangxu on 2018/4/12.
 */
import {Component} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../../../services/user.service";
import swal from "sweetalert2";

@Component({
  templateUrl: './mainAdmin_company_developer.html',
  styleUrls: ['./mainAdmin_company_developer.css']
})

export class MainAdminCompanyDeveloperComponent {

  cid: string;
  developerList: Array<any>;
  constructor(private activatedRoute: ActivatedRoute, private userService: UserService) {

    activatedRoute.parent.paramMap.subscribe(paramMap => {
      this.cid = paramMap['params'].param;

      // 获得该公司下的所有开发者
      const queryDeveloperList = {
        "userId": userService.user._id,
        "token": userService.token.token,
        "companyId": this.cid
      };

      userService.getUserList(queryDeveloperList)
        .then(res => {
          if (res.success) {
            this.developerList = res.data;


            this.developerList.forEach((developer) => {

              if (developer.type === 3) {
                const user_Info = {
                  "userId": userService.user._id,
                  "token": userService.token.token,
                  "uid": developer._id
                };

                userService.getUserAuth(user_Info)
                  .then(response => {
                    console.log('res = ', response);
                    this.parsePermission(response.data, developer);
                  })
                  .catch(error => {
                    console.log('error = ', error);
                  });
              }

            });

          }
        });


    });
  }

  private parsePermission(permission: any, developer: any) {

    console.log('permission = ', permission);
    developer.beta = false;

    permission.forEach((item, index) => {
      if (item.resourceId === '5a6580ca5e149e1dfdf27962') {
        developer.beta = (item.action.indexOf('R') !== -1);
        console.log('beta = ', developer.beta);
        return;
      }

    });
  }


  updateBetaPermission(developer: any) {

    console.log('developer=', developer);

    const permissionArr = [];

    const betaPermission = {
      "rid": '5a6580ca5e149e1dfdf27962',
      "action": []
    };

    if (developer.beta === 'true') {
      betaPermission.action.push('R');
    }

    permissionArr.push(betaPermission);


    const permissionInfo = {
      "userId": this.userService.user._id,
      "token": this.userService.token.token,
      "uid": developer._id,
      "companyId": developer.companyId,
      "auth": permissionArr,
      "isValid": true
    };

    this.userService.addUserAuth(permissionInfo)
      .then(res => {
        console.log(res);
        swal({
          position: 'center',
          type: 'success',
          titleText: 'Update success',
          showConfirmButton: false,
          timer: 1500,
          padding: 0,
          width: 300
        }).catch(swal.noop);
      })
      .catch(error => {
        console.log(error);
      });
  }
}