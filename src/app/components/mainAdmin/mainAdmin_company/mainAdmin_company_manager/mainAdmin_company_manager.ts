/**
 * Created by zhangxu on 2018/2/8.
 */
import {Component} from "@angular/core";
import {CompanyService} from "../../../../services/company.service";
import {UserService} from "../../../../services/user.service";
import swal from "sweetalert2";
import {Router} from "@angular/router";

@Component({
  templateUrl: './mainAdmin_company_manager.html',
  styleUrls: ['./mainAdmin_company_manager.css']
})

export class MainAdminCompanyManagerComponent {

  companyList: Array<any>;

  searchCompanyName: string;

  constructor(private companyService: CompanyService, private userService: UserService, private router: Router) {


    if (!userService.user) {
      this.router.navigate(['/sign-in']);
      return;
    }
    const userInfo = {
      "userId": userService.user._id,
      "token": userService.token.token
    };

    companyService.getCompanyList(userInfo)
      .then( res => {
        console.log(res);

        if (res.success) {
          this.companyList = res.data;

          this.companyList.forEach((company) => {
            const user_Info = {
              "userId": userService.user._id,
              "token": userService.token.token,
              "uid": company.mDeveloperId
            };

            userService.getUserInfo(user_Info)
              .then(response => {
                if (response.success) {
                  const mDeveloper = {
                    "email": response.user.email,
                    "username": response.user.username
                  };

                  company.mDeveloper = mDeveloper;
                  console.log( this.companyList);
                }

              })
              .catch(error => {
                console.log(error);
              });
          });
        }

      })
      .catch(error => {
        console.log(error);
      });
  }


  inputChange() {

    const companyInfo = {
      "userId": this.userService.user._id,
      "token": this.userService.token.token,
      "rule": {
        "companyName": this.searchCompanyName
      }

    };


    if (this.searchCompanyName === '') {
      companyInfo.rule = null;
    }



    this.companyService.searchCompany(companyInfo)
      .then(res => {
        console.log(res);
        if (res.success) {
          this.companyList = res.data;
          if (this.companyList.length !== 0) {
            this.companyList.forEach((company) => {
              const user_Info = {
                "userId": this.userService.user._id,
                "token": this.userService.token.token,
                "uid": company.mDeveloperId
              };

              this.userService.getUserInfo(user_Info)
                .then(response => {
                  if (response.success) {
                    const mDeveloper = {
                      "email": response.user.email,
                      "username": response.user.username
                    };

                    company.mDeveloper = mDeveloper;
                    console.log( this.companyList);
                  }

                })
                .catch(error => {
                  console.log(error);
                });
            });
          }
        }
      })
      .catch(error => {
        console.log('error = ', error);
      });


  }

  checkCompanyName(companyName) {
    const companyInfo = {
      "companyName": companyName
    }
    this.companyService.checkCompanyName(companyInfo)
      .then(res => {
        console.log(res);
        if (res.success) {
          swal({
            position: 'center',
            type: 'success',
            title: 'CompanyName is not repeated.',
            showConfirmButton: false,
            timer: 2000
          }).catch(swal.noop);
        }
      })
      .catch(error => {
        console.log('error', error);
      });
  }

}
