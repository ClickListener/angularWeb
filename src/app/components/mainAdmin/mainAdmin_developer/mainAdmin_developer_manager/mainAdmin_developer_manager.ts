/**
 * Created by zhangxu on 2018/2/8.
 */
import {Component} from "@angular/core";
import {UserService} from "../../../../services/user.service";
import swal from "sweetalert2";
import {NGXLogger} from "ngx-logger";

@Component({
  templateUrl: './mainAdmin_developer_manager.html',
  styleUrls: ['./mainAdmin_developer_manager.css']
})


export class MainAdminDeveloperManagerComponent {

  developerList: Array<any>;

  user: any;

  loading = true;

  constructor(private userService: UserService, private logger: NGXLogger) {

    this.user = userService.user;

    // 获得该公司下的所有开发者
    const queryDeveloperList = {
      "userId": userService.user._id,
      "token": userService.token.token
    };

    userService.getUserList(queryDeveloperList)
      .then(res => {
        this.logger.debug(res);

        if (res.success) {
          this.developerList = res.data;
          this.developerList = this.developerList.reverse();

          this.developerList.find((developer, index, arr) => {
            if (developer._id === userService.user._id) {
              arr.splice(index, 1);
              this.developerList = arr;
            }
            return developer._id === userService.user._id;
          });


          this.developerList.forEach((developer) => {

            if (developer.type === 3) {
              const user_Info = {
                "userId": userService.user._id,
                "token": userService.token.token,
                "uid": developer._id
              };

              userService.getUserAuth(user_Info)
                .then(response => {
                  this.logger.debug('res = ', response);
                  this.parsePermission(response.data, developer);
                })
                .catch(error => {
                  this.logger.debug('error = ', error);
                });
            }

          });
        }

      })
      .catch(error => {
        this.logger.debug(error);
        this.loading = false;
      });




  }

  private parsePermission(permission: any, developer: any) {

    this.logger.debug('permission = ', permission);
    developer.beta = false;


    permission.forEach((item, index) => {
      if (item.resourceId === '5a6580ca5e149e1dfdf27962') {
        developer.beta = (item.action.indexOf('R') !== -1);
        this.logger.debug('beta = ', developer.beta);
        return;
      }

    });

    developer.originalState = developer.beta;
    this.logger.debug('beta = ', developer.beta);
    this.logger.debug('originalState = ', developer.originalState);
  }


  updateBetaPermission(developer: any) {

    this.logger.debug('developer=', developer);

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
        this.logger.debug(res);
        if (res.success) {

          developer.originalState = developer.beta;
          swal({
            position: 'center',
            type: 'success',
            titleText: 'Update success',
            showConfirmButton: false,
            timer: 1500,
            padding: 0,
            width: 300
          }).catch(swal.noop);
        } else {
          developer.beta = developer.originalState;
          swal({
            position: 'center',
            type: 'error',
            titleText: res.message,
            showConfirmButton: false,
            timer: 2000,
            padding: 0,
            width: 300
          }).catch(swal.noop);
        }

      })
      .catch(error => {
        this.logger.debug(error);
      });
  }
}
