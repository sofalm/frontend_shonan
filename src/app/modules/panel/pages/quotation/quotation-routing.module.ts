import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';;
import {QuotationComponent} from "./quotation.component";
import {ViewCrudComponent} from "./components/view-crud/view-crud.component";
import {IndexComponent} from "./components/index/index.component";

const routes: Routes = [
    {
        path: '', component: QuotationComponent,
        children: [
            {path: '', component: IndexComponent},
            {path: 'crud/:quotation', component: ViewCrudComponent, children: []},
            {path: '**', redirectTo: ''},
        ]
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuotationRoutingModule { }
