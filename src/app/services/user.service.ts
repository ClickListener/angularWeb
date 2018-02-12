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

@Injectable()
export class UserService {


  url = myGlobals.url;


  constructor(private http: HttpClient, private _cookieService: CookieService) {
    console.log('UserService--------constructor');
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.token = JSON.parse(sessionStorage.getItem('token'));
    console.log('UserService--------user = ' + this.user);

    // _cookieService.put('name', 'nanme', {
    //   expires: new Date(2017, 11 , 5)
    // });
    console.log('name = ' + _cookieService.get('name'));
  }

  user: any;

  token: Token;

  resourceList = [];

  private options = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };


  private static handleError(error: any): Promise<any> {
    console.log('An error occurred', error.toString());// for demo purposes only
    return Promise.reject(error.message || error);
  }



  /**
   * 获取单个用户信息
   */

  getUserInfo(userInfo: any): Promise<any> {

    console.log('userInfo = ', userInfo);

    const url = this.url + "/user/userInfo";
    return this.http.get(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      params: userInfo
    }).toPromise()
      .then(res => {

        if (!('uid' in userInfo)) {

          this.user = res['user'];
        }
        console.log('user = ' + JSON.stringify(this.user));

        return res;

      })
      .catch(UserService.handleError);

  }

  getResourceList():Promise<any> {


    const url = this.url + "/auth/getAuthList";

    return this.http.get(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    }).toPromise()
      .then(res => {
        console.log(res);
        this.resourceList = res['data'];

      })
      .catch(UserService.handleError);
  }

  /**
   * 禁用／删除用户
   */

  changeValid(userInfo: any): Promise<any> {

    console.log('userInfo = ' + JSON.stringify(userInfo));

    const url = this.url + "/user/changeValid";

    return this.http.post(url, userInfo, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    }).toPromise()
      .then(res => {
        console.log(res);
      })
      .catch(UserService.handleError);
  }


  /**
   * 获得当前用户权限，不传uid ，则返回当前用户的权限，传uid， 返回查询的用户权限
   */

  getUserAuth(userInfo: any):Promise<any> {

    console.log('userInfo = ' + JSON.stringify(userInfo));

    const url =  this.url + "/auth/getUserAuth";

    return this.http.get(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      params: userInfo
    }).toPromise()
      .then(res => {
        console.log(res);
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

    console.log("perssionInfo = " + JSON.stringify(perssionInfo));

    const url = this.url + "/user/userAuth";

    return this.http.post(url, perssionInfo, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    }).toPromise()
      .then(res => {
        console.log(res);
        return res;
      })
      .catch(UserService.handleError);
  }

  updateUser(userInfo: any): Promise<any> {

    console.log('userInfo = ' + JSON.stringify(userInfo));

    const url = this.url + "/user/update";

    return this.http.post(url, userInfo, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    }).toPromise()
      .then(res => {
        console.log(res);
      })
      .catch(UserService.handleError);

  }

  /**
   * 根据companyID获得属于该公司的所有开发者
   */

  getUserList(queryInfo): Promise<any> {
    console.log(JSON.stringify(queryInfo));

    const url = this.url + '/user/getUserList';

    return this.http.get(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      params: queryInfo
    }).toPromise()
      .then(res => {
        console.log(res);
        return res;
      })
      .catch(UserService.handleError);

  }

  /**
   * 登录服务3
   * @param userInfo
   */
  signIn(userInfo: any): Promise<User> {
    const url = this.url + '/user/login';
    console.log(JSON.stringify(userInfo));

    return this.http.post(url, JSON.stringify(userInfo), this.options)
      .toPromise()
      .then(async res => {

        console.log(res);


        if (res['success']) {
          this.user = res['data'];

          return await this.getAccessToken(userInfo.password);


        } else {
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
  signUp(userInfo: any): Promise<User> {
    const url = this.url + '/user/add';

    console.log(JSON.stringify(userInfo));

    return this.http.post(url, JSON.stringify(userInfo), this.options)
      .toPromise()
      .then(async res => {
        console.log(res);

        if (res['success']) {

          console.log(res);

          return res;

          // const userSignInfo = {
          //   "username": userInfo.addUser.username,
          //   "password": userInfo.addUser.password
          // };
          //
          // return await this.signIn(userSignInfo);

        } else {
          return res;
        }


      })
      .catch(UserService.handleError);

  }

  /**
   * 登出服务
   * @returns {Promise<TResult|T>}
   */
  signOut() {

    console.log("signOut()");

    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');

    this.token = null;
    this.user = null;

  }


  /**
   * 获取Token，并保存到session中，用于每个接口的调用
   * @param {string} password
   * @returns {Promise<any>}
   */
  private getAccessToken(password: string): Promise<any> {
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


    const url = this.url + '/token/getAccessToken';

    console.log(tokenInfo);

    return this.http.post(url, JSON.stringify(tokenInfo), this.options)
      .toPromise()
      .then(res => {
        console.log(res);

        if (res['success']) {
          this.token = res as Token;
          sessionStorage.setItem('token', JSON.stringify(this.token));
          sessionStorage.setItem('user', JSON.stringify(this.user));
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

    const url = this.url + '/token/getAccessToken';

    return this.http.post(url, JSON.stringify(refreshTokenInfo), this.options)
      .toPromise()
      .then(res => {
        this.token = res as Token;

        console.log(this.token);
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

}
