

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

    licenses: License[];

    url = '/api/license';

  getAllLicense(userId: string): Promise<License[]> {

      const url = this.url + '/all/' + userId;

      return this.http.get(url, this.header)
        .toPromise()
        .then(res => {
          if (res.json().success) {

            this.licenses = res.json().data as License[];

            return this.licenses;

          }
        })
        .catch(LicenseService.handleError);
    }

    /**
     * 创建 新的 License
     * @param licenseInfo
     * @returns {Promise<License[]>}
     */
    createNewLicense(licenseInfo: any): Promise<any> {

        return this.http.post(this.url, JSON.stringify(licenseInfo), this.header)
            .toPromise()
            .then( res => {
                // 将licenses存到本地
                // sessionStorage.setItem('licenses' , JSON.stringify(this.licenses));
                return res.json();
            })
            .catch(LicenseService.handleError);

    }

    /**
     * 更新 License
     * @param message
     * @returns {Promise<License[]>}
     */
    updateLicense(message: any): Promise<any> {
        console.log('message = ' + JSON.stringify(message));

        const url = this.url + '/' + message.licenseId;

        return this.http.post(url, JSON.stringify(message.licenseInfo), this.header)
            .toPromise()
            .then(res => {
                this.licenses = res.json().licenses as License[];

                console.log('res = ' + JSON.stringify(this.licenses));
                return res.json();
            })
            .catch(LicenseService.handleError);
    }

    /**
     * 删除  License
     * @param {string} licenseID
     * @returns {Promise<License[]>}
     */
    deleteLicense(licenseID: string): Promise<any> {
        console.log('licenseID = ' + licenseID);

        const url = this.url + '/' + licenseID;
        return this.http.delete(url, this.header)
            .toPromise()
            .then(res => {
              console.log('res = ' + JSON.stringify(res));
              return res.json();
            })
            .catch(LicenseService.handleError);
    }

  downloadLicense(licenseId: string): void {
      console.log('licenseId = ' + licenseId);
      const url = this.url + '/' + licenseId;
      this.http.get(url)
        .toPromise()
        .then(res => {
          console.log('res = ' + JSON.stringify(res));
        })
        .catch(LicenseService.handleError);
  }


    private static handleError(error: any): Promise<any> {
        console.log('An error occurred', JSON.stringify(error)); // for demo purposes only
        return Promise.reject(error.message || error);
    }

}
