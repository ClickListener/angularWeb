/**
 * Created by zhangxu on 2018/1/24.
 */
import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {promise} from "selenium-webdriver";

@Injectable()
export class AppService {


  url = "http://192.168.69.111:3001";
  // url = "http://localhost:3001";


  constructor(private http: HttpClient) {
  }

  private static handleError(error: any): Promise<any> {
    console.log('An error occurred', JSON.stringify(error)); // for demo purposes only
    return Promise.reject(error.message || error);
  }


  /**
   * 查找用户APP信息
   */

  findUerApp(appInfo: any): Promise<any> {

    console.log("appInfo: " + JSON.stringify(appInfo));

    const url = this.url + "/api/useApp/findUserApp";

    return this.http.get(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      params: appInfo
    }).toPromise()
      .then(res => {
        console.log(res);
        return res;
      })
      .catch(AppService.handleError);

  }

  /**
   * 删除APP信息
   */

  deleteUserApp(appInfo: any): Promise<any> {
    console.log("appInfo = " + JSON.stringify(appInfo));

    const url = this.url + "/api/useApp/deleteUserApp";

    return this.http.get(url, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      params: {
        'appId': appInfo.appId,
        'userId': appInfo.userId,
        'token': appInfo.token
      }
    }).toPromise()
      .then(res => {
        console.log(res);
        return res;
      })
      .catch(AppService.handleError);
  }


  findAllAppInfo(appInfo: any): Promise<any> {
    console.log('appInfo = ' + JSON.stringify(appInfo));

    const url = this.url + "/api/useApp/gatAllAppList";

    return this.http.get(url, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      params: {
        'companyId': appInfo.companyId,
        'userId': appInfo.userId,
        'token': appInfo.token
      }
    }).toPromise()
      .then(res => {
        console.log(res);
        return res;
      })
      .catch(AppService.handleError);
  }


  downloadLicense(appInfo: any): Promise<any> {

    console.log('appInfo = ', appInfo);


    const url = this.url + "/api/license/" + appInfo.appId;

    return this.http.get(url, {
      params: {
        "userId": appInfo.userId,
        "token": appInfo.token
      },

      observe: 'response', // 默认返回的是response的body，设置这个key,能获得全部的response，包括headers
      responseType: 'text', // HttpClient默认返回的是json,如果想接受其他类型，指定一下这个key就行了。

    }).toPromise()
      .then(res => {
        console.log('res = ' + res.headers.get('Date'));
        console.log('res = ' + JSON.stringify(res));

        if (res.headers.get('success') === '0') {
          return JSON.parse(res.body);
        } else {
          this.writeFile(JSON.stringify(res.body), 'text/latex', 'license.txt');
          return {success: true};
        }

      });
  }

  // 写文件
  private writeFile(value, type, name) {
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
}
