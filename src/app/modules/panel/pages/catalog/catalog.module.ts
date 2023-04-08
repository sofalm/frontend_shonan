import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogRoutingModule } from './catalog-routing.module';
import { CatalogComponent } from './catalog.component';
import { DesignTypesComponent } from './components/tabs/design-types/design-types.component';
import {PrimeNgModule} from "../../../../prime-ng/prime-ng.module";
import { ElectricTypesComponent } from './components/tabs/electric-types/electric-types.component';
import { EnergyTypesComponent } from './components/tabs/energy-types/energy-types.component';
import { HotWorkTypesComponent } from './components/tabs/hot-work-types/hot-work-types.component';
import { LoadingEquipmentTypesComponent } from './components/tabs/loading-equipment-types/loading-equipment-types.component';
import { ManufactureTypesComponent } from './components/tabs/manufacture-types/manufacture-types.component';
import { ProjectTypesComponent } from './components/tabs/project-types/project-types.component';
import { StandardTypesComponent } from './components/tabs/standard-types/standard-types.component';
import { WorkHeightTypesComponent } from './components/tabs/work-height-types/work-height-types.component';
import { CrudComponent } from './components/modals/crud/crud.component';
import {ReactiveFormsModule} from "@angular/forms";
import {NgxSpinnerModule} from "ngx-spinner";


@NgModule({
  declarations: [
    CatalogComponent,
    DesignTypesComponent,
    ElectricTypesComponent,
    EnergyTypesComponent,
    HotWorkTypesComponent,
    LoadingEquipmentTypesComponent,
    ManufactureTypesComponent,
    ProjectTypesComponent,
    StandardTypesComponent,
    WorkHeightTypesComponent,
    CrudComponent
  ],
  imports: [
      CommonModule,
      CatalogRoutingModule,
      PrimeNgModule,
      ReactiveFormsModule,
      NgxSpinnerModule,
  ]
})
export class CatalogModule { }
