/**
 * Created by zhangxu on 2018/1/23.
 */
import {Component} from "@angular/core";
import {NavigationEnd, Router} from "@angular/router";
import {NGXLogger} from "ngx-logger";

@Component({
  templateUrl: './manager-main.component.html',
  styleUrls: ['./manager-main.component.css']
})

export class ManagerMainComponent {

  url: string;
  constructor(private router: Router, private logger: NGXLogger) {

    router.events.filter(event => event instanceof NavigationEnd)
      .subscribe(e => {
        this.logger.debug('prev:', e['url']);
        this.url = e['url'];
      });
  }
}
