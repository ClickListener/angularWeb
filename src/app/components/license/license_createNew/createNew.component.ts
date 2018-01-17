/**
 * Created by zhangxu on 2017/9/19.
 */
import {Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {Router} from '@angular/router';
import {LicenseService} from '../../../services/license.service';



import swal from 'sweetalert2';
import {Device} from '../../../model/Device';
import {DevicesService} from '../../../services/devices.service';

declare let jQuery: any;


@Component({
    selector: 'create-newLicense',
    templateUrl: './createNew.component.html',
    styleUrls: ['createNew.component.css']
})

export class CreateNewComponent implements OnInit, OnDestroy {


    // 总的devices
    devices: Array<any> = [];

    // 主界面存放Devices的数组
    selectedDevices: Array<Device> = [];

    // 次级界面已选择设备的个数，为了显示未选择设备
    selectedDeviceNumber = 0;

    // 设备数量
    deviceNumber:number;


    ngOnDestroy(): void {
        this.devicesService.revertDevice();
    }


    ngOnInit(): void {
        jQuery('.datapicker').pickadate({
            labelMonthNext: 'Go to the next month',
            labelMonthPrev: 'Go to the previous month',
            labelMonthSelect: 'Pick a month from the dropdown',
            labelYearSelect: 'Pick a year from the dropdown',
            selectMonths: true,
            selectYears: true,
            min: +1,
            max: [2019, 0, 1],
            formatSubmit: 'yyyy/MM/dd'
        });
    }

    constructor(private userService: UserService, private router: Router,
                private licenseService: LicenseService, private devicesService: DevicesService) {
        console.log('createNew----------constructor()');

        this.devices = devicesService.devices.slice(0);

    }


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


    // 选择device界面的 确定 按钮事件
    confirmDevices(): void {
        console.log('deviceNumber = ' + this.deviceNumber);

        // 添加输入验证，如果未输入值，则提示错误
        if (this.deviceNumber === undefined || this.deviceNumber <= 0 ) {
          console.log('<=0');
          jQuery('#deviceNumberAlert').addClass('alert alert-danger').text('You must input valid number.');
          return;
        }

        if (this.selectedDeviceNumber === 0) {
          jQuery('#selectedDeviceAlert').addClass('alert alert-danger').text('You must select at least one device.');
          return;
        }
        // 点击确定后，已选择设备数量清空
        this.selectedDeviceNumber = 0;
        for (const device of this.devices) {
            if (device.selected) {
                // 选择设备的状态（当选择完设备，点击确定，则内部的选择状态置为FALSE，外部的选择状态置为TRUE）
                device.out_selected = true;
                device.selected = false;
                const selectedDevice = {
                    deviceName: device.deviceName,
                    totalNumber: this.deviceNumber,
                    deviceUsedNumber: 0
                };
                this.selectedDevices.push(selectedDevice);
            }
        }


        console.log('selectedDevice = ' + JSON.stringify(this.selectedDevices));

        // 使modal隐藏
        jQuery('#modalContactForm').modal('hide');
    }

    // 外部 删除某一device
    deleteDevice(index: number) {
        const deleteDevice = this.selectedDevices.splice(index, 1);

        console.log('deleteDevice = ' + JSON.stringify(deleteDevice));

        for (const device of this.devices) {
            if (device.deviceName === deleteDevice[0].deviceName) {
                console.log('delete success');
                // 删除某一设备，将device的外部选择状态置为FALSE
                device.out_selected = false;
            }
        }
    }


    createNewLicense(expiredDate: string, selectedDevices: Device[]): void {
        console.log('createNewLicense()');
        console.log('expiredDate = ' + new Date(expiredDate).getTime());
        console.log('selectedDevices = ' + JSON.stringify(selectedDevices));


        // 添加输入验证，如果未输入值，则提示错误
        if (expiredDate === '') {
          jQuery('#expiredDateAlert').addClass('alert alert-danger').text('You must set expired date!');
          return;
        }

        if (selectedDevices.length === 0) {
          jQuery('#selectedDevicesAlert').addClass('alert alert-danger').text('You must select device!');
          return;
        }

        const licenseInfo = {
            userId : '5a0269747ac9d897d0f57b60',
            token: this.userService.token,
            license : {
                licenseType: '3',
                expireTime: new Date(expiredDate).getTime(),
                devices: selectedDevices
            }
        };


        this.licenseService.createNewLicense(licenseInfo)
            .then(res => {
                console.log('res = ' + JSON.stringify(res));

                if (res.success) {
                  // 保存成功，跳转到管理界面
                  this.router.navigate(['/manager-license']);

                  swal({
                    position: 'bottom-right',
                    type: 'success',
                    title: 'Add new license successfully',
                    showConfirmButton: false,
                    timer: 2000
                  }).catch(swal.noop);
                } else {
                  console.log('error = ' + JSON.stringify(res));
                }
            })
            .catch(err => {
                console.log('error = ' + err);
                swal({
                  position: 'bottom-right',
                  type: 'error',
                  title: 'Add new license fail',
                  showConfirmButton: false,
                  timer: 2000
                }).catch(swal.noop);
            });


    }


}
