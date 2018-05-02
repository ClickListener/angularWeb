/**
 * Created by zhangxu on 2017/6/30.
 */
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './components/app/app.component';
import {AppRoutingModule} from './app-routing.module';
import {SignInComponent} from './components/user/user_signIn/sign-in.component';
import {SignUpComponent} from './components/user/user_signUp/sign-up.component';
import {HomeComponent} from './components/home/home.component';
import {UserService} from './services/user.service';
import {FormsModule} from '@angular/forms';
import {CreateNewComponent} from './components/license/license_createNew/createNew.component';
import {ManagerComponent} from './components/license/license_manager/manager.component';
import {ModifyComponent} from './components/license/license_modify/modify.component';
import {LicenseService} from './services/license.service';
import {DatePipe, LowerCasePipe} from '@angular/common';
import {DevicesService} from './services/devices.service';
import {CookieModule} from 'ngx-cookie';
import {HttpClientJsonpModule, HttpClientModule} from "@angular/common/http";
import {SchemeCreateComponent} from "./components/scheme/scheme_create/scheme-create.component";
import {SchemeManagerComponent} from "./components/scheme/scheme_manager/scheme-manager.component";
import {SchemeModifyComponent} from "./components/scheme/scheme_modify/scheme-modify.component";
import {SchemeDetailsComponent} from "./components/scheme/scheme_details/scheme-details-component";
import {PaginationComponent} from "./components/tools/pagination/pagination.component";
import {SchemeMainComponent} from "./components/scheme/scheme_main/scheme-main.component";
import {FileUploadModule} from "ng2-file-upload";
import {SchemeService} from "./services/scheme.service";
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
import {CompanyService} from "./services/company.service";
import {AppService} from "./services/app.service";
import {DocumentMainComponent} from "./components/document/document_main/document_main.component";
import {DocumentAndroidComponent} from "./components/document/document_android/document-android.component";
import {DocumentIosComponent} from "./components/document/document_ios/document-ios.component";
import {DevelopmentAppModifyComponent} from "./components/development/development_app_modify/development_app_modify";
import {DevelopmentPermissionModifyComponent} from "./components/development/development_permission_modify/development_permission_modify";
import {MainAdminDeveloperManagerComponent} from "./components/mainAdmin/mainAdmin_developer/mainAdmin_developer_manager/mainAdmin_developer_manager";
import {MainAdminCompanyModifyComponent} from "./components/mainAdmin/mainAdmin_company/mainAdmin_company_modify/mainAdmin_company_modify";
import {MainAdminDeveloperModifyComponent} from "./components/mainAdmin/mainAdmin_developer/mainAdmin_developer_modify/mainAdmin_developer_modify";
import {MainAdminCompanyManagerComponent} from "./components/mainAdmin/mainAdmin_company/mainAdmin_company_manager/mainAdmin_company_manager";
import {UserHintComponent} from "./components/user/user_hint/user-hint.component";
import {UserResetPasswordComponent} from "./components/user/user_reset_password/user_reset_password.component";
import {DevelopmentCompanyModifyComponent} from "./components/development/development_company_modify/development_company_modify";
import {CustomFormsModule} from "ng2-validation";
import {ErrorService} from "./services/error.service";
import {MarkdownModule} from "ngx-markdown";
import {LastListComponent} from "./components/version/version_lastList/lastList.component";
import {AuthGuard} from "./services/auth-guard.service";
import {SignConfirmComponent} from "./components/user/user_signConfirm/sign_confirm.component";
import {MainAdminCompanyAppComponent} from "./components/mainAdmin/mainAdmin_company/mainAdmin_company_app/mainAdmin_company_app";
import {MainAdminCompanyMainComponent} from "./components/mainAdmin/mainAdmin_company/mainAdmin_company_main/mainAdmin_company_main";
import {RegexNameDirective} from "./directive/regex-name.directive";
import {MainAdminSecondMasterManagerComponent} from "./components/mainAdmin/mainAdmin_developer/mainAdmin_secondMaster_manager/mainAdmin_secondMaster_manager";
import {MainAdminSecondMasterMainComponent} from "./components/mainAdmin/mainAdmin_developer/mainAdmin_secondMaster_main/mainAdmin_secondMaster_main";
import {MainAdminSecondMasterCreateComponent} from "./components/mainAdmin/mainAdmin_developer/mainAdmin_secondMaster_create/mainAdmin_secondMaster_create";
import {MainAdminSecondMasterModifyComponent} from "./components/mainAdmin/mainAdmin_developer/mainAdmin_secondMaster_modify/mainAdmin_secondMaster_modify";
import {MainAdminCompanyDeveloperComponent} from "./components/mainAdmin/mainAdmin_company/mainAdmin_company_developer/mainAdmin_company_developer";
import {MainAdminCompanyApplistComponent} from "./components/mainAdmin/mainAdmin_company/mainAdmin_company_appList/mainAdmin_company_applist";
import {MainAdminCompanyDetailComponent} from "./components/mainAdmin/mainAdmin_company/mainAdmin_company_detail/mainAdmin_company_detail";
import { TermEuComponent } from './components/terms/term-eu/term-eu.component';
import { PoliciesEuComponent } from './components/policies/policies-eu/policies-eu.component';
import { StartNativeSdkComponent } from './components/start/start-native-sdk/start-native-sdk.component';
import { StartLayeredAppComponent } from './components/start/start-layered-app/start-layered-app.component';
import {LoggerModule, NGXLogger, NgxLoggerLevel} from "ngx-logger";
import {RegexUpperLetterDirective} from "./directive/regex-UpperLetter.directive";
import {RegexLowerLetterDirective} from "./directive/regex-lowerLetter.directive";
import {RegexNumberDirective} from "./directive/regex-number.directive";
import {RegexChineseDirective} from "./directive/regex-chinese.directive";
import {RegexBeginDirective} from "./directive/regex-begin.directive";
import {RegexSpaceDirective} from "./directive/regex-space.directive";
import { GettingStartComponent } from './components/start/getting-start/getting-start.component';
import {RouteReuseStrategy} from "@angular/router";
import {SimpleReuseStrategy} from "./components/tools/simple-reuse-strategy";

@NgModule({

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,
    FormsModule,
    CustomFormsModule,
    CookieModule.forRoot(),
    FileUploadModule,
    MarkdownModule.forRoot(),
    LoggerModule.forRoot({level: NgxLoggerLevel.OFF})
  ],
  declarations: [
    AppComponent,

    SignInComponent,
    SignUpComponent,
    SignConfirmComponent,
    UserHintComponent,
    UserResetPasswordComponent,

    HomeComponent,
    CreateNewComponent,
    ManagerComponent,
    ModifyComponent,

    ForgotPasswordComponent,

    SchemeMainComponent,

    SchemeCreateComponent,
    SchemeManagerComponent,
    SchemeModifyComponent,
    SchemeDetailsComponent,

    PaginationComponent,

    DevelopmentPrimaryComponent,
    DevelopmentApplyMasterComponent,
    DevelopmentMainComponent,
    DevelopmentAppManagerComponent,
    DevelopmentGroupComponent,
    DevelopmentAddMemberComponent,
    DevelopmentAppRegComponent,
    DevelopmentAppModifyComponent,
    DevelopmentPermissionModifyComponent,
    DevelopmentCompanyModifyComponent,

    ManagerMainComponent,
    AndroidComponent,
    IOSComponent,
    DetailComponent,
    LastListComponent,

    DocumentMainComponent,
    DocumentAndroidComponent,
    DocumentIosComponent,

    MainAdminDeveloperManagerComponent,
    MainAdminDeveloperModifyComponent,
    MainAdminCompanyModifyComponent,
    MainAdminCompanyManagerComponent,
    MainAdminCompanyAppComponent,
    MainAdminCompanyMainComponent,
    MainAdminCompanyDeveloperComponent,
    MainAdminCompanyApplistComponent,
    MainAdminCompanyDetailComponent,

    MainAdminSecondMasterMainComponent,
    MainAdminSecondMasterManagerComponent,
    MainAdminSecondMasterCreateComponent,
    MainAdminSecondMasterModifyComponent,

    RegexNameDirective,
    RegexUpperLetterDirective,
    RegexLowerLetterDirective,
    RegexNumberDirective,
    RegexChineseDirective,
    RegexBeginDirective,
    RegexSpaceDirective,

    TermEuComponent,


    PoliciesEuComponent,


    StartNativeSdkComponent,


    StartLayeredAppComponent,


    GettingStartComponent
  ],

  bootstrap: [AppComponent],

  providers: [
    UserService,
    LicenseService,
    DevicesService,
    DatePipe,
    SchemeService,
    Location,
    CompanyService,
    AppService,
    LowerCasePipe,
    ErrorService,
    AuthGuard,
    NGXLogger,
    { provide: RouteReuseStrategy, useClass: SimpleReuseStrategy}
  ]
})

export class AppModule {
}
