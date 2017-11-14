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
 * Created by zhangxu on 2017/9/19.
 */
var core_1 = require("@angular/core");
var user_service_1 = require("../../../services/user.service");
var router_1 = require("@angular/router");
var license_service_1 = require("../../../services/license.service");
var sweetalert2_1 = require("sweetalert2");
var ManagerComponent = (function () {
    function ManagerComponent(userService, router, licenseService) {
        this.userService = userService;
        this.router = router;
        this.licenseService = licenseService;
        this.licenses = [];
        this.licenses_fake = [
            {
                "ExpiredDate": "2017-10-10",
                "DeviceInfo": [
                    {
                        "DeviceModel": "BP5",
                        "DeviceTotalNumber": 100,
                        "DeviceUsedNumber": 1,
                    },
                    {
                        "DeviceModel": "AM4",
                        "DeviceTotalNumber": 200,
                        "DeviceUsedNumber": 1,
                    }
                ],
                "InstalledPhoneNumber": 1000
            },
            {
                "ExpiredDate": "2017-10-10",
                "DeviceInfo": [
                    {
                        "DeviceModel": "BP5",
                        "DeviceTotalNumber": 100,
                        "DeviceUsedNumber": 1,
                    },
                    {
                        "DeviceModel": "AM4",
                        "DeviceTotalNumber": 200,
                        "DeviceUsedNumber": 1,
                    }
                ],
                "InstalledPhoneNumber": 1000
            },
            {
                "ExpiredDate": "2017-10-10",
                "DeviceInfo": [
                    {
                        "DeviceModel": "BP5",
                        "DeviceTotalNumber": 100,
                        "DeviceUsedNumber": 1,
                    },
                    {
                        "DeviceModel": "AM4",
                        "DeviceTotalNumber": 200,
                        "DeviceUsedNumber": 1,
                    }
                ],
                "InstalledPhoneNumber": 1000
            }
        ];
    }
    ManagerComponent.prototype.ngOnInit = function () {
        this.user = this.userService.user;
    };
    ManagerComponent.prototype.ngDoCheck = function () {
        this.licenses = this.licenseService.licenses;
        console.info("this.licenses = " + JSON.stringify(this.licenses));
        if (this.licenses !== null) {
            console.info("this.licenses.length = " + this.licenses.length);
        }
    };
    ManagerComponent.prototype.createNewLicense = function () {
        this.router.navigate(['./create-newLicense']);
    };
    //修改License，跳转到修改界面
    ManagerComponent.prototype.modifyLicense = function (licenseId) {
        this.router.navigate(['./modify-license', licenseId]);
    };
    ManagerComponent.prototype.deleteLicense = function (licenseId) {
        console.log('deleteLicense()');
        var self = this;
        sweetalert2_1.default({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(function () {
            self.licenseService.deleteLicense(licenseId)
                .then(function (res) {
                sweetalert2_1.default('Deleted!', 'Your file has been deleted.', 'success');
            })
                .catch(function (error) {
                console.log("ManagerComponent--error = " + JSON.stringify(error));
            });
        }).catch(sweetalert2_1.default.noop);
    };
    return ManagerComponent;
}());
ManagerComponent = __decorate([
    core_1.Component({
        selector: 'manager-license',
        templateUrl: './manager.component.html',
        styleUrls: ['manager.component.css']
    }),
    __metadata("design:paramtypes", [user_service_1.UserService, router_1.Router, license_service_1.LicenseService])
], ManagerComponent);
exports.ManagerComponent = ManagerComponent;
//# sourceMappingURL=manager.component.js.map