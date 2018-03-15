/**
 * Created by zhangxu on 2018/2/24.
 */
import {Component} from "@angular/core";
import {SchemeService} from "../../../services/scheme.service";
import {UserService} from "../../../services/user.service";
import {NavigationEnd, Router} from "@angular/router";

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
    {
      'appName': 'LibrarySDK',
      'platform': 'android'
    },
    {
      'appName': 'LibrarySDK',
      'platform': 'ios'
    },
    {
      'appName': 'LayerApp',
      'platform': 'android'
    },
    {
      'appName': 'LayerApp',
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
              private router: Router) {


    router.events.filter(event => event instanceof NavigationEnd)
      .subscribe(e => {
        this.url = e['url'];
      });
    this.project.forEach((project, index) => {

      const fileInfo = {
        "userId": userService.user._id,
        "token": userService.token.token,
        "appName": project.appName,
        "platform": project.platform
      };

      schemeService.queryScheme(fileInfo)
        .then(res => {
          console.log(res);
          if (res.success) {
            const lastVersion = this.findLastVersionScheme(res.data);
            console.log('lastVersion = ', lastVersion);
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
              } else if (lastVersion.resourceName === 'LayerApp') {
                if(lastVersion.platform === 'android') {
                  this.LayerAppLastVersion_android = 'Layer App_Android ' + lastVersion.version;
                  this.LayerAppLastVersion_url_android = lastVersion._id;
                } else {
                  this.LayerAppLastVersion_ios = 'Layer App_IOS ' + lastVersion.version;
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
          console.log('error', error);
        });
    });



  }

  findLastVersionScheme(schemeList: any) {

    if (schemeList.length !== 0) {
      console.log(schemeList);

      schemeList.sort(function (m, n) {


        const version1 = m.version;
        const version2 = n.version;

        if (version1 < version2) {
          return 1;
        } else if (version1 > version2) {
          return -1;
        } else {
          return 0;
        }
      });

      console.log(schemeList);

      return schemeList[0];
    }



  }









}
