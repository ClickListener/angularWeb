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

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService, private schemeService: SchemeService) {


    activatedRoute.parent.paramMap.subscribe( paramMap => {
      this.param = paramMap['params'].param;
      console.log('param = ', this.param);


      const fileInfo = {
        "userId": userService.user._id,
        "token": userService.token.token,
        "appName": this.param,
        "platform": "ios"
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
