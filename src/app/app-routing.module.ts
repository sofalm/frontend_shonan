import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {DashboardDemoComponent} from './demo/view/dashboarddemo.component';
import {FormLayoutDemoComponent} from './demo/view/formlayoutdemo.component';
import {FloatLabelDemoComponent} from './demo/view/floatlabeldemo.component';
import {InvalidStateDemoComponent} from './demo/view/invalidstatedemo.component';
import {PanelsDemoComponent} from './demo/view/panelsdemo.component';
import {OverlaysDemoComponent} from './demo/view/overlaysdemo.component';
import {MediaDemoComponent} from './demo/view/mediademo.component';
import {MessagesDemoComponent} from './demo/view/messagesdemo.component';
import {MiscDemoComponent} from './demo/view/miscdemo.component';
import {EmptyDemoComponent} from './demo/view/emptydemo.component';
import {ChartsDemoComponent} from './demo/view/chartsdemo.component';
import {FileDemoComponent} from './demo/view/filedemo.component';
import {DocumentationComponent} from './demo/view/documentation.component';
import {AppMainComponent} from './app.main.component';
import {AppNotfoundComponent} from './pages/app.notfound.component';
import {AppErrorComponent} from './pages/app.error.component';
import {AppAccessdeniedComponent} from './pages/app.accessdenied.component';
import {AppLoginComponent} from './pages/app.login.component';
import {InputDemoComponent} from './demo/view/inputdemo.component';
import {ButtonDemoComponent} from './demo/view/buttondemo.component';
import {TableDemoComponent} from './demo/view/tabledemo.component';
import {ListDemoComponent} from './demo/view/listdemo.component';
import {TreeDemoComponent} from './demo/view/treedemo.component';
import {IconsComponent} from './utilities/icons.component';
import {AppCrudComponent} from './pages/app.crud.component';
import {AppCalendarComponent} from './pages/app.calendar.component';
import {AppTimelineDemoComponent} from './pages/app.timelinedemo.component';
import {AppInvoiceComponent} from './pages/app.invoice.component';
import {AppHelpComponent} from './pages/app.help.component';
import {BlocksComponent} from './blocks/blocks/blocks.component';
import {ValidateTokenGuard} from "./modules/auth/guards/validate-token.guard";

/*const routes : Routes = [
    {
        path: '', component: AppMainComponent,
        children: [
            {path: '', component: DashboardDemoComponent},
            {path: 'uikit/formlayout', component: FormLayoutDemoComponent},
            {path: 'uikit/floatlabel', component: FloatLabelDemoComponent},
            {path: 'uikit/invalidstate', component: InvalidStateDemoComponent},
            {path: 'uikit/input', component: InputDemoComponent},
            {path: 'uikit/button', component: ButtonDemoComponent},
            {path: 'uikit/table', component: TableDemoComponent},
            {path: 'uikit/list', component: ListDemoComponent},
            {path: 'uikit/tree', component: TreeDemoComponent},
            {path: 'uikit/panel', component: PanelsDemoComponent},
            {path: 'uikit/overlay', component: OverlaysDemoComponent},
            {path: 'uikit/menu', loadChildren: () => import('./demo/view/menus/menus.module').then(m => m.MenusModule)},
            {path: 'uikit/media', component: MediaDemoComponent},
            {path: 'uikit/message', component: MessagesDemoComponent},
            {path: 'uikit/misc', component: MiscDemoComponent},
            {path: 'uikit/charts', component: ChartsDemoComponent},
            {path: 'uikit/file', component: FileDemoComponent},
            {path: 'utilities/icons', component: IconsComponent},
            {path: 'pages/crud', component: AppCrudComponent},
            {path: 'pages/calendar', component: AppCalendarComponent},
            {path: 'pages/timeline', component: AppTimelineDemoComponent},
            {path: 'pages/invoice', component: AppInvoiceComponent},
            {path: 'pages/help', component: AppHelpComponent},
            {path: 'pages/empty', component: EmptyDemoComponent},
            {path: 'documentation', component: DocumentationComponent},
            {path: 'pages/catalog', loadChildren: () => import('./modules/panel/pages/catalog/catalog.module').then(m => m.CatalogModule)},
            {path: 'panel/quotation', loadChildren: () => import('./modules/panel/pages/quotation/quotation.module').then(m => m.QuotationModule)},
        ]
    },
    {path: 'error', component: AppErrorComponent},
    {path: 'access', component: AppAccessdeniedComponent},
    {path: 'notfound', component: AppNotfoundComponent},
    {path: 'login', component: AppLoginComponent},
    {path: '**', redirectTo: '/notfound'},
];*/

const routes: Routes = [
    {
        path: 'auth',
        //canActivate:[LoginGuard],
        //canLoad:[LoginGuard],
        loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
    },
    {
        path: 'panel',
        component: AppMainComponent,
        children: [
            {path: '', component: DashboardDemoComponent},
            {path: 'formlayout', component: FormLayoutDemoComponent},
            {path: 'floatlabel', component: FloatLabelDemoComponent},
            {path: 'invalidstate', component: InvalidStateDemoComponent},
            {path: 'input', component: InputDemoComponent},
            {path: 'button', component: ButtonDemoComponent},
            {path: 'table', component: TableDemoComponent},
            {path: 'list', component: ListDemoComponent},
            {path: 'tree', component: TreeDemoComponent},
            {path: 'panel', component: PanelsDemoComponent},
            {path: 'overlay', component: OverlaysDemoComponent},
            {path: 'menu', loadChildren: () => import('./demo/view/menus/menus.module').then(m => m.MenusModule)},
            {path: 'media', component: MediaDemoComponent},
            {path: 'message', component: MessagesDemoComponent},
            {path: 'misc', component: MiscDemoComponent},
            {path: 'charts', component: ChartsDemoComponent},
            {path: 'file', component: FileDemoComponent},
            {path: 'utilities/icons', component: IconsComponent},
            {path: 'pages/crud', component: AppCrudComponent},
            {path: 'pages/calendar', component: AppCalendarComponent},
            {path: 'pages/timeline', component: AppTimelineDemoComponent},
            {path: 'pages/invoice', component: AppInvoiceComponent},
            {path: 'pages/help', component: AppHelpComponent},
            {path: 'pages/empty', component: EmptyDemoComponent},
            {path: 'documentation', component: DocumentationComponent},
            {path: 'catalog', loadChildren: () => import('./modules/panel/pages/catalog/catalog.module').then(m => m.CatalogModule)},
            {path: 'quotation', loadChildren: () => import('./modules/panel/pages/quotation/quotation.module').then(m => m.QuotationModule)},
        ],
        //loadChildren: () => import('./modules/panel/panel.module').then(m => m.PanelModule),
        //canActivate: [ ValidateTokenGuard ],
        //canLoad: [ ValidateTokenGuard ]
    },
    {
        path: '**',
        redirectTo: 'auth/login'
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
