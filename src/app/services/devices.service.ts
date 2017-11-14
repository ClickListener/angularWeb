/**
 * Created by zhangxu on 2017/11/14.
 */

export class DevicesService {
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

    revertDevice(): void {
        for (let device of this.devices) {
            device.selected = false;
            device.out_selected = false;
        }
    }

}