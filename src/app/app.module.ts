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
import {DatePipe} from '@angular/common';
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
import {UserHintComponent} from "./components/user/user_hint.component/user-hint.component";

@NgModule({

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,
    FormsModule,
    CookieModule.forRoot(),
    FileUploadModule
  ],
  declarations: [
    AppComponent,

    SignInComponent,
    SignUpComponent,
    UserHintComponent,

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

    ManagerMainComponent,
    AndroidComponent,
    IOSComponent,
    DetailComponent,

    DocumentMainComponent,
    DocumentAndroidComponent,
    DocumentIosComponent
  ],

  bootstrap: [AppComponent],

  providers: [UserService, LicenseService, DevicesService, DatePipe, SchemeService, Location, CompanyService, AppService]
})

export class AppModule {
}
