/**
 * Created by zhangxu on 2018/4/2.
 */
import {Component} from "@angular/core";
import {UserService} from "../../../../services/user.service";
import {NGXLogger} from "ngx-logger";

@Component({
  templateUrl: './mainAdmin_secondMaster_manager.html',
  styleUrls: ['./mainAdmin_secondMaster_manager.css']
})

export class MainAdminSecondMasterManagerComponent {


  adminList: any;

  loading = true;


  constructor(private userService: UserService, private logger: NGXLogger) {

    const queryInfo = {
      userId: userService.user._id,
      token: userService.token.token
    };

    userService.getAdminList(queryInfo)
      .then(res => {
        this.logger.debug(res);

        if (res.success) {
          this.adminList = res.data;
          this.adminList = this.adminList.reverse();
        }
      })
      .catch(error => {
        this.loading = false;
        this.logger.debug(error);
      });
  }

  deleteAdmin(adminId: string) {

    const adminInfo = {
      "userId": this.userService.user._id,
      "token": this.userService.token.token,
      "adminId": adminId
    };

    this.userService.deleteAdmin(adminInfo)
      .then(async res => {
        this.logger.debug(res);

        if (res.success) {
          const queryInfo = {
            userId: this.userService.user._id,
            token: this.userService.token.token
          };

          const response = await this.userService.getAdminList(queryInfo);

          if (response.success) {
            this.adminList = response.data;
            this.adminList = this.adminList.reverse();
            this.logger.debug('adminList = ', this.adminList);
          }
        }
      })
      .catch(error => {
        this.loading = false;
        this.logger.debug('error = ', error);
      });

  }

}
