/**
 * Created by zhangxu on 2018/3/9.
 */
import {Component} from "@angular/core";
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";

@Component({
  templateUrl: './sign_confirm.component.html',
  styleUrls: ['./sign_confirm.component.css']
})

export class SignConfirmComponent {

  constructor(private userService: UserService, private router: Router) {
    if (userService.user) {
      userService.signOut();
    } else {
      this.router.navigate(['/sign-in']);
    }
  }
}
