/**
 * Created by zhangxu on 2018/1/29.
 */
import {Component} from "@angular/core";
import {ActivatedRoute} from "@angular/router";

@Component({
  templateUrl: './document-android.component.html',
  styleUrls: ['./document-android.component.css']
})

export class DocumentAndroidComponent {

  param: string;


  constructor(private activatedRoute: ActivatedRoute) {

    // 通过 parent 属性获得父组件，通过父组件的paramMap获得参数
    this.activatedRoute.parent.paramMap.subscribe(paramMap => {
      console.log('this.param = ' + paramMap['params'].param);

      this.param = paramMap['params'].param;
    });
  }
}
