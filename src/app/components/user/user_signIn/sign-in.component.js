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
/**
 * Created by zhangxu on 2017/7/13.
 */
var core_1 = require("@angular/core");
var user_service_1 = require("../../../services/user.service");
var router_1 = require("@angular/router");
var SignInComponent = (function () {
    function SignInComponent(userService, router) {
        this.userService = userService;
        this.router = router;
    }
    SignInComponent.prototype.signIn = function (email, password) {
        var _this = this;
        console.log('email = ' + email + " password = " + password);
        this.userService.signIn({ "email": email, "password": password })
            .then(function (res) {
            _this.user = res;
            console.log("email = " + JSON.stringify(_this.user.email));
            console.log("email = " + JSON.stringify(_this.user.licenseType));
            alert("登录成功");
            _this.router.navigate(['/']);
        })
            .catch(function (error) {
            console.log("error = " + JSON.stringify(error));
            alert(error._body.message);
        });
    };
    return SignInComponent;
}());
SignInComponent = __decorate([
    core_1.Component({
        selector: 'sign-in',
        templateUrl: './sign-in.component.html',
        styleUrls: ['sign-in.component.css']
    }),
    __metadata("design:paramtypes", [user_service_1.UserService, router_1.Router])
], SignInComponent);
exports.SignInComponent = SignInComponent;
//# sourceMappingURL=sign-in.component.js.map