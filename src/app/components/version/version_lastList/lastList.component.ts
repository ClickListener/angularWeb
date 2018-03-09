/**
 * Created by zhangxu on 2018/2/24.
 */
import {Component} from "@angular/core";
import {SchemeService} from "../../../services/scheme.service";
import {UserService} from "../../../services/user.service";

@Component({
  templateUrl: './lastList.component.html',
  styleUrls: ['./lastList.component.css']
})


export class LastListComponent {

  project = [
    {
      'appName': 'SDK',
      'platform': 'android'
    },
    {
      'appName': 'SDK',
      'platform': 'ios'
    },
    {
      'appName': 'Library',
      'platform': 'android'
    },
    {
      'appName': 'Library',
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
  LibraryLastVersion_android: string;
  LibraryLastVersion_ios: string;
  LayerAppLastVersion_android: string;
  LayerAppLastVersion_ios: string;
  constructor(private schemeService: SchemeService, private userService: UserService) {


    this.project.forEach((project) => {

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
            if (lastVersion) {
              if (lastVersion.resourceName === 'SDK') {
                if(lastVersion.platform === 'android') {
                  this.SDKLastVersion_android = 'Native SDK_Android ' + lastVersion.version;
                } else {
                  this.SDKLastVersion_android = 'Native SDK_IOS ' + lastVersion.version;
                }
              } else if (lastVersion.resourceName === 'Library') {
                if(lastVersion.platform === 'android') {
                  this.LibraryLastVersion_android = 'Library SDK_Android ' + lastVersion.version;
                } else {
                  this.LibraryLastVersion_ios = 'Library SDK_IOS ' + lastVersion.version;
                }
              } else if (lastVersion.resourceName === 'LayerApp') {
                if(lastVersion.platform === 'android') {
                  this.LayerAppLastVersion_android = 'Layer App_Android ' + lastVersion.version;
                } else {
                  this.LayerAppLastVersion_ios = 'Layer App_IOS ' + lastVersion.version;
                }
              }
            }
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
