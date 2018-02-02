/**
 * Created by zhangxu on 2018/1/24.
 */
import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {promise} from "selenium-webdriver";

@Injectable()
export class AppService {


  constructor(private http: HttpClient) {
  }

  private static handleError(error: any): Promise<any> {
    console.log('An error occurred', JSON.stringify(error)); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  /**
   * 上传用户APP信息
   * @param appInfo
   * @returns {Promise<any>}
   */
  uploadUserAppInfo(appInfo: any): Promise<any> {

    console.log("appInfo = " + JSON.stringify(appInfo));

    const url = "http://loaclhost:3001/api/company/addApp";
    return this.http.post(url, JSON.stringify(appInfo), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    }).toPromise()
      .then(res => {
        console.log(res);
      })
      .catch(AppService.handleError);
  }


  /**
   * 查找用户APP信息
   */

  findUerApp(appInfo: any): Promise<any> {

    console.log("appInfo: " + JSON.stringify(appInfo));

    const url = "http://loaclhost:3001/api/company/finduserApp";

    return this.http.get(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      params: {
        'appId': appInfo.appId,
        'userId': appInfo.userId,
        'token': appInfo.token
      }
    }).toPromise()
      .then(res => {
        console.log(res);
      })
      .catch(AppService.handleError);

  }

  /**
   * 删除APP信息
   */

  deleteUserApp(appInfo: any): Promise<any> {
    console.log("appInfo = " + JSON.stringify(appInfo));

    const url = "http://loaclhost:3001/api/company/deleteUserApp";

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
      })
      .catch(AppService.handleError);
  }

  updateUserApp(appInfo: any): Promise<any> {
    console.log('appInfo = ' + JSON.stringify(appInfo));

    const url = "http://loaclhost:3001/api/company/updateUserApp";

    return this.http.post(url, appInfo, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).toPromise()
      .then(res => {
        console.log(res);
      })
      .catch(AppService.handleError);
  }

  findAllAppInfo(appInfo: any): Promise<any> {
    console.log('appInfo = ' + JSON.stringify(appInfo));

    const url = "http://localhost:3001/api/useApp/gatAllAppList";

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
}
