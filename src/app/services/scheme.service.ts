/**
 * Created by zhangxu on 2017/12/19.
 */
import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";

import * as myGlobals from '../../environments/config';
import {ErrorService} from "./error.service";
import {UserService} from "./user.service";
import swal from "sweetalert2";
import {NGXLogger} from "ngx-logger";

@Injectable()
export class SchemeService {


  schemeAll: Array<any>;

  private _schemeID: string;

  url = myGlobals.url;

  constructor(private http: HttpClient, private errorService: ErrorService,
              private userService: UserService, private logger: NGXLogger) {
  }

  get schemeID(): string {
    return this._schemeID;
  }

  set schemeID(value: string) {
    this._schemeID = value;
  }

  private static handleError(error: any): Promise<any> {
    if (error.status === 0) {
      swal({
        position: 'center',
        type: 'error',
        titleText: "Connection Refused",
        showConfirmButton: true,
      }).catch(swal.noop);
    }
    return Promise.reject(error);
  }



  /**
   * 查询 scheme List
   * @param {string} appName
   * @param {string} userId
   * @returns {Promise<any>}
   */
  queryScheme(fileInfo: any): Promise<any> {

    this.logger.debug('fileInfo = ', fileInfo);

    const url = this.url + '/api/app/findFileList';

    return this.http.get(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      params: fileInfo
    })
      .toPromise()
      .then(async res => {
        this.logger.debug(res);
        if (res['success']) {

        } else {

          if (res['code'] === '1034') {
            const response = await this.userService.refreshToken();
            if (response['success']) {

              fileInfo.token = response.token;
              const appResponse = await this.queryScheme(fileInfo);

              if (appResponse['success']) {

              } else {
                if (appResponse['code'] !== '1062') {
                  this.errorService.hintError(appResponse);
                }

              }
              return appResponse;

            } else {
              this.errorService.hintError(response);
            }

          } else if (res['code'] === '1062') {

          } else {
            this.errorService.hintError(res);
          }
        }
        return res;
      })
      .catch(SchemeService.handleError);
  }


  /**
   * 查找单个Scheme的信息
   * @param fileInfo
   * @returns {Promise<any>}
   */
  findFileInfo(fileInfo: any): Promise<any> {

    this.logger.debug('fileInfo = ', fileInfo);

    const url = this.url + "/api/app/findFileInfo";

    return this.http.get(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      params: fileInfo
    }).toPromise()
      .then(async res => {
        this.logger.debug(res);
        if (res['success']) {

        } else {

          if (res['code'] === '1034') {
            const response = await this.userService.refreshToken();
            if (response['success']) {

              fileInfo.token = response.token;
              const appResponse = await this.findFileInfo(fileInfo);

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
      .catch(SchemeService.handleError);
  }


  /**
   * 删除 scheme
   * @param {string} appName
   * @param {string} version
   * @returns {Promise<any>}
   */
  deleteScheme(schemeInfo: any): Promise<any> {

    this.logger.debug('schemeInfo', schemeInfo);

    const url = this.url + '/api/app/delete';

    return this.http.get(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      params: schemeInfo
    }).toPromise()
      .then(async res => {
        this.logger.debug(res);
        if (res['success']) {

        } else {

          if (res['code'] === '1034') {
            const response = await this.userService.refreshToken();
            if (response['success']) {

              schemeInfo.token = response.token;
              const appResponse = await this.deleteScheme(schemeInfo);

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
      .catch(SchemeService.handleError);
  }


  deleteFile(body: any): Promise<any> {

    this.logger.debug('body = ', body);

    const url = this.url + '/api/app/deleteFile';

    return this.http.post(url, body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    }).toPromise()
      .then(async res => {
        this.logger.debug(res);
        if (res['success']) {

        } else {

          if (res['code'] === '1034') {
            const response = await this.userService.refreshToken();
            if (response['success']) {

              body.token = response.token;
              const appResponse = await this.deleteFile(body);

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
      .catch(SchemeService.handleError);
  }

  uploadPublicFile(formData: FormData): Promise<any> {

    this.logger.debug('formData = ', formData);

    const url = this.url + '/api/app/uploadPublicFiles';

    return this.http.post(url, formData, {
      headers: new HttpHeaders({
        'Accept': 'application/json',
      }),
      observe: 'response'
    }).toPromise()
      .then(res => {
        console.log(res);
        if (res['status'] === 201) {
          return res;
        }
      })
      .catch(SchemeService.handleError);
  }
}
