/**
 * Created by zhangxu on 2017/12/19.
 */
import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class SchemeService {


  schemeAll: Array<any>;

  private _schemeID: string;

  url = "http://192.168.69.111:3001";
  // url = "http://localhost:3001";

  constructor(private http: HttpClient) {
  }

  get schemeID(): string {
    return this._schemeID;
  }

  set schemeID(value: string) {
    this._schemeID = value;
  }



  /**
   * 查询 scheme List
   * @param {string} appName
   * @param {string} userId
   * @returns {Promise<any>}
   */
  queryScheme(fileInfo: any): Promise<any> {

    console.log('fileInfo = ', fileInfo);

    const url = this.url + '/api/app/findFileList';

    return this.http.get(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      params: fileInfo
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
   * 查找单个Scheme的信息
   * @param fileInfo
   * @returns {Promise<any>}
   */
  findFileInfo(fileInfo: any): Promise<any> {

    console.log('fileInfo = ', fileInfo);

    const url = this.url + "/api/app/findFileInfo";

    return this.http.get(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      params: fileInfo
    }).toPromise()
      .then(res => {
        console.log(res);

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
  deleteScheme(schemeInfo: any): Promise<any> {

    const url = this.url + '/api/app/delete';

    return this.http.get(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      params: schemeInfo
    }).toPromise()
      .then(res => {
        console.log(res);
        return res;
      })
      .catch(error => {
        console.log("error = " + error.toString());
      });
  }


  deleteFile(body: any): Promise<any> {

    console.log('body = ', body);

    const url = this.url + '/api/app/deleteFile';

    return this.http.post(url, body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    }).toPromise()
      .then(res => {
        console.log(res);
        return res;
      })
      .catch(error => {
        console.log(error);
        return error;
      });
  }
}
