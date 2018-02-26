/**
 * Created by zhangxu on 2018/1/23.
 */
import {Component} from "@angular/core";
import {UserService} from "../../../services/user.service";
import {SchemeService} from "../../../services/scheme.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  templateUrl: './android.component.html',
  styleUrls: ['./android.component.css']
})

export class AndroidComponent {

  param: string;

  schemeList: Array<any>;

  title: string;
  item: string;

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService, private schemeService: SchemeService) {


    activatedRoute.parent.paramMap.subscribe( paramMap => {
      this.param = paramMap['params'].param;
      console.log('param = ', this.param);

      if (this.param === 'SDK') {
        this.title = 'Native SDK';
        this.item = 'Native SDK_Android';
      } else if (this.param === 'Library') {
        this.title = 'Library SDK';
        this.item = 'Library SDK_Android';
      } else if (this.param === 'LayerApp') {
        this.title = 'Layered App';
        this.item = 'Layered App_Android';
      }

      const fileInfo = {
        "userId": userService.user._id,
        "token": userService.token.token,
        "appName": this.param,
        "platform": "android"
      };

      schemeService.queryScheme(fileInfo)
        .then(res => {

          console.log(res);
          if (res.success) {
            this.schemeList = res.data;
          }
        })
        .catch(error => {
          console.log(error);
        });

    });






  }
}
