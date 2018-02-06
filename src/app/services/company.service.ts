/**
 * Created by zhangxu on 2018/1/24.
 */
import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class CompanyService {

  countryList: Array<any>;


  // url = "http://192.168.69.111:3001";
  url = "http://localhost:3001";

  constructor(private http: HttpClient) {}

  private static handleError(error: any): Promise<any> {
    console.log('An error occurred', JSON.stringify(error)); // for demo purposes only
    return Promise.reject(error.message || error);
  }


  /**
   * 获得国家列表
   */
  getCountryList(): Promise<any> {

    const url = this.url + "/api/company/getCountryList";

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
   * 审核/禁用公司
   */

  ReviewCompany(companyInfo: any):Promise<any> {

    console.log("companyInfo = " + JSON.stringify(companyInfo));

    const url = this.url + "/api/company/reviewCompany";

    return this.http.post(url, companyInfo, {
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


  /**
   * 查找公司信息
   * @param companyInfo
   * @returns {Promise<any>}
   */
  findCompany(companyInfo: any):Promise<any> {
    console.log("companyInfo = " + JSON.stringify(companyInfo));

    const url = this.url + "/api/company/findCompany";

    return this.http.get(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      params: {
        "cid": companyInfo.cid,
        "userId": companyInfo.userId,
        "token": companyInfo.token
      }
    }).toPromise()
      .then(res => {
        console.log(res);
        return res;
      })
      .catch(CompanyService.handleError);
  }

  /**
   * 删除公司信息
   */
  deleteCompany(companyInfo: any): Promise<any> {

    console.log("companyInfo = " + JSON.stringify(companyInfo));

    const url = this.url + "/api/company/deleteCompany";

    return this.http.get(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      params: {
        "cid": companyInfo.cid,
        "userId": companyInfo.userId,
        "token": companyInfo.token
      }
    }).toPromise()
      .then(res => {

      })
      .catch(CompanyService.handleError);
  }

  /**
   * 修改公司信息
   */

  updateCompany(companyInfo: any): Promise<any> {
    console.log("companyInfo = " + JSON.stringify(companyInfo));

    const url = this.url + "/api/company/updateCompany";
    return this.http.post(url, companyInfo, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    }).toPromise()
      .then(res => {

      })
      .catch(CompanyService.handleError);
  }


  /**
   * 添加开发者 到 企业开发组
   * @param invitedUser
   * @returns {Promise<any>}
   */
  inviteUserToGroup(invitedUser: any): Promise<any> {
    console.log("invitedUser = " + JSON.stringify(invitedUser));

    const url = this.url + "/api/company/invite";

    return this.http.get(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      params: invitedUser
    }).toPromise()
      .then(res => {
        console.log(res);
        return res;
      })
      .catch(CompanyService.handleError);
  }


  getCompanyList(userInfo: any): Promise<any> {

    console.log(userInfo);

    const url = this.url + "/api/company/getCompnayList";

    return this.http.get(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      params: {
        "userId": userInfo.userId,
        "token": userInfo.token
      }
    }).toPromise()
      .then(res => {
        console.log(res);
      })
      .catch(CompanyService.handleError);
  }



  removeCompanyId(userInfo: any): Promise<any> {

    console.log('userInfo = ', userInfo);

    const url = this.url + "/compnay/removeCompanyId";

    return this.http.get(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      params: userInfo
    }).toPromise()
      .then(res => {
        console.log(res);
        return res;
      })
      .catch(CompanyService.handleError);


  }










}
