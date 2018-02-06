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
}
