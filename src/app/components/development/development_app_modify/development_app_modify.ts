/**
 * Created by zhangxu on 2018/2/5.
 */
import {Component} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {AppService} from "../../../services/app.service";
import {UserService} from "../../../services/user.service";

@Component({
  templateUrl: './development_app_modify.html',
  styleUrls: ['./development_app_modify.css']
})

export class DevelopmentAppModifyComponent {



  constructor(private activatedRoute: ActivatedRoute, private appService: AppService, private userService: UserService) {

    this.activatedRoute.paramMap.subscribe(paramMap => {
      const appId = paramMap['params'].param;
      console.log('appId = ', appId);

      const appInfo = {
        "userId": userService.user._id,
        "token": userService.token.token,
        "appId": appId
      }
      appService.findUerApp(appInfo)
        .then(res => {
          console.log(res);
        })
        .catch(error => {
          console.log(error);
        });
    });
  }
}
