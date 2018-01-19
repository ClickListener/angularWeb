/**
 * Created by zhangxu on 17/01/2018.
 */
import {Component} from "@angular/core";
import {Device} from "../../../model/Device";

declare const jQuery: any;

@Component({
  templateUrl: './development_app_reg.html',
  styleUrls: ['./development_app_reg.css']
})

export class DevelopmentAppRegComponent {

  deviceSelectList: Array<Device>;

  deviceList = [
    "BP5",
    "BP3L",
    "BP7",
    "BP3M",
    "Bp7S"
  ];

  deviceNumberList = [
    100,
    200,
    500,
    1000
  ];
  constructor() {
    this.deviceSelectList = new Array();
    const device = new Device();
    device.deviceName = "BP5";
    device.totalNumber = 100;

    this.deviceSelectList.push(device);

  }

  addDevice() {
    const device = new Device();
    device.deviceName = "BP5";
    device.totalNumber = 100;

    this.deviceSelectList.push(device);
  }

  deleteDevice(index: number) {
    this.deviceSelectList.splice(index, 1);
  }







}
