/**
 * Created by zhangxu on 2017/12/13.
 */
import {Component} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {SchemeService} from "../../../services/scheme.service";

@Component({
  selector: 'scheme-modify',
  templateUrl: './scheme-modify.component.html',
  styleUrls: ['./scheme-modify.component.css']
})

export class SchemeModifyComponent {

  selectedScheme: any;

  constructor(private activatedRoute: ActivatedRoute, private schemeService: SchemeService) {

    this.selectedScheme = schemeService.schemeAll.find(function (scheme, index, arr) {
      return scheme._id === activatedRoute.snapshot.paramMap['params'].schemeID;
    });
  }
}
