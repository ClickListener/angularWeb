/**
 * Created by zhangxu on 2017/12/19.
 */
import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class SchemeService {

  schemeAll: Array<any>;

  constructor(private http: HttpClient) {
  }


  /**
   * 查询 scheme
   * @param {string} appName
   * @param {string} userId
   * @returns {Promise<any>}
   */
  queryScheme(appName: string, userId: string): Promise<any> {

    const url = 'http://localhost:3001/api/app/findAppInfo';

    return this.http.get(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      params: {
        'appName': appName,
        'userId': userId
      }
    })
      .toPromise()
      .then(res => {
        console.log(res);
        this.schemeAll = res['data'];
        return res;
      })
      .catch(error => {
        console.log(error);
        return error;
      });
  }


  /**
   * 删除 scheme
   * @param {string} appName
   * @param {string} version
   * @returns {Promise<any>}
   */
  deleteScheme(appName: string, version: string): Promise<any> {

    const url = 'http://localhost:3001/api/app/delete';

    return this.http.get(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      params: {
        'appName': appName,
        'version': version
      }
    }).toPromise()
      .then(res => {
        console.log(res);
        return res;
      })
      .catch(error => {
        console.log("error = " + error.toString());
      });
  }

}
