

import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptions} from "@angular/http";
import {License} from "../model/License";

import {Observable} from "rxjs";
import {UserService} from "./user.service";

@Injectable()
export class LicenseService {


    constructor(private http: Http) {
        console.log('LicenseService--------constructor');
        this.licenses = JSON.parse(sessionStorage.getItem('licenses'));
        console.log('LicenseService--------licenses = ' + this.licenses);
    }

    private header = {
        headers: new Headers({'Content-Type': 'application/json'})
    };

    licenses:License[];

    url = '/license';


    /**
     * 创建 新的 License
     * @param licenseInfo
     * @returns {Promise<License[]>}
     */
    createNewLicense(licenseInfo:any) : Promise<License[]> {

        console.info("licenseInfo = " + JSON.stringify(licenseInfo));


        // const url = '/api/auth/createNewLicense';
        return this.http.put(this.url, JSON.stringify(licenseInfo), this.header)
            .toPromise()
            .then( res => {
                this.licenses = res.json().licenses as License[];

                //将licenses存到本地
                sessionStorage.setItem('licenses' , JSON.stringify(this.licenses));
                console.info('res = ' + JSON.stringify(this.licenses));
                return res.json();
            })
            .catch(LicenseService.handleError)

    }

    /**
     * 更新 License
     * @param message
     * @returns {Promise<License[]>}
     */
    updateLicense(message:any) : Promise<License[]> {
        console.info("message = " + JSON.stringify(message));

        let url = this.url + '/' + message.licenseId;

        return this.http.post(url, JSON.stringify(message.licenseInfo), this.header)
            .toPromise()
            .then(res => {
                this.licenses = res.json().licenses as License[];

                //将licenses存到本地
                sessionStorage.setItem('licenses' , JSON.stringify(this.licenses));
                console.info('res = ' + JSON.stringify(this.licenses));
                return res.json();
            })
            .catch(LicenseService.handleError);
    }

    /**
     * 删除  License
     * @param {string} licenseID
     * @returns {Promise<License[]>}
     */
    deleteLicense(licenseID:string) : Promise<License[]> {
        console.info("licenseID = " + licenseID);

        return this.http.delete(this.url, new RequestOptions({
            headers: this.header.headers,
            body: {licenseId: licenseID}
        }))
            .toPromise()
            .then(res=> {
                this.licenses = res.json().licenses as License[];

                //将licenses存到本地
                sessionStorage.setItem('licenses' , JSON.stringify(this.licenses));
                console.info('res = ' + JSON.stringify(this.licenses));
                return res.json();
            })
            .catch(LicenseService.handleError)
    }


    private static handleError(error:any) : Promise<any> {
        console.log('An error occurred', JSON.stringify(error));//for demo purposes only
        return Promise.reject(error.message || error);
    }

}