/**
 * Created by zhangxu on 2017/11/23.
 */
import {Injectable} from '@angular/core';
import {LicenseService} from './license.service';
import {License} from '../model/License';

@Injectable()
export class PaginationService {


  pageSize = 5;// 每页数据条数
  curPage = 1;// 当前页码
  constructor(private licenseService: LicenseService) {}

  paginationChange(page: number, licenses: License[]): any {

    let licensesAll;
    if (licenses === null) {
      licensesAll = this.licenseService.licenses;
    } else {
      licensesAll = licenses;
    }

    if (page === 0) {

      const start = this.pageSize * (this.curPage - 1);
      const end = this.pageSize * this.curPage;
      return licensesAll.slice(start, end);
    } else {

      this.curPage = page;
      const start = this.pageSize * (page - 1);
      const end = this.pageSize * page;
      return licensesAll.slice(start, end);
    }

  }
}
