

import {Device} from "./Device";

export class License {

    _id:string;
    installedPhoneNumber:number;
    expired_ts:number;
    devices: Device[];
}