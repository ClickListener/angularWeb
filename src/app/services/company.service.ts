/**
 * Created by zhangxu on 2018/1/24.
 */
import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";

import * as myGlobals from '../../environments/config';
import {ErrorService} from "./error.service";
import {toPromise} from "rxjs/operator/toPromise";
import {UserService} from "./user.service";
import swal from "sweetalert2";

@Injectable()
export class CompanyService {

  countryList: Array<any>;

  url = myGlobals.url;

  constructor(private http: HttpClient, private errorService: ErrorService, private userService: UserService) {}

  private static handleError(error: any): Promise<any> {
    console.log(error); // for demo purposes only
    if (error.status === 0) {
      swal({
        position: 'center',
        type: 'error',
        titleText: "Connection Refused",
        showConfirmButton: false,
        timer: 2000
      }).catch(swal.noop);
    }
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

  reviewCompany(companyInfo: any):Promise<any> {

    console.log("companyInfo = " + JSON.stringify(companyInfo));

    const url = this.url + "/api/company/reviewCompany";

    return this.http.post(url, companyInfo, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    }).toPromise()
      .then(async res => {
        console.log(res);
        if (res['success']) {

        } else {

          if (res['code'] === '1034') {
            const response = await this.userService.refreshToken();
            if (response['success']) {

              companyInfo.token = response.token;
              const appResponse = await this.reviewCompany(companyInfo);

              if (appResponse['success']) {

              } else {
                this.errorService.hintError(appResponse);
              }
              return appResponse;

            } else {
              this.errorService.hintError(response);
            }

          } else {
            this.errorService.hintError(res);
          }
        }
        return res;
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
      .then(async res => {
        console.log(res);
        if (res['success']) {

        } else {

          if (res['code'] === '1034') {
            const response = await this.userService.refreshToken();
            if (response['success']) {

              companyInfo.token = response.token;
              const appResponse = await this.findCompany(companyInfo);

              if (appResponse['success']) {

              } else {
                this.errorService.hintError(appResponse);
              }
              return appResponse;

            } else {
              this.errorService.hintError(response);
            }

          } else {
            this.errorService.hintError(res);
          }
        }
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
      .then(async res => {
        console.log(res);
        if (res['success']) {

        } else {

          if (res['code'] === '1034') {
            const response = await this.userService.refreshToken();
            if (response['success']) {

              invitedUser.token = response.token;
              const appResponse = await this.inviteUserToGroup(invitedUser);

              if (appResponse['success']) {

              } else {
                this.errorService.hintError(appResponse);
              }
              return appResponse;

            } else {
              this.errorService.hintError(response);
            }

          } else {
            this.errorService.hintError(res);
          }
        }
        return res;
      })
      .catch(CompanyService.handleError);
  }


  getCompanyList(userInfo: any): Promise<any> {

    console.log(userInfo);

    const url = this.url + "/api/company/getCompanyList";

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
      .then(async res => {
        console.log(res);
        if (res['success']) {

        } else {

          if (res['code'] === '1034') {
            const response = await this.userService.refreshToken();
            if (response['success']) {

              userInfo.token = response.token;
              const appResponse = await this.getCompanyList(userInfo);

              if (appResponse['success']) {

              } else {
                this.errorService.hintError(appResponse);
              }
              return appResponse;

            } else {
              this.errorService.hintError(response);
            }

          } else {
            this.errorService.hintError(res);
          }
        }
        return res;
      })
      .catch(CompanyService.handleError);
  }



  removeCompanyId(userInfo: any): Promise<any> {

    console.log('userInfo = ', userInfo);

    const url = this.url + "/api/compnay/removeCompanyId";

    return this.http.get(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      params: userInfo
    }).toPromise()
      .then(async res => {
        console.log(res);
        if (res['success']) {

        } else {

          if (res['code'] === '1034') {
            const response = await this.userService.refreshToken();
            if (response['success']) {

              userInfo.token = response.token;
              const appResponse = await this.removeCompanyId(userInfo);

              if (appResponse['success']) {

              } else {
                this.errorService.hintError(appResponse);
              }
              return appResponse;

            } else {
              this.errorService.hintError(response);
            }

          } else {
            this.errorService.hintError(res);
          }
        }
        return res;
      })
      .catch(CompanyService.handleError);


  }


  checkCompanyName(companyInfo: any): Promise<any> {

    console.log('companyInfo = ', companyInfo);

    const url = this.url + "/api/company/compareCompany";

    return this.http.get(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      params: companyInfo
    }).toPromise()
      .then(async res => {
        console.log(res);
        if (res['success']) {

        } else {

          if (res['code'] === '1034') {
            const response = await this.userService.refreshToken();
            if (response['success']) {

              const appResponse = await this.checkCompanyName(companyInfo);

              if (appResponse['success']) {

              } else {
                this.errorService.hintError(appResponse);
              }
              return appResponse;

            } else {
              this.errorService.hintError(response);
            }

          } else {
            this.errorService.hintError(res);
          }
        }
        return res;
      })
      .catch(CompanyService.handleError);
  }


  searchCompany(companyInfo: any): Promise<any> {


    console.log('companyInfo = ', companyInfo);

    const url = this.url + "/api/company/find";

    return this.http.post(url, companyInfo, {
      headers: {
        "Content-Type": 'application/json',
        'Accept': 'application/json'
      }
    }).toPromise()
      .then(async res => {
        console.log(res);

        if (res['success']) {

        } else {

          if (res['code'] === '1034') {
            const response = await this.userService.refreshToken();
            if (response['success']) {

              companyInfo.token = response.token;
              const appResponse = await this.searchCompany(companyInfo);

              if (appResponse['success']) {

              } else {
                this.errorService.hintError(appResponse);
              }
              return appResponse;

            } else {
              this.errorService.hintError(response);
            }

          } else {
            this.errorService.hintError(res);
          }
        }

        return res;
      })
      .catch(CompanyService.handleError);
  }







}
