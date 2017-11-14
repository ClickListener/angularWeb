/**
 * Created by zhangxu on 2017/6/30.
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
var user_service_1 = require("../../services/user.service");
var router_1 = require("@angular/router");
var AppComponent = (function () {
    function AppComponent(userService, router) {
        this.userService = userService;
        this.router = router;
    }
    AppComponent.prototype.ngOnInit = function () {
        console.log('ngOnInit()');
    };
    AppComponent.prototype.ngOnChanges = function (changes) {
        console.log('ngOnChanges()');
    };
    AppComponent.prototype.signOut = function () {
        var _this = this;
        console.log('signOut');
        this.userService.signOut()
            .then(function () {
            _this.router.navigate(['/']);
        })
            .catch(function (error) {
            console.log('managerComponent---error = ' + error);
        });
    };
    AppComponent.prototype.ngDoCheck = function () {
        console.log('ngDoCheck()');
        this.user = this.userService.user;
        console.log('this.user = ' + this.user);
        console.log('this.userService.user = ' + this.userService.user);
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.css']
    }),
    __metadata("design:paramtypes", [user_service_1.UserService, router_1.Router])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map