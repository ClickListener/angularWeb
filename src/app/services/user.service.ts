/**
 * Created by zhangxu on 2017/7/17.
 */


import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import {User} from "../model/User";
import {Observable} from "rxjs";
import {License} from "../model/License";
import {LicenseService} from "./license.service";


@Injectable()
export class UserService {

    constructor(private http : Http, private licenseService:LicenseService) {
        console.log('UserService--------constructor');
        this.user = JSON.parse(sessionStorage.getItem('user'));
        console.log('UserService--------user = ' + this.user);
    }

    user: User;

    private header = {
        headers: new Headers({'Content-Type': 'application/json'})
    };


    /**
     * 登录服务3
     * @param userInfo
     */
    signIn(userInfo : any) : Promise<User> {
        const url = '/user/signin';
        console.log(JSON.stringify(userInfo));

        return this.http.post(url, JSON.stringify(userInfo), this.header)
            .toPromise()
            .then(res => {
                console.log("user = " + JSON.stringify(res.json().user));
                console.log("As user = " + JSON.stringify(res.json().user as User));
                this.user = res.json().user as User;
                this.licenseService.licenses = res.json().licenses;

                sessionStorage.setItem('user', JSON.stringify(this.user));
                sessionStorage.setItem('licenses', JSON.stringify(this.licenseService.licenses));

                console.log("this.licenseService.licenses = " + JSON.stringify(this.licenseService.licenses));
                console.log("res.json().licenses = " + JSON.stringify(res.json().licenses));
                console.log("res.json().licenses as License[] = " + JSON.stringify(res.json().licenses as License[]));
                // this.licenseService.licenses = res.json().licenses as License[];

                return res.json().user as User;
            })
            .catch(UserService.handleError)

    }

    /**
     * 注册服务
     * @param userInfo
     *
     */
    signUp(userInfo : any) : Promise<User> {
        const url = '/user/signup';

        console.log(JSON.stringify(userInfo));

        return this.http.post(url, JSON.stringify(userInfo), this.header)
            .toPromise()
            .then(res => {
                console.log("res.json = " + JSON.stringify(res.json()));
                this.user = res.json().user as User;
                this.licenseService.licenses = res.json().licenses;


                sessionStorage.setItem('user', JSON.stringify(this.user));
                sessionStorage.setItem('licenses', JSON.stringify(this.licenseService.licenses));


                return res.json().user as User;

            })
            .catch(UserService.handleError)

    }

    /**
     * 登出服务
     * @returns {Promise<TResult|T>}
     */
    signOut() : Promise<void> {

        console.log("signOut()");
        const url = '/user/signout';

        return this.http.get(url).toPromise()
            .then((msg) => {

                console.log('msg = ' + msg);
                this.user = undefined;
                this.licenseService.licenses = undefined;
                sessionStorage.removeItem('user');
                sessionStorage.removeItem('licenses');
                console.info('user = ' + this.user);

            })
            .catch(UserService.handleError);

    }

    private static handleError(error:any) : Promise<any> {
        console.log('An error occurred', JSON.stringify(error));//for demo purposes only
        return Promise.reject(error.message || error);
    }
}