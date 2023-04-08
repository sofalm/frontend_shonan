import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MenuItem, MessageService} from "primeng/api";
import {debounceTime, Subscription} from "rxjs";
import {DialogService} from "primeng/dynamicdialog";
import {SharedService} from "../../../../shared/services/shared.service";
import {CrudComponent} from "./components/modals/crud/crud.component";
import {QuotationService} from "./services/quotation.service";
import {AppBreadcrumbService} from "../../../../app.breadcrumb.service";
import {AppMainComponent} from "../../../../app.main.component";
import {NgxSpinnerService} from "ngx-spinner";
import {environment} from "../../../../../environments/environment";
import {SendComponent} from "./components/modals/send/send.component";

@Component({
  selector: 'app-quotation',
  templateUrl: './quotation.component.html',
  styleUrls: ['./quotation.component.scss'],
    providers: [DialogService]
})
export class QuotationComponent implements OnInit {

    ngOnInit(): void {
    }

}
