/**
 * Created by zhangxu on 2018/2/24.
 */
import {Component} from "@angular/core";
import {SchemeService} from "../../../services/scheme.service";
import {UserService} from "../../../services/user.service";
import {NavigationEnd, Router} from "@angular/router";
import {version} from "punycode";
import {NGXLogger} from "ngx-logger";

@Component({
  templateUrl: './lastList.component.html',
  styleUrls: ['./lastList.component.css']
})


export class LastListComponent {

  project = [
    {
      'appName': 'NativeSDK',
      'platform': 'android'
    },
    {
      'appName': 'NativeSDK',
      'platform': 'ios'
    },
    // {
    //   'appName': 'LibrarySDK',
    //   'platform': 'android'
    // },
    // {
    //   'appName': 'LibrarySDK',
    //   'platform': 'ios'
    // },
    {
      'appName': 'LayeredApp',
      'platform': 'android'
    },
    {
      'appName': 'LayeredApp',
      'platform': 'ios'
    }
  ];

  SDKLastVersion_android: string;
  SDKLastVersion_ios: string;
  SDKLastVersion_url_android: string;
  SDKLastVersion_url_ios: string;
  LibraryLastVersion_android: string;
  LibraryLastVersion_ios: string;
  LibraryLastVersion_url_android: string;
  LibraryLastVersion_url_ios: string;
  LayerAppLastVersion_android: string;
  LayerAppLastVersion_ios: string;
  LayerAppLastVersion_url_android: string;
  LayerAppLastVersion_url_ios: string;

  url: string;

  loading = true;
  constructor(private schemeService: SchemeService, private userService: UserService,
              private router: Router, private logger: NGXLogger) {


    router.events.filter(event => event instanceof NavigationEnd)
      .subscribe(e => {
        this.url = e['url'];
      });
    if (!userService.user) {
      router.navigate(['/sign-in']);
      return;
    }
    this.project.forEach((project, index) => {

      const fileInfo = {
        "userId": userService.user._id,
        "token": userService.token.token,
        "appName": project.appName,
        "platform": project.platform
      };

      schemeService.queryScheme(fileInfo)
        .then(res => {
          this.logger.debug(res);
          if (res.success) {
            const lastVersion = this.findLastVersionScheme(res.data);
            this.logger.debug('lastVersion = ', lastVersion);
            if (lastVersion) {
              if (lastVersion.resourceName === 'NativeSDK') {
                if(lastVersion.platform === 'android') {
                  this.SDKLastVersion_android = 'Native SDK_Android ' + lastVersion.version;
                  this.SDKLastVersion_url_android = lastVersion._id;
                } else {
                  this.SDKLastVersion_ios = 'Native SDK_IOS ' + lastVersion.version;
                  this.SDKLastVersion_url_ios = lastVersion._id;
                }
              } else if (lastVersion.resourceName === 'LibrarySDK') {
                if(lastVersion.platform === 'android') {
                  this.LibraryLastVersion_android = 'Library SDK_Android ' + lastVersion.version;
                  this.LibraryLastVersion_url_android = lastVersion._id;
                } else {
                  this.LibraryLastVersion_ios = 'Library SDK_IOS ' + lastVersion.version;
                  this.LibraryLastVersion_url_ios = lastVersion._id;
                }
              } else if (lastVersion.resourceName === 'LayeredApp') {
                if(lastVersion.platform === 'android') {
                  this.LayerAppLastVersion_android = 'Layered App_Android ' + lastVersion.version;
                  this.LayerAppLastVersion_url_android = lastVersion._id;
                } else {
                  this.LayerAppLastVersion_ios = 'Layered App_IOS ' + lastVersion.version;
                  this.LayerAppLastVersion_url_ios = lastVersion._id;
                }
              }
            }
          } else {
            this.loading = false;
          }

          if (this.project.length - 1 === index) {
            this.loading = false;
          }

        })
        .catch(error => {
          this.logger.debug('error', error);
        });
    });



  }

  findLastVersionScheme(schemeList: any) {

    if (schemeList.length !== 0) {
      this.logger.debug(schemeList);

      schemeList.sort( (m, n) => {


        const version1 = m.version;
        const version2 = n.version;

        return this.versionCompare(version1, version2);

      });

      this.logger.debug(schemeList);

      return schemeList[0];
    }

  }

   versionCompare(version1,version2) {

    const arr1 = version1.split('.');
    const arr2 = version2.split('.');
    // 将两个版本号拆成数字
    const minL = Math.min(arr1.length, arr2.length);
    let pos = 0;        // 当前比较位
    let diff = 0;        // 当前为位比较是否相等

    // 逐个比较如果当前位相等则继续比较下一位
    while (pos < minL) {
      diff = parseInt(arr1[pos]) - parseInt(arr2[pos]);
      if (diff !== 0) {
        break;
      }
      pos++;
    }

    if (diff > 0) {
      return -1;
    } else if (diff === 0) {
      if (arr1.length > arr2.length) {
        return -1;
      } else if (arr1.length < arr2.length) {
        return 1;
      } else {
        return 0;
      }
    } else {
      return 1;
    }
  }










}
