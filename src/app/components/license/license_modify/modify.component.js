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
var router_1 = require("@angular/router");
var license_service_1 = require("../../../services/license.service");
var user_service_1 = require("../../../services/user.service");
var devices_service_1 = require("../../../services/devices.service");
var ModifyComponent = (function () {
    function ModifyComponent(licenseService, userService, router, activateRoute, devicesService) {
        this.licenseService = licenseService;
        this.userService = userService;
        this.router = router;
        this.activateRoute = activateRoute;
        this.devicesService = devicesService;
        this.devices = [];
        //主界面存放Devices的数组
        this.selectedDevices = [];
        //次级界面已选择设备的个数，为了显示未选择设备
        this.selectedDeviceNumber = 0;
        var licenseId = this.activateRoute.snapshot.params['licenseId'];
        this.devices = devicesService.devices.slice(0);
        //查找对应的License并展示
        this.license = licenseService.licenses.find(function (license, index, arr) {
            return license._id === licenseId;
        });
        for (var _i = 0, _a = this.license.devices; _i < _a.length; _i++) {
            var device = _a[_i];
            for (var _b = 0, _c = this.devices; _b < _c.length; _b++) {
                var device_module = _c[_b];
                if (device.deviceName === device_module.deviceName) {
                    device_module.selected = false;
                    device_module.out_selected = true;
                }
            }
            this.selectedDevices.push(device);
        }
    }
    ModifyComponent.prototype.ngOnDestroy = function () {
        console.log('ngOnDestroy()');
        this.devicesService.revertDevice();
    };
    ModifyComponent.prototype.ngOnInit = function () {
        jQuery('.datapicker').pickadate({
            labelMonthNext: 'Go to the next month',
            labelMonthPrev: 'Go to the previous month',
            labelMonthSelect: 'Pick a month from the dropdown',
            labelYearSelect: 'Pick a year from the dropdown',
            selectMonths: true,
            selectYears: true,
            min: +1,
            max: [2018, 0, 1]
        });
    };
    //更新License
    ModifyComponent.prototype.updateLicense = function () {
        var _this = this;
        console.log('expired_ts = ' + this.license.expired_ts);
        var licenseInfo = {
            userId: this.userService.user._id,
            license: {
                licenseType: this.userService.user.licenseType,
                expired_ts: new Date(this.license.expired_ts).getTime(),
                devices: this.selectedDevices
            }
        };
        this.licenseService.updateLicense({
            licenseId: this.license._id,
            licenseInfo: licenseInfo
        })
            .then(function (res) {
            console.info('res = ' + JSON.stringify(res));
            //保存成功，跳转到管理界面
            _this.router.navigate(['/manager-license']);
        })
            .catch(function (error) {
            console.info('error = ' + JSON.stringify(error));
        });
    };
    ModifyComponent.prototype.selectDevice = function (index) {
        this.devices[index].selected = true;
        this.selectedDeviceNumber++;
    };
    ModifyComponent.prototype.cancelSelectDevice = function (index) {
        this.devices[index].selected = false;
        this.selectedDeviceNumber--;
    };
    //选择device界面的 确定 按钮事件
    ModifyComponent.prototype.confirmDevices = function (deviceNumber) {
        //点击确定后，已选择设备数量清空
        this.selectedDeviceNumber = 0;
        for (var _i = 0, _a = this.devices; _i < _a.length; _i++) {
            var device = _a[_i];
            if (device.selected) {
                //选择设备的状态（当选择完设备，点击确定，则内部的选择状态置为FALSE，外部的选择状态置为TRUE）
                device.out_selected = true;
                device.selected = false;
                var selectedDevice = {
                    deviceName: device.deviceName,
                    deviceNumber: deviceNumber
                };
                this.selectedDevices.push(selectedDevice);
            }
        }
        console.log('selectedDevice = ' + JSON.stringify(this.selectedDevices));
        //使modal隐藏
        jQuery('#modalQuickView').modal('hide');
    };
    //外部 删除某一device
    ModifyComponent.prototype.deleteDevice = function (index) {
        var deleteDevice = this.selectedDevices.splice(index, 1);
        console.log('deleteDevice = ' + JSON.stringify(deleteDevice));
        for (var _i = 0, _a = this.devices; _i < _a.length; _i++) {
            var device = _a[_i];
            if (device.deviceName === deleteDevice[0].deviceName) {
                console.log('delete success');
                //删除某一设备，将device的外部选择状态置为FALSE
                device.out_selected = false;
            }
        }
    };
    return ModifyComponent;
}());
ModifyComponent = __decorate([
    core_1.Component({
        selector: 'modify-license',
        templateUrl: './modify.component.html',
        styleUrls: ['modify.component.css']
    }),
    __metadata("design:paramtypes", [license_service_1.LicenseService, user_service_1.UserService,
        router_1.Router, router_1.ActivatedRoute, devices_service_1.DevicesService])
], ModifyComponent);
exports.ModifyComponent = ModifyComponent;
//# sourceMappingURL=modify.component.js.map