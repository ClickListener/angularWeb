/**
 * Created by zhangxu on 2018/4/12.
 */
import {Component} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {CompanyService} from "../../../../services/company.service";
import {UserService} from "../../../../services/user.service";
import swal from "sweetalert2";

@Component({
  templateUrl: './mainAdmin_company_detail.html',
  styleUrls: ['./mainAdmin_company_detail.css']
})

export class MainAdminCompanyDetailComponent {


  cid: string;
  countryList: Array<any>;

  companyInfo: any;

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
              private companyService: CompanyService, private userService: UserService) {


    if (userService.user && userService.user.type > 2) {
      router.navigate(['/']);
      return;
    }

    if (!userService.user) {
      router.navigate(['/sign-in']);
      return;
    }


    activatedRoute.parent.paramMap.subscribe(paramMap => {
      this.cid = paramMap['params'].param;
      console.log('param = ', this.cid);

      this.countryList = companyService.countryList;

      const companyInfo = {
        "userId": userService.user._id,
        "token": userService.token.token,
        "cid": this.cid
      };

      companyService.findCompany(companyInfo)
        .then(res => {
          console.log(res);

          this.companyInfo = res.data;

          const countryFind = this.countryList.find((country, index, arr) => {
            return country.code === this.companyInfo.country;
          });

          this.companyInfo.country = countryFind.en;

          const user_Info = {
            "userId": userService.user._id,
            "token": userService.token.token,
            "uid": this.companyInfo.mDeveloperId
          };

          userService.getUserInfo(user_Info)
            .then(response => {
              const mDeveloper = {
                "email": response.user.email,
                "username": response.user.username
              };

              this.companyInfo.mDeveloper = mDeveloper;
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log('error = ', error);
        });
    });
  }

  // 更新公司状态
  updateCompanyInfo() {

    const companyInfo = {
      "userId": this.userService.user._id,
      "token": this.userService.token.token,
      "cid": this.cid,
      "state": this.companyInfo.state
    };
    this.companyService.reviewCompany(companyInfo)
      .then(res => {
        console.log(res);
        if (res.success) {
          swal({
            position: 'center',
            type: 'success',
            titleText: 'Update success',
            showConfirmButton: false,
            timer: 1500,
            padding: 0,
            width: 300
          }).catch(swal.noop);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
}
