/**
 * Created by zhangxu on 2017/7/17.
 */
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var license_service_1 = require("./license.service");
var UserService = UserService_1 = (function () {
    function UserService(http, licenseService) {
        this.http = http;
        this.licenseService = licenseService;
        this.header = {
            headers: new http_1.Headers({ 'Content-Type': 'application/json' })
        };
        console.log('UserService--------constructor');
        this.user = JSON.parse(sessionStorage.getItem('user'));
        console.log('UserService--------user = ' + this.user);
    }
    /**
     * 登录服务3
     * @param userInfo
     */
    UserService.prototype.signIn = function (userInfo) {
        var _this = this;
        var url = '/user/signin';
        console.log(JSON.stringify(userInfo));
        return this.http.post(url, JSON.stringify(userInfo), this.header)
            .toPromise()
            .then(function (res) {
            console.log("user = " + JSON.stringify(res.json().user));
            console.log("As user = " + JSON.stringify(res.json().user));
            _this.user = res.json().user;
            _this.licenseService.licenses = res.json().licenses;
            sessionStorage.setItem('user', JSON.stringify(_this.user));
            sessionStorage.setItem('licenses', JSON.stringify(_this.licenseService.licenses));
            console.log("this.licenseService.licenses = " + JSON.stringify(_this.licenseService.licenses));
            console.log("res.json().licenses = " + JSON.stringify(res.json().licenses));
            console.log("res.json().licenses as License[] = " + JSON.stringify(res.json().licenses));
            // this.licenseService.licenses = res.json().licenses as License[];
            return res.json().user;
        })
            .catch(UserService_1.handleError);
    };
    /**
     * 注册服务
     * @param userInfo
     *
     */
    UserService.prototype.signUp = function (userInfo) {
        var _this = this;
        var url = '/user/signup';
        console.log(JSON.stringify(userInfo));
        return this.http.post(url, JSON.stringify(userInfo), this.header)
            .toPromise()
            .then(function (res) {
            console.log("res.json = " + JSON.stringify(res.json()));
            _this.user = res.json().user;
            _this.licenseService.licenses = res.json().licenses;
            sessionStorage.setItem('user', JSON.stringify(_this.user));
            sessionStorage.setItem('licenses', JSON.stringify(_this.licenseService.licenses));
            return res.json().user;
        })
            .catch(UserService_1.handleError);
    };
    /**
     * 登出服务
     * @returns {Promise<TResult|T>}
     */
    UserService.prototype.signOut = function () {
        var _this = this;
        console.log("signOut()");
        var url = '/user/signout';
        return this.http.get(url).toPromise()
            .then(function (msg) {
            console.log('msg = ' + msg);
            _this.user = undefined;
            _this.licenseService.licenses = undefined;
            sessionStorage.removeItem('user');
            sessionStorage.removeItem('licenses');
            console.info('user = ' + _this.user);
        })
            .catch(UserService_1.handleError);
    };
    UserService.handleError = function (error) {
        console.log('An error occurred', JSON.stringify(error)); //for demo purposes only
        return Promise.reject(error.message || error);
    };
    return UserService;
}());
UserService = UserService_1 = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, license_service_1.LicenseService])
], UserService);
exports.UserService = UserService;
var UserService_1;
//# sourceMappingURL=user.service.js.map