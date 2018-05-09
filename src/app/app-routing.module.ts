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
import {ForgotPasswordComponent} from "./components/user/user_forgot/forgot-password.component";
import {ManagerMainComponent} from "./components/version/version_manager_main/manager-main.component";
import {AndroidComponent} from "./components/version/version_android/android.component";
import {IOSComponent} from "./components/version/version_ios/ios.component";
import {DetailComponent} from "./components/version/version_detail/detail.component";
import {DocumentMainComponent} from "./components/document/document_main/document_main.component";
import {DocumentAndroidComponent} from "./components/document/document_android/document-android.component";
import {DocumentIosComponent} from "./components/document/document_ios/document-ios.component";
import {DevelopmentAppModifyComponent} from "./components/development/development_app_modify/development_app_modify";
import {DevelopmentPermissionModifyComponent} from "./components/development/development_permission_modify/development_permission_modify";
import {MainAdminDeveloperManagerComponent} from "./components/mainAdmin/mainAdmin_developer/mainAdmin_developer_manager/mainAdmin_developer_manager";
import {MainAdminCompanyManagerComponent} from "./components/mainAdmin/mainAdmin_company/mainAdmin_company_manager/mainAdmin_company_manager";
import {MainAdminCompanyModifyComponent} from "./components/mainAdmin/mainAdmin_company/mainAdmin_company_modify/mainAdmin_company_modify";
import {MainAdminDeveloperModifyComponent} from "./components/mainAdmin/mainAdmin_developer/mainAdmin_developer_modify/mainAdmin_developer_modify";
import {UserHintComponent} from "./components/user/user_hint/user-hint.component";
import {UserResetPasswordComponent} from "./components/user/user_reset_password/user_reset_password.component";
import {DevelopmentCompanyModifyComponent} from "./components/development/development_company_modify/development_company_modify";
import {LastListComponent} from "./components/version/version_lastList/lastList.component";
import {AuthGuard} from "./services/auth-guard.service";
import {SignConfirmComponent} from "./components/user/user_signConfirm/sign_confirm.component";
import {MainAdminCompanyAppComponent} from "./components/mainAdmin/mainAdmin_company/mainAdmin_company_app/mainAdmin_company_app";
import {MainAdminCompanyMainComponent} from "./components/mainAdmin/mainAdmin_company/mainAdmin_company_main/mainAdmin_company_main";
import {MainAdminSecondMasterManagerComponent} from "./components/mainAdmin/mainAdmin_developer/mainAdmin_secondMaster_manager/mainAdmin_secondMaster_manager";
import {MainAdminSecondMasterMainComponent} from "./components/mainAdmin/mainAdmin_developer/mainAdmin_secondMaster_main/mainAdmin_secondMaster_main";
import {MainAdminSecondMasterCreateComponent} from "./components/mainAdmin/mainAdmin_developer/mainAdmin_secondMaster_create/mainAdmin_secondMaster_create";
import {MainAdminSecondMasterModifyComponent} from "./components/mainAdmin/mainAdmin_developer/mainAdmin_secondMaster_modify/mainAdmin_secondMaster_modify";
import {MainAdminCompanyDeveloperComponent} from "./components/mainAdmin/mainAdmin_company/mainAdmin_company_developer/mainAdmin_company_developer";
import {MainAdminCompanyApplistComponent} from "./components/mainAdmin/mainAdmin_company/mainAdmin_company_appList/mainAdmin_company_applist";
import {MainAdminCompanyDetailComponent} from "./components/mainAdmin/mainAdmin_company/mainAdmin_company_detail/mainAdmin_company_detail";
import {TermEuComponent} from "./components/terms/term-eu/term-eu.component";
import {PoliciesEuComponent} from "./components/policies/policies-eu/policies-eu.component";
import {StartNativeSdkComponent} from "./components/start/start-native-sdk/start-native-sdk.component";
import {StartLayeredAppComponent} from "./components/start/start-layered-app/start-layered-app.component";
import {GettingStartComponent} from "./components/start/getting-start/getting-start.component";
import {TermUsComponent} from "./components/terms/term-us/term-us.component";
import {PoliciesUsComponent} from "./components/policies/policies-us/policies-us.component";
import {ContactComponent} from "./components/contact/contact.component";

/**
 * 路由模块
 */


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'start-nativeSDK',
    component: StartNativeSdkComponent
  },
  {
    path: 'start-layeredApp',
    component: StartLayeredAppComponent
  },
  {
    path: 'getting-start',
    component: GettingStartComponent
  },
  {
    path: 'contact-us',
    component: ContactComponent
  },
  {
    path: 'sign-in',
    component: SignInComponent
  },
  {
    path: 'sign-up-confirm',
    component: SignConfirmComponent
  },
  {
    path: 'sign-up',
    component: SignUpComponent
  },
  {
    path: 'confirm-hint',
    component: UserHintComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'reset-password/:userId/:random',
    component: UserResetPasswordComponent
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
        path: 'development-group/:userId',
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
  },

  {
    path: 'development-app-modify/:param',
    component: DevelopmentAppModifyComponent
  },

  {
    path: 'development-permission-modify/:param',
    component: DevelopmentPermissionModifyComponent
  },
  {
    path: 'development-company-modify/:param',
    component: DevelopmentCompanyModifyComponent
  },

  {
    path: 'manager-main/:param',
    component: ManagerMainComponent,
    children: [
      {
        path: '',
        redirectTo: 'android-version',
        pathMatch: 'full'
      },
      {
        path: 'android-version',
        component: AndroidComponent
      },
      {
        path: 'ios-version',
        component: IOSComponent
      },
      {
        path: 'detail/:param',
        component: DetailComponent
      }
    ]
  },


  {
    path: 'document-main/:param',
    component: DocumentMainComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'android-document',
        pathMatch: 'full'
      },
      {
        path: 'android-document',
        component: DocumentAndroidComponent
      },
      {
        path: 'ios-document',
        component: DocumentIosComponent
      }
    ]
  },
  {
    path: 'last-version',
    component: LastListComponent,
    children: [
      {
        path: 'detail/:param',
        component: DetailComponent
      }
    ]
  },

  {
    path: 'developer-manager',
    component: MainAdminDeveloperManagerComponent
  },
  {
    path: 'developer-modify/:id/:companyId',
    component: MainAdminDeveloperModifyComponent

  },

  {
    path: 'secondMaster',
    component: MainAdminSecondMasterMainComponent,
    children: [
      {
        path: '',
        redirectTo: 'secondMaster-manager',
        pathMatch: 'full'
      },
      {
        path: 'secondMaster-manager',
        component: MainAdminSecondMasterManagerComponent
      },
      {
        path: 'secondMaster-create',
        component: MainAdminSecondMasterCreateComponent
      },
      {
        path: 'secondMaster-modify/:param',
        component: MainAdminSecondMasterModifyComponent
      }
    ]
  },

  {
    path: 'company',
    component: MainAdminCompanyMainComponent,

    children: [
      {
        path: '',
        redirectTo: 'company-manager',
        pathMatch: 'full'
      },
      {
        path: 'company-manager',
        component: MainAdminCompanyManagerComponent
      },
      {
        path: 'company-modify/:param',
        component: MainAdminCompanyModifyComponent,
        children: [
          {
            path: '',
            component: MainAdminCompanyDetailComponent
          },
          {
            path: 'developers',
            component: MainAdminCompanyDeveloperComponent
          },
          {
            path: 'apps',
            component: MainAdminCompanyApplistComponent
          }
        ]
      },
      {
        path: 'company-app-modify/:param',
        component: MainAdminCompanyAppComponent
      }
    ]
  },

  {
    path: 'term_eu',
    component: TermEuComponent
  },
  {
    path: 'policies_eu',
    component: PoliciesEuComponent
  },
  {
    path: 'term_us',
    component: TermUsComponent
  },
  {
    path: 'policies_us',
    component: PoliciesUsComponent
  }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
