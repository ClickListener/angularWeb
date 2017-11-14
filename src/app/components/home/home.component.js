/**
 * Created by zhangxu on 2017/7/13.
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
var HomeComponent = (function () {
    function HomeComponent(userService, router) {
        this.userService = userService;
        this.router = router;
        this.licenses = [
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
        //总的Devices
        this.devices = [
            {
                deviceName: 'bp3m',
                selected: false,
                out_selected: false
            },
            {
                deviceName: 'bp3l',
                selected: false,
                out_selected: false
            },
            {
                deviceName: 'bp5',
                selected: false,
                out_selected: false
            },
            {
                deviceName: 'bp7',
                selected: false,
                out_selected: false
            }
        ];
        //主界面存放Devices的数组
        this.selectedDevices = [];
        //次级界面已选择设备的个数，为了显示未选择设备
        this.selectedDeviceNumber = 0;
    }
    HomeComponent.prototype.ngAfterViewInit = function () {
        $('.datepicker').pickadate({
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
    HomeComponent.prototype.test = function () {
    };
    HomeComponent.prototype.ngDoCheck = function () {
        this.user = this.userService.user;
        console.log(JSON.stringify(this.selectedDevices));
    };
    HomeComponent.prototype.ngOnInit = function () {
        this.user = this.userService.user;
    };
    HomeComponent.prototype.managerLicense = function () {
        this.router.navigate(['manager-license']);
    };
    HomeComponent.prototype.selectDevice = function (index) {
        console.log('selectDevice()');
        this.devices[index].selected = true;
        this.selectedDeviceNumber++;
    };
    HomeComponent.prototype.cancelSelectDevice = function (index) {
        console.log('cancelSelectDevice()');
        this.devices[index].selected = false;
        this.selectedDeviceNumber--;
    };
    //选择device界面的 确定 按钮事件
    HomeComponent.prototype.confirmDevices = function (deviceNumber) {
        console.log('deviceNumber = ' + deviceNumber);
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
        $('#modalQuickView').modal('hide');
    };
    //外部 删除某一device
    HomeComponent.prototype.deleteDevice = function (index) {
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
    return HomeComponent;
}());
HomeComponent = __decorate([
    core_1.Component({
        templateUrl: './home.component.html',
        styleUrls: ['./home.component.css']
    }),
    __metadata("design:paramtypes", [user_service_1.UserService, router_1.Router])
], HomeComponent);
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map