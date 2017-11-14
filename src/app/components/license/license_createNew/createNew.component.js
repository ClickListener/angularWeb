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
var devices_service_1 = require("../../../services/devices.service");
var CreateNewComponent = (function () {
    function CreateNewComponent(userService, router, licenseService, devicesService) {
        this.userService = userService;
        this.router = router;
        this.licenseService = licenseService;
        this.devicesService = devicesService;
        //总的devices
        this.devices = [];
        //主界面存放Devices的数组
        this.selectedDevices = [];
        //次级界面已选择设备的个数，为了显示未选择设备
        this.selectedDeviceNumber = 0;
        console.log('createNew----------constructor()');
        this.devices = devicesService.devices.slice(0);
    }
    CreateNewComponent.prototype.ngOnDestroy = function () {
        this.devicesService.revertDevice();
    };
    CreateNewComponent.prototype.ngOnInit = function () {
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
    CreateNewComponent.prototype.selectDevice = function (index) {
        console.log('selectDevice()');
        this.devices[index].selected = true;
        this.selectedDeviceNumber++;
    };
    CreateNewComponent.prototype.cancelSelectDevice = function (index) {
        console.log('cancelSelectDevice()');
        this.devices[index].selected = false;
        this.selectedDeviceNumber--;
    };
    //选择device界面的 确定 按钮事件
    CreateNewComponent.prototype.confirmDevices = function (deviceNumber) {
        console.log('deviceNumber = ' + deviceNumber);
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
    CreateNewComponent.prototype.deleteDevice = function (index) {
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
    CreateNewComponent.prototype.createNewLicense = function (expiredDate, selectedDevices) {
        var _this = this;
        console.info('createNewLicense()');
        // console.info('userId = ' + this.userService.user._id);
        console.info('totalUserNumber = ' + new Date(expiredDate).getTime());
        console.info('BundleIdOrPackageName = ' + JSON.stringify(selectedDevices));
        // let licenseInfo = {
        //     userId : this.userService.user._id,
        //     license : {
        //         licenseType: this.userService.user.licenseType,
        //         expired_ts: new Date(expiredDate).getTime(),
        //         devices: selectedDevices
        //     }
        // };
        var licenseInfo = {
            userId: this.userService.user._id,
            license: {
                licenseType: this.userService.user.licenseType,
                expired_ts: new Date(expiredDate).getTime(),
                devices: selectedDevices
            }
        };
        this.licenseService.createNewLicense(licenseInfo)
            .then(function (res) {
            console.info('res = ' + JSON.stringify(res));
            //保存成功，跳转到管理界面
            _this.router.navigate(['/manager-license']);
            sweetalert2_1.default({
                position: 'bottom-right',
                type: 'success',
                title: 'Add new license successfully',
                showConfirmButton: false,
                timer: 2000
            }).catch(sweetalert2_1.default.noop);
        })
            .catch(function (err) {
            console.info('error = ' + err);
        });
    };
    return CreateNewComponent;
}());
CreateNewComponent = __decorate([
    core_1.Component({
        selector: 'create-newLicense',
        templateUrl: './createNew.component.html',
        styleUrls: ['createNew.component.css']
    }),
    __metadata("design:paramtypes", [user_service_1.UserService, router_1.Router,
        license_service_1.LicenseService, devices_service_1.DevicesService])
], CreateNewComponent);
exports.CreateNewComponent = CreateNewComponent;
//# sourceMappingURL=createNew.component.js.map