/**
 * Created by zhangxu on 2017/12/13.
 */
import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'create-scheme',
  templateUrl: './scheme-create.component.html',
  styleUrls: ['./scheme-create.component.css']
})

export class SchemeCreateComponent implements OnInit{

  param: string;

  ngOnInit(): void {
    console.log('ngOnInit()');
  }


  constructor(private activatedRoute: ActivatedRoute) {
    this.param = activatedRoute.snapshot.queryParams['param'];
    console.log('param = ' + this.param);
  }

}
