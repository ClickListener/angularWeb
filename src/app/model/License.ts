

import {Device} from './Device';

export class License {

    _id: string;
    userId: string;
    installedPhoneNumber: number;
    licenseType: string;
    expireTime: string;
    devices: Device[];
}
