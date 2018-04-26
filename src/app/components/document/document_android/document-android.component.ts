/**
 * Created by zhangxu on 2018/1/29.
 */
import {Component} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {NGXLogger} from "ngx-logger";

@Component({
  templateUrl: './document-android.component.html',
  styleUrls: ['./document-android.component.css']
})

export class DocumentAndroidComponent {

  param: string;


  constructor(private activatedRoute: ActivatedRoute, private logger: NGXLogger) {

    // 通过 parent 属性获得父组件，通过父组件的paramMap获得参数
    this.activatedRoute.parent.paramMap.subscribe(paramMap => {
      this.logger.debug('this.param = ' + paramMap['params'].param);

      this.param = paramMap['params'].param;
    });
  }
}
