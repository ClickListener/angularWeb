/**
 * Created by zhangxu on 2017/9/19.
 */
import {Component, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {License} from "../../../model/License";
import {LicenseService} from "../../../services/license.service";
import {UserService} from "../../../services/user.service";
import {Device} from "../../../model/Device";
import {DevicesService} from "../../../services/devices.service";

declare let jQuery:any;

@Component({
    selector: 'modify-license',
    templateUrl: './modify.component.html',
    styleUrls: ['modify.component.css']
})

export class ModifyComponent implements OnInit, OnDestroy{
    ngOnDestroy(): void {
        console.log('ngOnDestroy()');
        this.devicesService.revertDevice();
    }


    license:License;

    devices:Array<any> = [];


    ngOnInit(): void {
        jQuery('.datapicker').pickadate({
            labelMonthNext: 'Go to the next month',
            labelMonthPrev: 'Go to the previous month',
            labelMonthSelect: 'Pick a month from the dropdown',
            labelYearSelect: 'Pick a year from the dropdown',
            selectMonths: true,
            selectYears: true,
            min: +1,
            max: [2018, 0, 1]
        })
    }

    constructor(private licenseService:LicenseService, private userService:UserService,
                private router:Router, private activateRoute: ActivatedRoute, private devicesService:DevicesService) {

        let licenseId = this.activateRoute.snapshot.params['licenseId'];

        this.devices = devicesService.devices.slice(0);


        //查找对应的License并展示
        this.license = licenseService.licenses.find(function (license, index, arr) {
            return license._id === licenseId;
        });

        for (let device of this.license.devices) {
            for (let device_module of this.devices) {
                if (device.deviceName === device_module.deviceName) {
                    device_module.selected = false;
                    device_module.out_selected = true;
                }
            }
            this.selectedDevices.push(device);
        }

    }


    //更新License
    updateLicense() {

        console.log('expired_ts = ' + this.license.expired_ts);

        let licenseInfo = {
            userId : this.userService.user._id,
            license : {
                licenseType: this.userService.user.licenseType,
                expired_ts: new Date(this.license.expired_ts).getTime(),
                devices: this.selectedDevices
            }
        };
        this.licenseService.updateLicense({
            licenseId:this.license._id,
            licenseInfo:licenseInfo
        })
            .then(res => {
            console.info('res = ' + JSON.stringify(res));
            //保存成功，跳转到管理界面
            this.router.navigate(['/manager-license']);
        })
            .catch(error => {
                console.info('error = ' + JSON.stringify(error));
            })
    }

    //主界面存放Devices的数组
    selectedDevices: Array<Device> = [];

    //次级界面已选择设备的个数，为了显示未选择设备
    selectedDeviceNumber: number = 0;

    selectDevice(index: number): void {

        this.devices[index].selected = true;

        this.selectedDeviceNumber++;

    }


    cancelSelectDevice(index: number): void {

        this.devices[index].selected = false;

        this.selectedDeviceNumber--;
    }


    //选择device界面的 确定 按钮事件
    confirmDevices(deviceNumber: number): void {

        //点击确定后，已选择设备数量清空
        this.selectedDeviceNumber = 0;
        for (let device of this.devices) {
            if (device.selected) {
                //选择设备的状态（当选择完设备，点击确定，则内部的选择状态置为FALSE，外部的选择状态置为TRUE）
                device.out_selected = true;
                device.selected = false;
                let selectedDevice = {
                    deviceName: device.deviceName,
                    deviceNumber: deviceNumber
                }
                this.selectedDevices.push(selectedDevice);
            }
        }

        console.log('selectedDevice = ' + JSON.stringify(this.selectedDevices));

        //使modal隐藏
        jQuery('#modalQuickView').modal('hide');
    }

    //外部 删除某一device
    deleteDevice(index: number) {
        let deleteDevice = this.selectedDevices.splice(index, 1);

        console.log('deleteDevice = ' + JSON.stringify(deleteDevice));

        for (let device of this.devices) {
            if (device.deviceName === deleteDevice[0].deviceName) {
                console.log('delete success');
                //删除某一设备，将device的外部选择状态置为FALSE
                device.out_selected = false;
            }
        }
    }
}