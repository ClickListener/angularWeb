/**
 * Created by zhangxu on 08/01/2018.
 */
import {Component} from "@angular/core";
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";

@Component({
  templateUrl: './development_primary.html',
  styleUrls: ['./development_primary.css']
})

export class DevelopmentPrimaryComponent {

  constructor(private userService: UserService, private router: Router) {

    if (!userService.user) {
      this.router.navigate(['/sign-in']);
      return;
    }
  }
}
