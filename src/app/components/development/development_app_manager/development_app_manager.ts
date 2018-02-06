/**
 * Created by zhangxu on 11/01/2018.
 */
import {Component} from "@angular/core";
import {AppService} from "../../../services/app.service";
import {UserService} from "../../../services/user.service";
import swal from "sweetalert2";

@Component({
  templateUrl: './development_app_manager.html',
  styleUrls: ['./development_app_manager.css']
})


export class DevelopmentAppManagerComponent {

  appList: Array<any>;
  constructor(private appService: AppService, private userService: UserService) {


    userService.getUserInfo()
      .then(async res => {

        if (res.success) {
          const appInfo = {
            "userId": res.user._id,
            "token": userService.token.token,
            "companyId": res.user.companyId
          };

          const response = await appService.findAllAppInfo(appInfo);

          if (response.success) {
            this.appList = response.data;
          }
        }
      })
      .catch(error => {
        console.log(error);
      });


  }


  // 防止向上冒泡
  stop_Propagation(event): void {

    if (event && event.stopPropagation) {
      event.stopPropagation();
    } else {
      window.event.cancelBubble=true;
    }

  }

  deleteApp(index: number) {
    const appId = this.appList[index]._id;


    const appInfo = {
      "userId": this.userService.user._id,
      "token": this.userService.token.token,
      "appId": appId
    }

    this.appService.deleteUserApp(appInfo)
      .then(async res => {
        console.log(res);

        console.log(this.userService.user);

        const appAll = {
          "userId": this.userService.user._id,
          "token": this.userService.token.token,
          "companyId": this.userService.user.companyId
        };
        const response = await this.appService.findAllAppInfo(appAll);

        if (response.success) {
          this.appList = response.data;
        }
      })
      .catch(error => {
        console.log(error);
      });
  }


  // 下载License
  downloadLicense(appId: string) {

    const userInfo = {
      "userId": this.userService.user._id,
      "token": this.userService.token.token,
      "appId": appId
    }
    this.appService.downloadLicense(userInfo)
      .then(res => {
        console.log(res);

        if (res.success) {
          swal({
            position: 'bottom-right',
            type: 'success',
            titleText: 'Download successfully',
            showConfirmButton: false,
            timer: 2000,
            padding: 0
          }).catch(swal.noop);
        } else {
          swal(
            'Fail!',
            res.message,
            'error'
          ).catch(swal.noop);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
}
