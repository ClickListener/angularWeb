/**
 * Created by zhangxu on 2018/1/29.
 */
import {Component} from "@angular/core";
import {ActivatedRoute} from "@angular/router";

@Component({
  templateUrl: './document_main.component.html',
  styleUrls: ['./document_main.component.css']
})

export class DocumentMainComponent {


  param: string;
  constructor(private activatedRoute: ActivatedRoute) {

    activatedRoute.paramMap.subscribe(paramMap => {
      this.param = paramMap['params'].param;

    });
  }
}
