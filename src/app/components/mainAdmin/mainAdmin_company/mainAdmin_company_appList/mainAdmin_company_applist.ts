/**
 * Created by zhangxu on 2018/4/12.
 */
import {Component} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../../../services/user.service";
import {AppService} from "../../../../services/app.service";

@Component({
  templateUrl: './mainAdmin_company_applist.html',
  styleUrls: ['./mainAdmin_company_applist.css']
})

export class MainAdminCompanyApplistComponent {

  cid: string;
  appList: Array<any>;

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService, private appService: AppService) {

    activatedRoute.parent.paramMap.subscribe(paramMap => {
      this.cid = paramMap['params'].param;

      const appInfo = {
        "userId": userService.user._id,
        "token": userService.token.token,
        "companyId": this.cid
      };

      appService.findAllAppInfo(appInfo)
        .then(res => {
          console.log(res);
          if (res.success) {
            this.appList = res.data;
          }

        })
        .catch(error => {
          console.log(error);
        });
    });

  }



}
