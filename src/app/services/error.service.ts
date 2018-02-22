/**
 * Created by zhangxu on 2018/2/12.
 */
import {Injectable} from "@angular/core";
import swal from "sweetalert2";
import {UserService} from "./user.service";

@Injectable()

export class ErrorService {

  constructor(private userService: UserService) {}


  hintError(res: any) {

    let message = ''

    switch(res['code']) {

      case '1004':

        message = 'Name or email have been registered.';
        break;
      case '1033':

        message = 'You account has been logged in elsewhere, please re-register.';
        this.userService.signOut();
        break;
      case '1034':

        message = 'LogIn timeout.';
        this.userService.signOut();
        break;

      default:

        message = res['message'];
        break;
    }

    swal({
      position: 'center',
      type: 'error',
      titleText: message,
      showConfirmButton: false,
      timer: 2000,
      padding: 0,
      width: 300
    }).catch(swal.noop);
  }



}
