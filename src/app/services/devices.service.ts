/**
 * Created by zhangxu on 2017/11/14.
 */

export class DevicesService {
  // 总的Devices
  devices = [
    {
      deviceName: 'abi',
      selected: false,
      out_selected: false
    },
    {
      deviceName: 'abpm',
      selected: false,
      out_selected: false
    },
    {
      deviceName: 'am3',
      selected: false,
      out_selected: false
    },
    {
      deviceName: 'am3s',
      selected: false,
      out_selected: false
    },
    {
      deviceName: 'am4',
      selected: false,
      out_selected: false
    },
    {
      deviceName: 'bg1',
      selected: false,
      out_selected: false
    },
    {
      deviceName: 'bg5',
      selected: false,
      out_selected: false
    },
    {
      deviceName: 'bg5l',
      selected: false,
      out_selected: false
    },
    {
      deviceName: 'bp3',
      selected: false,
      out_selected: false
    },

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
      deviceName: 'bp5s',
      selected: false,
      out_selected: false
    },
    {
      deviceName: 'bp7',
      selected: false,
      out_selected: false
    },
    {
      deviceName: 'bp7s',
      selected: false,
      out_selected: false
    },
    {
      deviceName: 'bpm1',
      selected: false,
      out_selected: false
    },
    {
      deviceName: 'cbp',
      selected: false,
      out_selected: false
    },
    {
      deviceName: 'FDIR-v3',
      selected: false,
      out_selected: false
    },
    {
      deviceName: 'hs3',
      selected: false,
      out_selected: false
    },
    {
      deviceName: 'hs4',
      selected: false,
      out_selected: false
    },
    {
      deviceName: 'hs4s',
      selected: false,
      out_selected: false
    },
    {
      deviceName: 'hs5',
      selected: false,
      out_selected: false
    },
    {
      deviceName: 'hs6',
      selected: false,
      out_selected: false
    },
    {
      deviceName: 'kn-550bt',
      selected: false,
      out_selected: false
    },
    {
      deviceName: 'po3',
      selected: false,
      out_selected: false
    },
    {
      deviceName: 'TS28B',
      selected: false,
      out_selected: false
    }
  ];

  revertDevice(): void {
    for (const device of this.devices) {
      device.selected = false;
      device.out_selected = false;
    }
  }

}
