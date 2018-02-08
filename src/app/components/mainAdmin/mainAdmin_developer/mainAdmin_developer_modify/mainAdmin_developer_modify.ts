/**
 * Created by zhangxu on 2018/2/8.
 */
import {Component} from "@angular/core";
import {ActivatedRoute} from "@angular/router";

@Component({
  templateUrl: './mainAdmin_developer_modify.html',
  styleUrls: ['./mainAdmin_developer_modify.css']
})


export class MainAdminDeveloperModifyComponent {

  param: string;
  constructor(private activatedRoute: ActivatedRoute) {

    activatedRoute.paramMap.subscribe(paramMap => {
      this.param = paramMap['params'].param;
    });
  }
}
