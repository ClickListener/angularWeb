/**
 * Created by zhangxu on 2017/12/15.
 */
import {Component} from "@angular/core";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {Location} from "@angular/common";
import {SchemeService} from "../../../services/scheme.service";
import swal from "sweetalert2";



@Component({
  selector: 'scheme-main',
  templateUrl: './scheme-main.component.html',
  styleUrls: ['./scheme-main.component.css']
})

export class SchemeMainComponent {

  title: string;

  schemeID: any;

  param: string;


  constructor(private activatedRoute: ActivatedRoute, private router: Router,
              private _location: Location, private schemeService: SchemeService) {


    // 还没弄懂，https://segmentfault.com/a/1190000009971757
    router.events
      .filter(event => event instanceof NavigationEnd)
      .map(() => activatedRoute)
      .map(route => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        this.schemeID = route.snapshot.params.schemeID;
        return route;
      })
      .mergeMap(route => route.data)
      .subscribe(data => {
        this.title = data.title;
      });

  }


  // 导航返回
  private backClicked() {
    this._location.back();
  }


  // 当查看scheme详细时，编辑的点击事件
  private navigationTo():void {
    this.router.navigate(['/scheme-main/'+ this.title + '/scheme-modify', this.schemeService.schemeID]);
  }

  // 当查看scheme详细时，删除的点击事件
  private deleteScheme(): void {

    const scheme = this.schemeService.findSchemeById(this.schemeService.schemeID);

    const self = this;
    swal({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      type: 'warning',
      showCancelButton: true,
      animation: false,
      customClass: 'animated tada',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(function () {
      self.schemeService.deleteScheme(scheme.resourceName, scheme.version)
        .then(res => {
          if (res.success) {
            self.router.navigate(['/scheme-main/', scheme.resourceName]);
            swal(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            );
          } else {
            swal(
              'Fail!',
              'Something went wrong!',
              'error'
            );
          }
        })
        .catch(error => {
          console.log('ManagerComponent--error = ' + JSON.stringify(error));
        });
    });

  }

}
