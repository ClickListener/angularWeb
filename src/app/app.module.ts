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
    HomeComponent,
    CreateNewComponent,
    ManagerComponent,
    ModifyComponent,

    SchemeMainComponent,

    SchemeCreateComponent,
    SchemeManagerComponent,
    SchemeModifyComponent,
    SchemeDetailsComponent,

    PaginationComponent
  ],

  bootstrap: [AppComponent],

  providers: [UserService, LicenseService, DevicesService, DatePipe]
})

export class AppModule {
}
