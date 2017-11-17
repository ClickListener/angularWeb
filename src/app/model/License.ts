

import {Device} from "./Device";

export class License {

    _id: string;
    userId: string;
    installedPhoneNumber: number;
    licenseType: string;
    expired_ts: number;
    devices: Device[];
}
