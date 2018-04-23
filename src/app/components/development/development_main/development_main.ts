/**
 * Created by zhangxu on 10/01/2018.
 */
import {Component} from "@angular/core";
import {UserService} from "../../../services/user.service";

@Component({
  templateUrl: './development_main.html',
  styleUrls: ['./development_main.css']
})


export class DevelopmentMainComponent {

  user: any;
  constructor(private userService: UserService) {
    this.user = userService.user;
  }
}
