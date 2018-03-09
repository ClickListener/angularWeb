/**
 * Created by zhangxu on 2018/1/23.
 */
import {Component} from "@angular/core";
import {NavigationEnd, Router} from "@angular/router";

@Component({
  templateUrl: './manager-main.component.html',
  styleUrls: ['./manager-main.component.css']
})

export class ManagerMainComponent {

  url: string;
  constructor(private router: Router) {

    router.events.filter(event => event instanceof NavigationEnd)
      .subscribe(e => {
        console.log('prev:', e['url']);
        this.url = e['url'];
      });
  }
}
