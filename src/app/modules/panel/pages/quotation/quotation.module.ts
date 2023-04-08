import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuotationRoutingModule } from './quotation-routing.module';
import { QuotationComponent } from './quotation.component';
import { CrudComponent } from './components/modals/crud/crud.component';
import {ReactiveFormsModule} from "@angular/forms";
import {PrimeNgModule} from "../../../../prime-ng/prime-ng.module";
import {NgxSpinnerModule} from "ngx-spinner";
import {PipesModule} from "../../../../shared/pipes/pipes.module";
import { SendComponent } from './components/modals/send/send.component';
import { ViewCrudComponent } from './components/view-crud/view-crud.component';
import { IndexComponent } from './components/index/index.component';

@NgModule({
  declarations: [
    QuotationComponent,
    CrudComponent,
    SendComponent,
    ViewCrudComponent,
    IndexComponent
  ],
    imports: [
        CommonModule,
        QuotationRoutingModule,
        ReactiveFormsModule,
        PrimeNgModule,
        NgxSpinnerModule,
        PipesModule
    ]
})
export class QuotationModule { }
