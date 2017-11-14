/**
 * Created by zhangxu on 2017/11/14.
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DevicesService = (function () {
    function DevicesService() {
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
    }
    DevicesService.prototype.revertDevice = function () {
        for (var _i = 0, _a = this.devices; _i < _a.length; _i++) {
            var device = _a[_i];
            device.selected = false;
            device.out_selected = false;
        }
    };
    return DevicesService;
}());
exports.DevicesService = DevicesService;
//# sourceMappingURL=devices.service.js.map