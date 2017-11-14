/**
 * Created by zhangxu on 2017/7/13.
 */

import {AfterViewInit, Component, DoCheck, OnInit} from '@angular/core';
import {User} from '../../model/User';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {Device} from '../../model/Device';

declare let $: any;

@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit, DoCheck, AfterViewInit {
    ngAfterViewInit(): void {
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
    }

    test(): void {

    }


    user: User;


    ngDoCheck(): void {
        this.user = this.userService.user;
        console.log(JSON.stringify(this.selectedDevices));
    }

    constructor(private userService: UserService, private router: Router) {

    }


    ngOnInit(): void {
        this.user = this.userService.user;

    }


    managerLicense(): void {
        this.router.navigate(['manager-license']);
    }


    licenses = [
        {
            'ExpiredDate': '2017-10-10',
            'DeviceInfo': [
                {
                    'DeviceModel': 'BP5',
                    'DeviceTotalNumber': 100,
                    'DeviceUsedNumber': 1,
                },
                {
                    'DeviceModel': 'AM4',
                    'DeviceTotalNumber': 200,
                    'DeviceUsedNumber': 1,
                }
            ],
            'InstalledPhoneNumber': 1000
        },
        {
            'ExpiredDate': '2017-10-10',
            'DeviceInfo': [
                {
                    'DeviceModel': 'BP5',
                    'DeviceTotalNumber': 100,
                    'DeviceUsedNumber': 1,
                },
                {
                    'DeviceModel': 'AM4',
                    'DeviceTotalNumber': 200,
                    'DeviceUsedNumber': 1,
                }
            ],
            'InstalledPhoneNumber': 200
        },
        {
            'ExpiredDate': '2017-10-10',
            'DeviceInfo': [
                {
                    'DeviceModel': 'BP5',
                    'DeviceTotalNumber': 100,
                    'DeviceUsedNumber': 1,
                },
                {
                    'DeviceModel': 'AM4',
                    'DeviceTotalNumber': 200,
                    'DeviceUsedNumber': 1,
                }
            ],
            'InstalledPhoneNumber': 300
        }
    ];


    //总的Devices
    devices = [
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
    selectedDevices: Array<Device> = [];

    //次级界面已选择设备的个数，为了显示未选择设备
    selectedDeviceNumber = 0;

    selectDevice(index: number): void {

        console.log('selectDevice()');

        this.devices[index].selected = true;

        this.selectedDeviceNumber++;

    }


    cancelSelectDevice(index: number): void {
        console.log('cancelSelectDevice()');

        this.devices[index].selected = false;

        this.selectedDeviceNumber--;
    }


    //选择device界面的 确定 按钮事件
    confirmDevices(deviceNumber: number): void {
        console.log('deviceNumber = ' + deviceNumber);
        for (const device of this.devices) {
            if (device.selected) {
                //选择设备的状态（当选择完设备，点击确定，则内部的选择状态置为FALSE，外部的选择状态置为TRUE）
                device.out_selected = true;
                device.selected = false;
                const selectedDevice = {
                    deviceName: device.deviceName,
                    deviceNumber: deviceNumber
                };
                this.selectedDevices.push(selectedDevice);
            }
        }

        console.log('selectedDevice = ' + JSON.stringify(this.selectedDevices));

        //使modal隐藏
        $('#modalQuickView').modal('hide');
    }

    //外部 删除某一device
    deleteDevice(index: number) {
        const deleteDevice = this.selectedDevices.splice(index, 1);

        console.log('deleteDevice = ' + JSON.stringify(deleteDevice));

        for (const device of this.devices) {
            if (device.deviceName === deleteDevice[0].deviceName) {
                console.log('delete success');
                //删除某一设备，将device的外部选择状态置为FALSE
                device.out_selected = false;
            }
        }
    }

}
