/**
 * Created by zhangxu on 2018/2/8.
 */
import {Component} from "@angular/core";
import {CompanyService} from "../../../../services/company.service";
import {UserService} from "../../../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import swal from "sweetalert2";
import {AppService} from "../../../../services/app.service";

import * as myGlobals from '../../../../../environments/config';

@Component({
  templateUrl: './mainAdmin_company_modify.html',
  styleUrls: ['./mainAdmin_company_modify.css']
})

export class MainAdminCompanyModifyComponent {


  cid: string;

  state: string;

  companyInfo: any;

  appList: Array<any>;

  url = myGlobals.url;

  countryList: Array<any>;

  constructor(private activatedRoute: ActivatedRoute, private companyService: CompanyService,
              private userService: UserService, private appService: AppService,
              private router: Router) {

    if (!userService.user) {
      this.router.navigate(['/sign-in']);
      return;
    }




  }

}
