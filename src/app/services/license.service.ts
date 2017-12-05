import {Injectable} from '@angular/core';
import {License} from '../model/License';
import {HttpClient, HttpHeaders} from "@angular/common/http";


@Injectable()
export class LicenseService {


  constructor(private http: HttpClient) {
    console.log('LicenseService--------constructor');
    this.licenses = JSON.parse(sessionStorage.getItem('licenses'));
    console.log('LicenseService--------licenses = ' + this.licenses);
  }

  private header = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  };

  licenses: License[];

  // url = '/api/license'; // 本地的url

  url = 'http://192.168.69.111:3001/api/license'; // 跨域访问的url(服务器)
  // url = 'http://localhost:3001/api/license'; // 跨域访问的url(本地)

  getAllLicense(userId: string): Promise<License[]> {

    const url = this.url + '/all/' + userId;

    return this.http.get(url, this.header)
      .toPromise()
      .then((res) => {
        if (res['success']) {

          this.licenses = this.sortLicenses(res['data'] as License[]);

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
      .then(res => {
        return res;
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

    return this.http.put(url, JSON.stringify(message.licenseInfo), this.header)
      .toPromise()
      .then(res => {
        return res;
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
        return res;
      })
      .catch(LicenseService.handleError);
  }

  downloadLicense(licenseId: string): Promise<any> {


    const url = this.url + '/' + licenseId;
    return this.http.get(url, {
      observe: 'response', // 默认返回的是response的body，设置这个key,能获得全部的response，包括headers
      responseType: 'text', // HttpClient默认返回的是json,如果想接受其他类型，指定一下这个key就行了。
    })

      .toPromise()
      .then(res => {
        console.log('res = ' + res.headers.get('success'));
        console.log('res = ' + JSON.stringify(res));

        if (res.headers.get('success') === '0') {
          return JSON.parse(res.body);
        } else {
          this.writeFile(JSON.stringify(res.body), 'text/latex', 'license.txt');
          return {success: true};
        }

      })
      .catch(LicenseService.handleError);
  }


  private static handleError(error: any): Promise<any> {
    console.log('An error occurred', JSON.stringify(error)); // for demo purposes only
    return Promise.reject(error.message || error);
  }


  // 写文件
  writeFile(value, type, name) {
    let blob;
    if (typeof window.Blob === 'function') {
      blob = new Blob([value], {type: type});
    }

    const URL = window.URL;
    const bloburl = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    if ('download' in anchor) {
      anchor.style.visibility = 'hidden';
      anchor.href = bloburl;
      anchor.download = name;
      document.body.appendChild(anchor);
      const evt = document.createEvent('MouseEvents');
      evt.initEvent('click', true, true);
      anchor.dispatchEvent(evt);
      document.body.removeChild(anchor);
    }
  }


  private sortLicenses(licenses): License[] {

    return licenses.reverse();
  }

}
