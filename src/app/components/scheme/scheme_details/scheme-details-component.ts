/**
 * Created by zhangxu on 2017/12/13.
 */
import {Component} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {SchemeService} from "../../../services/scheme.service";

@Component({
  selector: 'scheme-details',
  templateUrl: './scheme-details.component.html',
  styleUrls: ['./scheme-details.component.css']
})

export class SchemeDetailsComponent {

  version: string;
  schemeSelected: any;


  constructor(private activatedRoute: ActivatedRoute, private schemeService: SchemeService) {
    console.log("scheme = " + JSON.stringify(activatedRoute.snapshot.paramMap['params'].schemeID));
    this.version = activatedRoute.snapshot.paramMap['params'].schemeID;

    this.schemeSelected = schemeService.schemeAll.find(function (scheme, index, arr) {
      return scheme._id === activatedRoute.snapshot.paramMap['params'].schemeID;
    });




  }
}
