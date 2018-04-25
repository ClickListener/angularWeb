/**
 * Created by zhangxu on 2018/4/12.
 */
import {Component} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../../services/user.service";
import {AppService} from "../../../../services/app.service";

import * as myGlobals from '../../../../../environments/config';
@Component({
  templateUrl: './mainAdmin_company_applist.html',
  styleUrls: ['./mainAdmin_company_applist.css']
})

export class MainAdminCompanyApplistComponent {

  cid: string;
  appList: Array<any>;
  url = myGlobals.url;

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
              private userService: UserService, private appService: AppService) {

    if (userService.user && userService.user.type > 2) {
      router.navigate(['/']);
      return;
    }

    if (!userService.user) {
      router.navigate(['/sign-in']);
      return;
    }

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
            this.appList = this.appList.reverse();

          }

        })
        .catch(error => {
          console.log(error);
        });
    });

  }



}
