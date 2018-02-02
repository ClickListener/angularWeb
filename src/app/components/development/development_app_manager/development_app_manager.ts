/**
 * Created by zhangxu on 11/01/2018.
 */
import {Component} from "@angular/core";
import {AppService} from "../../../services/app.service";
import {UserService} from "../../../services/user.service";

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
}
