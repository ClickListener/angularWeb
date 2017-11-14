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
var SignUpComponent = (function () {
    function SignUpComponent(userService, router) {
        this.userService = userService;
        this.router = router;
    }
    SignUpComponent.prototype.signUp = function (email, password) {
        var _this = this;
        console.log("email = " + email + "password = " + password);
        this.userService.signUp({ "email": email, "password": password })
            .then(function () {
            alert("注册成功");
            _this.router.navigate(['/']);
        })
            .catch(function (error) {
            console.log("error = " + JSON.stringify(error));
        });
    };
    return SignUpComponent;
}());
SignUpComponent = __decorate([
    core_1.Component({
        selector: 'sign-up',
        templateUrl: './sign-up.component.html',
        styleUrls: ['./sign-up.component.css']
    }),
    __metadata("design:paramtypes", [user_service_1.UserService, router_1.Router])
], SignUpComponent);
exports.SignUpComponent = SignUpComponent;
//# sourceMappingURL=sign-up.component.js.map