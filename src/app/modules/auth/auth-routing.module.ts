import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {AppErrorComponent} from "../../pages/app.error.component";

const routes: Routes = [
    {
        path:'login',
        component: LoginComponent,
        //loadChildren: () => import('../auth/pages/login/login.module').then(m => m.LoginModule),
    },
    {
        path:'error',
        component: AppErrorComponent,
        //loadChildren: () => import('../auth/pages/login/login.module').then(m => m.LoginModule),
    },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
