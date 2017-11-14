/**
 * Created by zhangxu on 2017/6/30.
 */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {AppComponent} from "./components/app/app.component";
import {AppRoutingModule} from "./app-routing.module";
import {SignInComponent} from "./components/user/user_signIn/sign-in.component";
import {SignUpComponent} from "./components/user/user_signUp/sign-up.component";
import {HomeComponent} from "./components/home/home.component";
import {UserService} from "./services/user.service";
import {HttpModule, JsonpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";
import {CreateNewComponent} from "./components/license/license_createNew/createNew.component";
import {ManagerComponent} from "./components/license/license_manager/manager.component";
import {ModifyComponent} from "./components/license/license_modify/modify.component";
import {LicenseService} from "./services/license.service";
import {HashLocationStrategy, LocationStrategy} from "@angular/common";
import {DevicesService} from "./services/devices.service";

@NgModule({

    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpModule,
        JsonpModule,
        FormsModule,

    ],
    declarations:[
        AppComponent,
        SignInComponent,
        SignUpComponent,
        HomeComponent,
        CreateNewComponent,
        ManagerComponent,
        ModifyComponent
    ],

    bootstrap:[AppComponent],

    providers:[UserService, LicenseService, DevicesService]
})

export class AppModule {}