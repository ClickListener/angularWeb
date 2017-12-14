/**
 * Created by zhangxu on 2017/12/14.
 */


import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";

declare const jQuery: any;

@Component({
  selector: 'tools-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})

export class PaginationComponent {


  @Output()
  licenseChange:EventEmitter<any> = new EventEmitter<any>();

  singlePage: Array<any>;
  paginationNum = 0; // 分页数
  curPage = 1; // 当前页数
  paginationArr:Array<any>;
  pageSize = 5;// 每页数据条数

  dataAll: Array<any>;


  /**
   *  初始化方法
   * @param {number} pageSize 每页显示的Item条数
   * @param {Array<any>} data 数据源
   */

  init(pageSize:number, data: Array<any>) {

    this.dataAll = data;

    if (pageSize !== null || pageSize > 0) {
      this.pageSize = pageSize;
    }

    // 计算总页面数，新建一个Array,以便使用ngFor, 因为这玩意不支持类似于for(i; i<10; i++)
    this.paginationNum = Math.ceil(data.length / this.pageSize); // 向上取整
    this.paginationArr = Array(this.paginationNum).fill(0);

    this.singlePage = this.paginationChange(1, data);

    // 向父组件发送当页要显示的数据
    this.licenseChange.emit(this.singlePage);

    this.judgeIsDisabled();


    // 当页面加载完毕时， 将第一个pagination置为active
    jQuery('document').ready(function () {
      jQuery('#li0').addClass('active');
    });
  }


  /**
   * 删除item
   * @param {Array<any>} data
   */
  deleteItem(data: Array<any>) {
    // 处理如果删除License导致减少页数
    this.paginationNum = Math.ceil(data.length/this.pageSize); // 向上取整

    this.paginationArr = Array(this.paginationNum).fill(0);

    this.singlePage = this.paginationChange(0, data);

    // 向父组件发送当页要显示的数据
    this.licenseChange.emit(this.singlePage);

    this.judgeIsDisabled();
  }


  // 根据点击显示数据
   private changePagination(page:number) {


    if (this.curPage !== page) {

      if (page === -3 && this.curPage !== 1) {
        this.curPage--;
      } else if ( page === -4) {
        this.curPage = 1;
      } else if (page === -2 && this.curPage !== this.paginationNum) {
        this.curPage++;
      } else if (page === -1) {
        this.curPage = this.paginationNum;
      } else {
        this.curPage = page;
      }

      this.singlePage = this.paginationChange(this.curPage, null);

      this.licenseChange.emit(this.singlePage);

    }

    this.judgeIsDisabled();

  }

  // 根据curPage 和paginationNum判断分页上的属性disabled
  private judgeIsDisabled() {


    const id = this.curPage -1;

    // 分页当前页激活，移除其他激活项
    for (let i = 0; i < this.paginationNum; i++) {
      if (i === id) {
        jQuery('#li' + i).addClass('active');
      } else {
        jQuery('#li' + i).removeClass('active');
      }
    }

    if (this.curPage === 1 ) {
      jQuery('#first').addClass('disabled');
      jQuery('#previous').addClass('disabled');
    } else {
      jQuery('#first').removeClass('disabled');
      jQuery('#previous').removeClass('disabled');
    }

    if (this.curPage === this.paginationNum) {
      jQuery('#last').addClass('disabled');
      jQuery('#next').addClass('disabled');
    } else {
      jQuery('#last').removeClass('disabled');
      jQuery('#next').removeClass('disabled');
    }
  }


  private paginationChange(page: number, data: Array<any>): any {

    let licensesAll;
    if (data === null) {
      licensesAll = this.dataAll;
    } else {
      licensesAll = data;
    }

    if (page === 0) {

      // 当删除License时，如果页数减少的时候
      this.paginationNum = Math.ceil(licensesAll.length/this.pageSize);

      if (this.curPage > this.paginationNum) {
        this.curPage--;
      }

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
