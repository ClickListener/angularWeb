/**
 * Created by zhangxu on 2017/12/13.
 */
import {Component, OnChanges, OnInit, SimpleChanges} from "@angular/core";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'scheme-manager',
  templateUrl: './scheme-manager.component.html',
  styleUrls: ['./scheme-manager.component.css']
})

export class SchemeManagerComponent implements OnInit {

  param: string;

  schemes = [
    {
      "project": "SDK",
      "version": "1.0.0",
      "CreateTime": "2017-12-12"
    },
    {
      "project": "SDK",
      "version": "2.0.0",
      "CreateTime": "2017-12-12"
    },
    {
      "project": "SDK",
      "version": "3.0.0",
      "CreateTime": "2017-12-12"
    },
    {
      "project": "SDK",
      "version": "4.0.0",
      "CreateTime": "2017-12-12"
    }
  ]

  ngOnInit(): void {

    // 如果同一个页面，使用同样的url，但是参数不同，只有第一次加载的时候，会走constructor(),和ngOnInit()方法，快照版式无法实时的获取新的参数
    // stackoverflow 中问题：
    // https://stackoverflow.com/questions/39533291/angular2-router-2-0-0-not-reloading-components-when-same-url-loaded-with-differe

    this.activatedRoute.params.subscribe(params => {
      this.param = params['param'];
    });

  }


  constructor(private activatedRoute: ActivatedRoute) {}





}
