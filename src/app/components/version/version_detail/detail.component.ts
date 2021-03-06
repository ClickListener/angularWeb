/**
 * Created by zhangxu on 2018/1/23.
 */
import {Component} from "@angular/core";
import {UserService} from "../../../services/user.service";
import {SchemeService} from "../../../services/scheme.service";
import {ActivatedRoute} from "@angular/router";
import {User} from "../../../model/User";
import {Token} from "../../../model/Token";

import * as myGlobals from '../../../../environments/config';
import {NGXLogger} from "ngx-logger";

@Component({
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})

export class DetailComponent {


  url = myGlobals.url;

  schemeId: string;

  schemeSelected: any;

  user: any;

  token: string;

  title: string;

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService,
              private schemeService: SchemeService, private logger: NGXLogger) {

    activatedRoute.paramMap.subscribe(paramMap => {
      this.schemeId = paramMap['params'].param;

      this.logger.debug('schemeId = ', this.schemeId);
    });



    this.user = userService.user;
    this.token = userService.token.token;

    const fileInfo = {
      "userId": this.user._id,
      "token": this.token,
      "fileId": this.schemeId
    };

    this.schemeService.findFileInfo(fileInfo)
      .then(res => {
        this.logger.debug(res);
        if (res.success) {
          this.schemeSelected = res.data;

          if (this.schemeSelected.resourceName === 'NativeSDK') {
            if (this.schemeSelected.platform === 'android') {
              this.title = 'Native SDK_Android';
            } else {
              this.title = 'Native SDK_IOS';
            }
          } else if (this.schemeSelected.resourceName === 'LibrarySDK') {
            if (this.schemeSelected.platform === 'android') {
              this.title = 'Library SDK_Android';
            } else {
              this.title = 'Library SDK_IOS';
            }
          } else if (this.schemeSelected.resourceName === 'LayeredApp') {
            if (this.schemeSelected.platform === 'android') {
              this.title = 'Layered App_Android';
            } else {
              this.title = 'Layered App_IOS';
            }
          } else if (this.schemeSelected.resourceName === 'RNSDK') {
              this.title = 'RN SDK';
          }
        }
      })
      .catch(error => {
        this.logger.debug(error);
      });
  }
}
