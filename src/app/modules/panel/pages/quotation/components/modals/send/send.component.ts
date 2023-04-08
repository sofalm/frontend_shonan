import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {ValidatorService} from "../../../../../../../shared/services/validator.service";
import {SharedService} from "../../../../../../../shared/services/shared.service";
import {QuotationService} from "../../../services/quotation.service";
import {LocalStorageService} from "../../../../../../../shared/services/local-storage-service";
import {NgxSpinnerService} from "ngx-spinner";
import {AppMainComponent} from "../../../../../../../app.main.component";

@Component({
  selector: 'app-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.scss']
})
export class SendComponent implements OnInit {

    dataForm!: FormGroup;
    name: string = '';
    object: any;
    arrayEmails : string[] = [];

    constructor(private formBuilder: FormBuilder,
                public ref: DynamicDialogRef,
                public config: DynamicDialogConfig,
                private validatorService: ValidatorService,
                public sharedService: SharedService,
                private quotationService: QuotationService,
                private localStorageService: LocalStorageService,
                public AppMainComponent: AppMainComponent,
                private spinner: NgxSpinnerService) {
    }

    ngOnInit(): void {
        //console.log(this.config.data.item)
        this.loadDataForm();
        if (this.config.data.type === 'edit' || this.config.data.type === 'delete') this.loadDataItemById();
    }

    loadDataForm(): void {
        this.dataForm = this.formBuilder.group(
            {
                email: [{value: '', disabled: this.config.data.info}, [Validators.required, Validators.email],],
                emailTwo: [{value: '', disabled: this.config.data.info}, [Validators.email],],
                emails: [{value: '', disabled: this.config.data.info}, [],],
            },
            {
                validators: [
                    // this.validatorService.isObject('event_type'),
                ],
            }
        );
    }

    loadDataItemById(): void {
        this.spinner.show();
        this.quotationService.getItemById(this.config.data.item).subscribe(
            (response) => {
                console.log(response)
                delete response.folio;
                delete response.updated_at;
                delete response.created_at;
                delete response.is_active;
                delete response.deleted_at;
                delete response.is_deleted;
                this.name = response.customer;

                this.dataForm.setValue(response);
                this.spinner.hide();
            },
            (error) => {
                this.spinner.hide();
                this.AppMainComponent.errorDialog(error);
            }
        );
    }

    save(): void {
        this.validateObject();
        this.spinner.show();
        if (this.dataForm.invalid) return;

        this.quotationService.sendEmail(this.config.data.item.id,this.object).subscribe(
            (response) => {
                console.log(response)
                this.AppMainComponent.messageServiceCustom(
                    'success',
                    'Envío Cotización',
                    `Se envío la cotización correctamente`,
                    'pi-file'
                );
                //this.close();
                this.spinner.hide();
            },
            (error) => {
                this.AppMainComponent.errorDialog(error);
                this.spinner.hide();
            }
        );
    }

    validateObject() : void {
        this.arrayEmails.push(this.dataForm.value.email);
        if (this.dataForm.value.emailTwo !== '') this.arrayEmails.push(this.dataForm.value.emailTwo);
        this.object = {emails: this.arrayEmails}
    }

    close(): void {
        this.ref.close()
    }
}
