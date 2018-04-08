/**
 * Created by zhangxu on 2018/4/2.
 */
import {Component} from "@angular/core";
import {UserService} from "../../../../services/user.service";

@Component({
  templateUrl: './mainAdmin_secondMaster_manager.html',
  styleUrls: ['./mainAdmin_secondMaster_manager.css']
})

export class MainAdminSecondMasterManagerComponent {


  adminList: any;


  constructor(private userService: UserService) {

    const queryInfo = {
      userId: userService.user._id,
      token: userService.token.token
    };

    userService.getAdminList(queryInfo)
      .then(res => {
        console.log(res);

        if (res.success) {
          this.adminList = res.data;
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
}
