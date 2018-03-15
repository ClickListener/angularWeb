/**
 * Created by zhangxu on 2018/1/23.
 */
import {Component} from "@angular/core";
import {SchemeService} from "../../../services/scheme.service";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../../services/user.service";

@Component({
  templateUrl: './ios.component.html',
  styleUrls: ['./ios.component.css']
})

export class IOSComponent {
  param: string;

  schemeList: Array<any>;

  title: string;
  item: string;

  isBeta: boolean;
  permissionOfBeta: boolean;
  permissionOfCheck = true;

  loading = true;

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService, private schemeService: SchemeService) {


    activatedRoute.parent.paramMap.subscribe( paramMap => {
      this.param = paramMap['params'].param;
      console.log('param = ', this.param);

      this.schemeList = null;
      this.isBeta = null;
      this.permissionOfBeta = null;
      this.permissionOfCheck = true;
      this.loading = true;

      if (this.param === 'NativeSDK') {
        this.title = 'Native SDK';
        this.item = 'Native SDK_IOS';
      } else if (this.param === 'LibrarySDK') {
        this.title = 'Library SDK';
        this.item = 'Library SDK_IOS';
      } else if (this.param === 'LayerApp') {
        this.title = 'Layer App';
        this.item = 'Layer App_IOS';
      }

      if (userService.user.type === 3) {
        const userInfo = {
          "userId": userService.user._id,
          "token": userService.token.token
        };

        userService.getUserAuth(userInfo)
          .then(res => {
            console.log('res = ', res);
            if (res.success) {
              this.parsePermission(res.data);
              this.getSchemeList(0);
            } else {
              this.loading = false;
            }
          })
          .catch(error => {
            console.log('error = ', error);
          });
      }



    });

  }

  private parsePermission(permission: any) {

    console.log('permission = ', permission);

    permission.forEach((item, index) => {
      if (item.resourceId === '5a6580ca5e149e1dfdf27962') {
        this.permissionOfBeta = (item.action.indexOf('R') !== -1);
        console.log('beta = ', this.permissionOfBeta);
        return;
      }

    });
  }


  getSchemeList(type: number) {

    if (type === 0) {
      this.isBeta = false;
    } else {
      this.isBeta = true;
    }

    const fileInfo = {
      "userId": this.userService.user._id,
      "token": this.userService.token.token,
      "appName": this.param,
      "platform": "ios",
      "beta": type
    };

    this.schemeService.queryScheme(fileInfo)
      .then(res => {

        console.log(res);
        if (res.success) {
          this.permissionOfCheck = true;
          this.schemeList = res.data;
          this.loading = false;
        } else if (res.code === '1062') {
          this.permissionOfCheck = false;
          this.loading = false;
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
}
