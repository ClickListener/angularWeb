/**
 * Created by zhangxu on 2018/4/3.
 */
import {Component} from "@angular/core";
import {ActivatedRoute} from "@angular/router";

@Component({
  templateUrl: './mainAdmin_secondMaster_modify.html',
  styleUrls: ['./mainAdmin_secondMaster_modify.css']
})

export class MainAdminSecondMasterModifyComponent {


  id: string;

  constructor(private activatedRoute: ActivatedRoute) {
    activatedRoute.paramMap.subscribe((paramMap) => {
      this.id = paramMap['params'].param;
    });
  }


}
