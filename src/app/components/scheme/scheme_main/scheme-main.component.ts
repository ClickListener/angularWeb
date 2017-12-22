/**
 * Created by zhangxu on 2017/12/15.
 */
import {Component} from "@angular/core";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {Location} from "@angular/common";
import {SchemeService} from "../../../services/scheme.service";



@Component({
  selector: 'scheme-main',
  templateUrl: './scheme-main.component.html',
  styleUrls: ['./scheme-main.component.css']
})

export class SchemeMainComponent {

  title: string;

  scheme: any;

  param: string;


  constructor(private activatedRoute: ActivatedRoute, private router: Router,
              private _location: Location, private schemeService: SchemeService) {


    // 还没弄懂，https://segmentfault.com/a/1190000009971757
    router.events
      .filter(event => event instanceof NavigationEnd)
      .map(() => activatedRoute)
      .map(route => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        console.log(route);
        console.log(route.snapshot.params.schemeID);
        return route;
      })
      .mergeMap(route => route.data)
      .subscribe(data => {
        this.title = data.title;
      });


  }


  // 导航返回
  private backClicked() {
    this._location.back();
  }

}
