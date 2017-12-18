/**
 * Created by zhangxu on 2017/12/13.
 */
import {Component} from "@angular/core";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'scheme-details',
  templateUrl: './scheme-details.component.html',
  styleUrls: ['./scheme-details.component.css']
})

export class SchemeDetailsComponent {

  version: string;

  constructor(private activatedRoute: ActivatedRoute) {
    console.log("scheme = " + JSON.stringify(activatedRoute.snapshot.paramMap['params'].schemeID));
    this.version = activatedRoute.snapshot.paramMap['params'].schemeID;
  }
}
