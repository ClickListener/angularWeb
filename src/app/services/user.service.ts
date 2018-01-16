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

import { AES, enc, mode, pad } from "crypto-js";

@Injectable()
export class UserService {

    constructor(private http: HttpClient, private licenseService:LicenseService, private _cookieService:CookieService) {
        console.log('UserService--------constructor');
        this.user = JSON.parse(sessionStorage.getItem('user'));
        console.log('UserService--------user = ' + this.user);

        // _cookieService.put('name', 'nanme', {
        //   expires: new Date(2017, 11 , 5)
        // });
      console.log('name = ' + _cookieService.get('name'));
    }

    user: User;

    token: Token;

    private options = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
    };


    /**
     * 登录服务3
     * @param userInfo
     */
    signIn(userInfo: any): Promise<User> {
        const url = '/user/signin';
        console.log(JSON.stringify(userInfo));

        return this.http.post(url, JSON.stringify(userInfo), this.options)
            .toPromise()
            .then(res => {

                // console.log("user = " + JSON.stringify(res.json().user));
                // console.log("As user = " + JSON.stringify(res.json().user as User));
                // this.user = res.json().user as User;
                // this.licenseService.licenses = res.json().licenses;
                //
                // sessionStorage.setItem('user', JSON.stringify(this.user));
                // sessionStorage.setItem('licenses', JSON.stringify(this.licenseService.licenses));
                //
                // console.log("this.licenseService.licenses = " + JSON.stringify(this.licenseService.licenses));
                // console.log("res.json().licenses = " + JSON.stringify(res.json().licenses));
                // console.log("res.json().licenses as License[] = " + JSON.stringify(res.json().licenses as License[]));
                // // this.licenseService.licenses = res.json().licenses as License[];
                //
                // return res.json().user as User;
            })
            .catch(UserService.handleError);

    }

    /**
     * 注册服务
     * @param userInfo
     *
     */
    signUp(userInfo: any): Promise<User> {
        const url = '/user/signup';

        console.log(JSON.stringify(userInfo));

        return this.http.post(url, JSON.stringify(userInfo), this.options)
            .toPromise()
            .then(res => {
                // console.log("res.json = " + JSON.stringify(res.json()));
                // this.user = res.json().user as User;
                // this.licenseService.licenses = res.json().licenses;
                //
                //
                // sessionStorage.setItem('user', JSON.stringify(this.user));
                // sessionStorage.setItem('licenses', JSON.stringify(this.licenseService.licenses));
                //
                //
                // return res.json().user as User;

            })
            .catch(UserService.handleError);

    }

    /**
     * 登出服务
     * @returns {Promise<TResult|T>}
     */
    signOut(): Promise<string> {

        console.log("signOut()");
        const url = '/user/signout';

        return this.http.get(url).toPromise()
            .then((msg) => {

                console.log('msg = ' + msg);
                this.user = undefined;
                this.licenseService.licenses = undefined;
                sessionStorage.removeItem('user');
                sessionStorage.removeItem('licenses');
                console.log('user = ' + this.user);

            })
            .catch(UserService.handleError);

    }


    accessToken(password: string): Promise<any> {
      const timeStamp = new Date().getTime().toString().substr(0, 10);

      // const content = this.user._id + password + timeStamp;
      // const secretKey = this.user._id + timeStamp.substr(2, 10);

      const content = "5a0269747ac9d897d0f57b60" + password + timeStamp;
      const secretKey = "5a0269747ac9d897d0f57b60" + timeStamp.substr(2, 10);


      const grantStr = this.encrypt(content, secretKey);

      // const tokenInfo = {
      //   "grant_type": "token",
      //   "userId": this.user._id,
      //   "grantStr": grantStr,
      //   "timeStamp": timeStamp
      //
      // };
      const tokenInfo = {
        "grant_type": "token",
        "userId": "5a0269747ac9d897d0f57b60",
        "grantStr": grantStr,
        "timeStamp": timeStamp

      };

      const url = 'http://localhost:3001/token/getAccessToken';

      console.log(tokenInfo);

      return this.http.post(url, JSON.stringify(tokenInfo), this.options)
        .toPromise()
        .then(res => {
          this.token = res as Token;
          return res;
        })
        .catch(UserService.handleError);
    }


    private encrypt(content, secretKey): string {
      const ciphertext = AES.encrypt(content, enc.Utf8.parse(secretKey), {
        mode: mode.ECB,
        padding: pad.Pkcs7
      });

      return ciphertext.toString();
    }

    private static handleError(error:any): Promise<any> {
        console.log('An error occurred', JSON.stringify(error));// for demo purposes only
        return Promise.reject(error.message || error);
    }
}
