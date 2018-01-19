/**
 * Created by zhangxu on 2017/7/13.
 */
import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {SignInComponent} from "./components/user/user_signIn/sign-in.component";
import {SignUpComponent} from "./components/user/user_signUp/sign-up.component";
import {HomeComponent} from "./components/home/home.component";
import {ManagerComponent} from "./components/license/license_manager/manager.component";
import {CreateNewComponent} from "./components/license/license_createNew/createNew.component";
import {ModifyComponent} from "./components/license/license_modify/modify.component";
import {SchemeCreateComponent} from "./components/scheme/scheme_create/scheme-create.component";
import {SchemeManagerComponent} from "./components/scheme/scheme_manager/scheme-manager.component";
import {SchemeModifyComponent} from "./components/scheme/scheme_modify/scheme-modify.component";
import {SchemeDetailsComponent} from "./components/scheme/scheme_details/scheme-details-component";
import {SchemeMainComponent} from "./components/scheme/scheme_main/scheme-main.component";
import {DevelopmentPrimaryComponent} from "./components/development/development_primary/development_primary";
import {DevelopmentApplyMasterComponent} from "./components/development/development_apply_master/development_apply_master";
import {DevelopmentMainComponent} from "./components/development/development_main/development_main";
import {DevelopmentAppManagerComponent} from "./components/development/development_app_manager/development_app_manager";
import {DevelopmentGroupComponent} from "./components/development/development_group/development_group";
import {DevelopmentAddMemberComponent} from "./components/development/development_add_member/development_add_member";
import {DevelopmentAppRegComponent} from "./components/development/development_app_reg/development_app_reg";

/**
 * 路由模块
 */


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },

  {
    path: 'sign-in',
    component: SignInComponent
  },
  {
    path: 'sign-up',
    component: SignUpComponent
  },
  {
    path: 'manager-license',
    component: ManagerComponent
  },
  {
    path: 'create-newLicense',
    component: CreateNewComponent
  },
  {
    path: 'modify-license/:licenseId',
    component: ModifyComponent
  },
  {
    path: 'scheme-main/:param',
    component: SchemeMainComponent,
    children: [
      {
        path: '',
        component: SchemeManagerComponent,
        data: { title: 'manager' }
      },
      {
        path: 'scheme-create',
        component: SchemeCreateComponent,
        data: { title: 'create' }
      },

      {
        path: 'scheme-modify/:schemeID',
        component: SchemeModifyComponent,
        data: { title: 'modify' }
      },
      {
        path: 'scheme-details/:schemeID',
        component: SchemeDetailsComponent,
        data: { title: 'detail' }
      }
    ]
  },
  {
    path: 'development-primary',
    component: DevelopmentPrimaryComponent
  },
  {
    path: 'development-apply-master',
    component: DevelopmentApplyMasterComponent
  },
  {
    path: 'development-main',
    component: DevelopmentMainComponent,

    children: [
      {
        path: '',
        redirectTo: 'development-app-manager',
        pathMatch: 'full'
      },

      {
        path: 'development-app-manager',
        component: DevelopmentAppManagerComponent,
      },
      {
        path: 'development-group',
        component: DevelopmentGroupComponent
      }
    ]
  },
  {
    path: 'development-add-member',
    component: DevelopmentAddMemberComponent
  },
  {
    path: 'development-app-reg',
    component: DevelopmentAppRegComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
