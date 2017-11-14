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
/**
 * 路由模块
 */


const routes : Routes = [
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
    }
];

@NgModule({
    imports : [RouterModule.forRoot(routes)],
    exports : [RouterModule]
})

export class AppRoutingModule {}