/**
 * Created by zhangxu on 2018/1/24.
 */
import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class CompanyService {

  countryList: Array<any>;

  constructor(private http: HttpClient) {}

  private static handleError(error: any): Promise<any> {
    console.log('An error occurred', JSON.stringify(error)); // for demo purposes only
    return Promise.reject(error.message || error);
  }


  /**
   * 获得国家列表
   */
  getCountryList(): Promise<any> {

    const url = "http://localhost:3001/api/company/getCountryList";

    return this.http.get(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    })
      .toPromise()
      .then(res => {
        this.countryList = res as any[];

        return this.countryList;
      })
      .catch(CompanyService.handleError);
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
      .catch(CompanyService.handleError);
  }








}
