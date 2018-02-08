/**
 * Created by zhangxu on 2018/2/8.
 */
import {Component} from "@angular/core";
import {UserService} from "../../../../services/user.service";

@Component({
  templateUrl: './mainAdmin_developer_manager.html',
  styleUrls: ['./mainAdmin_developer_manager.css']
})


export class MainAdminDeveloperManagerComponent {

  developerList: Array<any>;

  constructor(private userService: UserService) {

    // 获得该公司下的所有开发者
    const queryDeveloperList = {
      "userId": userService.user._id,
      "token": userService.token.token
    };

    userService.getUserList(queryDeveloperList)
      .then(res => {
        console.log(res);

        this.developerList = res.data;

      })
      .catch(error => {
        console.log(error);
      });


  }
}
