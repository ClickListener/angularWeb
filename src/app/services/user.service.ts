/**
 * Created by zhangxu on 2017/7/17.
 */


import {Injectable} from "@angular/core";
// import {Http, Headers} from "@angular/http";
import {User} from "../model/User";
import {License} from "../model/License";
import {LicenseService} from "./license.service";
import {CookieService} from "ngx-cookie";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Token} from "../model/Token";

import {AES, enc, mode, pad} from "crypto-js";

import * as myGlobals from '../../environments/config';
import {ErrorService} from "./error.service";
import swal from "sweetalert2";
import {NavigationEnd, Router} from "@angular/router";

import * as CryptoJS from 'crypto-js';
import {NGXLogger} from "ngx-logger";

@Injectable()
export class UserService {


  url = myGlobals.url;


  constructor(private http: HttpClient, private _cookieService: CookieService,
              private router: Router, private logger: NGXLogger) {
    this.logger.debug('UserService--------constructor');
    // this.user = JSON.parse(sessionStorage.getItem('user'));
    // this.token = JSON.parse(sessionStorage.getItem('token'));

    this.logger.debug('cookie-user = ', this._cookieService.get('user'));
    this.logger.debug('cookie-token = ', this._cookieService.get('token'));

    if (this._cookieService.get('user') && this._cookieService.get('token')) {
      this.user = JSON.parse(this._cookieService.get('user'));
      this.token = JSON.parse(this._cookieService.get('token'));
    }

    this.logger.debug('UserService--------user = ', this.user);


    // 判断标签页是否激活
    const hiddenProperty = 'hidden' in document ? 'hidden' :
      'webkitHidden' in document ? 'webkitHidden' :
        'mozHidden' in document ? 'mozHidden' :
          null;
    const visibilityChangeEvent = hiddenProperty.replace(/hidden/i, 'visibilitychange');
    const onVisibilityChange = () => {
      if (!document[hiddenProperty]) {

        this.logger.debug('页面激活');

        // 当本地用户不存在，但是cookie中有User时
        if (!this.user && this._cookieService.get('user')) {
          swal({
            position: 'center',
            type: 'info',
            titleText: 'You signed in with another tab.',
            allowOutsideClick: false
          })
            .then(() => {
              this.user = JSON.parse(this._cookieService.get('user'));
              this.token = JSON.parse(this._cookieService.get('token'));
              this.router.navigate(['/']);
            })
            .catch(swal.noop);


        }

        // 当本地用户存在，但是cookie中没有用户时（其他页面登出，或者登录超时）
        if (this.user && !this._cookieService.get('user')) {

          swal({
            position: 'center',
            type: 'error',
            titleText: 'You signed in timeout or signed out in another tab',
            allowOutsideClick: false
            })
            .then(() => {
              this.signOut();
            })
            .catch(swal.noop);
        }

        // 当都存在，并且ID不一样时，将之前页面的 登录用户 置为 当前用户
        if (this.user && this._cookieService.get('user') ) {
          const user = JSON.parse(this._cookieService.get('user'));
          if (this.user._id !== user._id) {
            swal({
              position: 'center',
              type: 'info',
              titleText: 'You signed in with another tab.',
              allowOutsideClick: false
            })
              .then(() => {
                this.user = JSON.parse(this._cookieService.get('user'));
                this.token = JSON.parse(this._cookieService.get('token'));
                this.router.navigate(['/']);
              })
              .catch(swal.noop);
          }
        }

      } else {
        this.logger.debug('页面非激活');
      }
    };
    document.addEventListener(visibilityChangeEvent, onVisibilityChange);

    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe(e => {
        this.logger.debug('prev:', e['url']);
        this.preUrl = e['url'];
      });

  }

  user: any;

  token: Token;

  resourceList = [];

  preUrl: string;


  private options = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };


  private static handleError(error: any): Promise<any> {
    if (error.status === 0) {
      swal({
        position: 'center',
        type: 'error',
        titleText: "Connection Refused",
        showConfirmButton: true,
        // timer: 2000
      }).catch(swal.noop);
    }
    return Promise.reject(error);
  }



  /**
   * 获取单个用户信息
   */

  getUserInfo(userInfo: any): Promise<any> {

    this.logger.debug('userInfo = ', userInfo);

    const url = this.url + "/api/user/userInfo";
    return this.http.get(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      params: userInfo
    }).toPromise()
      .then(async res => {

        if (res['success']) {
          // 如果获得不是登录的用户信息，则不存
          if (!('uid' in userInfo)) {

            this.user = res['user'];

          }
        } else {
          if (res['code'] === '1034') {
            const response = await this.refreshToken();
            if (response['success']) {

              userInfo.token = response.token;

              const appResponse = await this.getUserInfo(userInfo);

              if (appResponse['success']) {

              } else {
                this.hintError(appResponse);
              }
              return appResponse;

            } else {
              this.hintError(response);
            }

          } else {
            this.hintError(res);
          }

        }

        this.logger.debug('user = ' + JSON.stringify(this.user));

        return res;

      })
      .catch(UserService.handleError);

  }

  getResourceList():Promise<any> {

    const url = this.url + "/api/auth/getAuthList";

    return this.http.get(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    }).toPromise()
      .then(res => {
        this.logger.debug(res);
        if (res['success']) {
          this.resourceList = res['data'];
        } else {
          this.hintError(res);
        }


      })
      .catch(UserService.handleError);
  }

  /**
   * 禁用／删除用户
   */

  changeValid(userInfo: any): Promise<any> {

    this.logger.debug('userInfo = ' + JSON.stringify(userInfo));

    const url = this.url + "/api/user/changeValid";

    return this.http.post(url, userInfo, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    }).toPromise()
      .then(res => {
        this.logger.debug(res);
      })
      .catch(UserService.handleError);
  }


  /**
   * 获得当前用户权限，不传uid ，则返回当前用户的权限，传uid， 返回查询的用户权限
   */

  getUserAuth(userInfo: any):Promise<any> {

    this.logger.debug('userInfo = ' + JSON.stringify(userInfo));

    const url =  this.url + "/api/auth/getUserAuth";

    return this.http.get(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      params: userInfo
    }).toPromise()
      .then(async res => {
        this.logger.debug(res);

        if (res['success']) {

        } else {

          if (res['code'] === '1034') {
            const response = await this.refreshToken();
            if (response['success']) {
              userInfo.token = response.token;

              const appResponse = await this.getUserAuth(userInfo);

              if (appResponse['success']) {

              } else {
                this.hintError(appResponse);
              }
              return appResponse;

            } else {
              this.hintError(response);
            }

          } else {
            this.hintError(res);
          }
        }
        return res;
      })
      .catch(UserService.handleError);
  }


  /**
   * 添加用户权限
   * @param perssionInfo
   * @returns {Promise<any>}
   */
  addUserAuth(perssionInfo: any): Promise<any> {

    this.logger.debug("perssionInfo = " + JSON.stringify(perssionInfo));

    const url = this.url + "/api/user/userAuth";

    return this.http.post(url, perssionInfo, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    }).toPromise()
      .then(async res => {
        this.logger.debug(res);
        if (res['success']) {

        } else {

          if (res['code'] === '1034') {
            const response = await this.refreshToken();
            if (response['success']) {

              perssionInfo.token = response.token;

              const appResponse = await this.addUserAuth(perssionInfo);

              if (appResponse['success']) {

              } else {
                this.hintError(appResponse);
              }
              return appResponse;

            } else {
              this.hintError(response);
            }

          } else {
            this.hintError(res);
          }
        }
        return res;
      })
      .catch(UserService.handleError);
  }

  updateUser(userInfo: any): Promise<any> {

    this.logger.debug('userInfo = ' + JSON.stringify(userInfo));

    if (userInfo.user.password) {

      userInfo.user.password = this.md5Encrypt(userInfo.user.password);
    }


    this.logger.debug('userInfo = ' + JSON.stringify(userInfo));

    const url = this.url + "/api/user/update";

    return this.http.post(url, userInfo, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    }).toPromise()
      .then(res => {
        this.logger.debug(res);

        if (res['success']) {

        } else {
          this.hintError(res);
        }

        return res;
      })
      .catch(UserService.handleError);

  }

  /**
   * 根据companyID获得属于该公司的所有开发者
   */

  getUserList(queryInfo): Promise<any> {
    this.logger.debug(JSON.stringify(queryInfo));

    const url = this.url + '/api/user/getUserList';

    return this.http.get(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      params: queryInfo
    }).toPromise()
      .then(async res => {
        this.logger.debug(res);
        if (res['success']) {

        } else {
          if (res['code'] === '1034') {
            const response = await this.refreshToken();
            if (response['success']) {

              queryInfo.token = response.token;

              const appResponse = await this.getUserList(queryInfo);

              if (appResponse['success']) {

              } else {
                this.hintError(appResponse);
              }
              return appResponse;

            } else {
              this.hintError(response);
            }

          } else {
            this.hintError(res);
          }

        }
        return res;
      })
      .catch(UserService.handleError);

  }


  /**
   * 超级管理员获得二季管理员列表
   * @param queryInfo
   * @returns {Promise<any>}
   */
  getAdminList(queryInfo): Promise<any> {

    this.logger.debug(JSON.stringify(queryInfo));

    const url = this.url + '/api/user/getAdminList';

    return this.http.get(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      params: queryInfo
    }).toPromise()
      .then(async res => {

        this.logger.debug(res);

        if (res['success']) {

        } else {
          if (res['code'] === '1034') {
            const response = await this.refreshToken();
            if (response['success']) {

              queryInfo.token = response.token;

              const appResponse = await this.getAdminList(queryInfo);

              if (appResponse['success']) {

              } else {
                this.hintError(appResponse);
              }
              return appResponse;

            } else {
              this.hintError(response);
            }

          } else {
            this.hintError(res);
          }

        }
        return res;

      })
      .catch(UserService.handleError);


  }

  /**
   * 登录服务3
   * @param userInfo
   */
  signIn(userInfo: any): Promise<User> {
    const url = this.url + '/api/user/login';
    this.logger.debug(JSON.stringify(userInfo));

    userInfo.password = this.md5Encrypt(userInfo.password);

    this.logger.debug(JSON.stringify(userInfo));

    return this.http.post(url, JSON.stringify(userInfo), this.options)
      .toPromise()
      .then(async res => {

        this.logger.debug(res);

        if (res['success']) {
          this.user = res['data'];

          return await this.getAccessToken(userInfo.password);


        } else {
          this.hintError(res);
          return res;
        }

      })
      .catch(UserService.handleError);

  }

  /**
   * 注册服务
   * @param userInfo
   *
   */
  signUp(userInfo: any): Promise<any> {
    const url = this.url + '/api/user/add';

    this.logger.debug(JSON.stringify(userInfo));


    userInfo.addUser.password = this.md5Encrypt(userInfo.addUser.password);

    this.logger.debug(JSON.stringify(userInfo));

    return this.http.post(url, JSON.stringify(userInfo), this.options)
      .toPromise()
      .then(async res => {
        this.logger.debug(res);

        if (res['success']) {

          this.logger.debug(res);

          return res;

        } else {
          this.hintError(res);
          return res;
        }


      })
      .catch(UserService.handleError);

  }

  forgotPassword(userInfo: any): Promise<any> {

    this.logger.debug('userInfo = ', userInfo);


    const url = myGlobals.url + '/api/user/forgotPassword';
    return this.http.get(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'Application/json'
      }),
      params: userInfo
    }).toPromise()
      .then(res => {
        this.logger.debug(res);

        if (res['success']) {

        } else {
          this.hintError(res);
        }
        return res;
      })
      .catch(UserService.handleError);
  }

  /**
   * 登出服务
   * @returns {Promise<TResult|T>}
   */
  signOut() {

    this.logger.debug("signOut()");
    //
    // sessionStorage.removeItem('user');
    // sessionStorage.removeItem('token');

    this._cookieService.removeAll();

    this.token = null;
    this.user = null;

    this.router.navigate(['/sign-in']);

  }

  /**
   * 登出服务
   * @returns {Promise<TResult|T>}
   */
  signOutWithoutNavigate() {

    this.logger.debug("signOut()");
    //
    // sessionStorage.removeItem('user');
    // sessionStorage.removeItem('token');

    this._cookieService.removeAll();

    this.token = null;
    this.user = null;

  }


  /**
   * 获取Token，并保存到session中，用于每个接口的调用
   * @param {string} password
   * @returns {Promise<any>}
   */
  private getAccessToken(password: string): Promise<any> {

    this.logger.debug('user = ', this.user);

    const timeStamp = new Date().getTime().toString().substr(0, 10);

    const content = this.user._id + password + timeStamp;
    const secretKey = this.user._id + timeStamp.substr(2, 10);

    const grantStr = this.encrypt(content, secretKey);

    const tokenInfo = {
      "grant_type": "token",
      "userId": this.user._id,
      "grantStr": grantStr,
      "timeStamp": timeStamp

    };


    const url = this.url + '/api/token/getAccessToken';

    this.logger.debug(tokenInfo);

    return this.http.post(url, JSON.stringify(tokenInfo), this.options)
      .toPromise()
      .then(res => {
        this.logger.debug(res);

        if (res['success']) {
          this.token = res as Token;
          // sessionStorage.setItem('token', JSON.stringify(this.token));
          // sessionStorage.setItem('user', JSON.stringify(this.user));

          const expires = new Date().getTime() + 24 * 60 * 60 * 1000;
          this._cookieService.put('user', JSON.stringify(this.user), {
            expires: new Date(expires)
          });
          this._cookieService.put('token', JSON.stringify(this.token), {
            expires: new Date(expires)
          });
        } else {
          this.hintError(res);
        }

        return res;
      })
      .catch(UserService.handleError);
  }


  /**
   * 刷新token，当Token过期时，调用刷新
   * @returns {Promise<any>}
   */
  refreshToken() {
    const refreshTokenInfo = {
      "grant_type": "refresh_token",
      "userId": this.user._id,
      "refresh_token": this.token.refresh_token
    };

    const url = this.url + '/api/token/getAccessToken';

    return this.http.post(url, JSON.stringify(refreshTokenInfo), this.options)
      .toPromise()
      .then(res => {
        this.token = res as Token;


        const expires = new Date().getTime() + 24 * 60 * 60 * 1000;
        this._cookieService.put('user', JSON.stringify(this.user), {
          expires: new Date(expires)
        });
        this._cookieService.put('token', JSON.stringify(this.token), {
          expires: new Date(expires)
        });

        this.logger.debug(this.token);
        return res;
      })
      .catch(UserService.handleError);
  }


  checkUserIsValid(userInfo: any): Promise<any> {

    this.logger.debug("userInfo = ", userInfo);

    const url = this.url + '/api/user/checkStatus';

    return this.http.get(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      params: userInfo
    }).toPromise()
      .then(res => {
        this.logger.debug(res);
        return res;
      })
      .catch(UserService.handleError);
  }


  deleteAdmin(adminInfo: any): Promise<any> {

    this.logger.debug("adminInfo = ", adminInfo);

    const url = myGlobals.url + '/api/user/deleteAdmin';

    return this.http.get(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'Application/json'
      }),
      params: adminInfo
    }).toPromise()
      .then(async res => {
        this.logger.debug(res);

        if (res['success']) {

        } else {
          if (res['code'] === '1034') {
            const response = await this.refreshToken();
            if (response['success']) {

              adminInfo.token = response.token;

              const appResponse = await this.deleteAdmin(adminInfo);

              if (appResponse['success']) {

              } else {
                this.hintError(appResponse);
              }
              return appResponse;

            } else {
              this.hintError(response);
            }

          } else {
            this.hintError(res);
          }

        }
        return res;
      })
      .catch(UserService.handleError);

  }


  /**
   * 加密内容
   * @param content user id , password, 时间戳
   * @param secretKey user id , 时间戳后8位
   * @returns {string}
   */
  private encrypt(content, secretKey): string {
    const ciphertext = AES.encrypt(content, enc.Utf8.parse(secretKey), {
      mode: mode.ECB,
      padding: pad.Pkcs7
    });

    return ciphertext.toString();
  }


  private md5Encrypt(content) {

    const md5 = CryptoJS.MD5(content).toString();

    return md5;
  }


  private hintError(res: any) {

    let message = '';

    switch(res['code']) {

      case '1004':

        message = 'Name or email have been registered.';
        break;
      case '1033':

        message = 'You account has been logged in elsewhere, please re-register.';
        this.signOut();
        break;
      case '1034':

        message = 'LogIn timeout.';
        this.signOut();
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
