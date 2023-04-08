import {Component, OnInit} from '@angular/core';
import {CatalogService} from "../../../services/catalog.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {ValidatorService} from "../../../../../../../shared/services/validator.service";
import {SharedService} from "../../../../../../../shared/services/shared.service";
import {AppMainComponent} from "../../../../../../../app.main.component";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent implements OnInit {

    dataForm!: FormGroup;
    name: string = '';

    constructor(private catalogService: CatalogService,
                private formBuilder: FormBuilder,
                public ref: DynamicDialogRef,
                public config: DynamicDialogConfig,
                private validatorService: ValidatorService,
                public sharedService: SharedService,
                public AppMainComponent: AppMainComponent,
                private spinner: NgxSpinnerService) {
    }

    ngOnInit(): void {
        this.loadDataForm();
        if (this.config.data.type === 'edit' || this.config.data.type === 'delete') this.loadDataItemById();
        //this.updateEventSharedService();
    }

    loadDataForm(): void {
        this.dataForm = this.formBuilder.group(
            {
                id: [{value: '', disabled: this.config.data.info}, [],],
                name: [{value: '', disabled: this.config.data.info}, [Validators.required],],
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
        this.catalogService.getItemById(this.config.data.item, this.config.data.url).subscribe(
            (response) => {
                this.name = response.folio;

                this.dataForm.patchValue({
                    id: response.id,
                    name: response.name,
                });

                this.spinner.hide();
            },
            (error) => {
                this.spinner.hide();
                this.AppMainComponent.errorDialog(error);
            }
        );
    }

    save(): void {

        if (this.dataForm.invalid) return;
        this.spinner.show();

        this.catalogService.addItem(this.dataForm.value, this.config.data.url).subscribe(
            (response) => {
                 this.AppMainComponent.messageServiceCustom(
                   'success',
                   'Catalogo',
                   `Se Agrego el elemento : ${response.data.folio}`,
                   'pi-file'
                 );
                this.close();
                this.spinner.hide();
            },
            (error) => {
                this.spinner.hide();
                this.AppMainComponent.errorDialog(error);
            }
        );
    }

    update(): void {
        if (this.dataForm.invalid) return;
        this.spinner.show();
        this.catalogService.updateItem(this.dataForm.value, this.config.data.url).subscribe(
            (response) => {
                  this.AppMainComponent.messageServiceCustom(
                    'success',
                    `Actualizado`,
                    `Se Actualizo el elemento: ${response.folio} `,
                    'pi pi-file'
                  );
                this.close();
                this.spinner.hide();
            },
            (error) => {
                //this.panelComponent.errorDialog(error);
                this.spinner.hide();
            }
        );
    }

    delete() {
        this.spinner.show();
        this.catalogService.deleteItem(this.config.data.item.id, this.config.data.url).subscribe(
            (response) => {
                this.AppMainComponent.messageServiceCustom(
                  'error',
                  `Eliminar`,
                  `Se elimino el elemento ${this.name}`,
                  'pi pi-file'
                );
                this.close()
                this.spinner.hide();
            },
            (error) => {
                this.AppMainComponent.errorDialog(error);
                this.spinner.hide();
            }
        );
    }

    close(): void {
        this.ref.close()
    }
}
