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
    if (this.deviceSelectList.length === 1) {

    } else {
      this.deviceSelectList.splice(index, 1);
    }

  }



  // 使用FileReader 将图片读取为base64字符串形式，实现图片预览
  private previewImg(event) {
    const file = event.target.files[0];

    const reader = new FileReader();

    reader.onloadstart = function (e) {
      console.log("开始读取....");
    };

    reader.onprogress = function (e) {
      console.log("正在读取中....");
    };

    reader.onabort = function (e) {
      console.log("中断读取....");
    };
    reader.onerror = function (e) {
      console.log("读取异常....");
    };
    reader.onload = function (e) {
      console.log("成功读取....");

      const img = document.getElementById("preview");
      img['src'] = e.target['result'];
    };

    reader.readAsDataURL(file);
  }







}
