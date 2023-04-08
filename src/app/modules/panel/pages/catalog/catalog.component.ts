import { Component } from '@angular/core';
import {AppBreadcrumbService} from "../../../../app.breadcrumb.service";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent {
    constructor(private breadcrumbService: AppBreadcrumbService) {
        this.breadcrumbService.setItems([
            {label: 'General'},
            {label: 'Configuración'},
            {label: 'Catalogos del Sistema'}
        ]);
    }

}
