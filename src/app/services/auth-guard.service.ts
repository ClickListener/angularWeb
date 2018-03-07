/**
 * Created by zhangxu on 2018/3/7.
 */
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import {UserService} from "./user.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService) {}

  canActivate() {
    console.log('AuthGuard#canActivate called');
    if (this.userService.user) {
      return true;
    } else {
      return false;
    }

  }
}
