import {Component, OnInit} from '@angular/core';
import {AppBreadcrumbService} from "../../../../../../app.breadcrumb.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../../../auth/interfaces/auth.interface";
import {LocalStorageService} from "../../../../../../shared/services/local-storage-service";
import {NgxSpinnerService} from "ngx-spinner";
import {AppMainComponent} from "../../../../../../app.main.component";
import {QuotationService} from "../../services/quotation.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-view-crud',
  templateUrl: './view-crud.component.html',
  styleUrls: ['./view-crud.component.scss']
})
export class ViewCrudComponent implements OnInit {

    dataForm!: FormGroup;
    object: any;
    user: User = this.localStorageService.get('user');
    idQuotation: string = '';
    projectTypes: any;
    filteredProjectTypes: any;
    designTypes: any;
    filteredDesignTypes: any;
    electricTypes: any;
    filteredElectricTypes: any;
    energyTypes: any;
    filteredEnergyTypes: any;
    manufactureTypes: any;
    filteredManufactureTypes: any;
    standardTypes: any;
    filteredStandardTypes: any;
    workHeightTypes: any;
    filteredWorkHeightTypes: any;
    hotWorkTypes: any;
    filteredHotWorkTypes: any;
    loadingEquipmentTypes: any;
    filteredLoadingEquipment: any;
    constructor(private breadcrumbService: AppBreadcrumbService,
                private formBuilder: FormBuilder,
                private quotationService: QuotationService,
                private localStorageService: LocalStorageService,
                public AppMainComponent: AppMainComponent,
                private spinner: NgxSpinnerService,
                private router: Router,
                private activateRoute: ActivatedRoute,
                ) {
    }

    ngOnInit() {
        this.loadLabels();
        this.loadDataForm();
        this.activateRoute.paramMap.subscribe((params=>{this.idQuotation = params.get('quotation')!;}))
        if (this.idQuotation !== '1') this.loadDataItemById();
    }

    loadLabels() {
        this.breadcrumbService.setItems([
            {label: 'Panel', routerLink: ''},
            {label: 'Cotización', routerLink: 'quotation'},
            {label: 'Requerimiento'},
        ]);
    }

    loadDataForm(): void {
        this.dataForm = this.formBuilder.group(
            {
                id: [{value: '', disabled: false}, [],],
                customer: [{value: '', disabled: false}, [Validators.required],],
                plant: [{value: '', disabled: false}, [Validators.required],],
                plant_user: [{value: '', disabled: false}, [Validators.required],],
                area: [{value: '', disabled: false}, [Validators.required],],
                customer_reference: [{value: '', disabled: false}, [Validators.required],],
                plc_mark: [{value: '', disabled: false}, [Validators.required],],
                entrances_and_exits: [{value: '', disabled: false}, [Validators.required],],
                voltage: [{value: '', disabled: false}, [Validators.required],],
                amperage: [{value: '', disabled: false}, [Validators.required],],
                psi_mpa: [{value: '', disabled: false}, [Validators.required],],
                paint_code: [{value: '', disabled: false}, [Validators.required],],
                paint_mark: [{value: '', disabled: false}, [Validators.required],],
                project_requirement: [{value: '', disabled: false}, [Validators.required],],
                cycle_time: [{value: '', disabled: false}, [],],
                quote_date: [{value: '2023-03-02', disabled: false}, [Validators.required],],
                purchase_order_date: [{value: '2023-03-02', disabled: false}, [],],
                start_project_date: [{value: '2023-03-02', disabled: false}, [],],
                end_project_date: [{value: '2023-03-02', disabled: false}, [],],
                project_types: [{value: '', disabled: false}, [Validators.required],],
                design_types: [{value: '', disabled: false}, [Validators.required],],
                electric_types: [{value: '', disabled: false}, [Validators.required],],
                energy_types: [{value: '', disabled: false}, [Validators.required],],
                manufacture_types: [{value: '', disabled: false}, [Validators.required],],
                standard_types: [{value: '', disabled: false}, [Validators.required],],
                work_height_types: [{value: '', disabled: false}, [Validators.required],],
                hot_work_types: [{value: '', disabled: false}, [Validators.required],],
                loading_equipment_types: [{value: '', disabled: false}, [Validators.required],],
                user: [{value: this.user, disabled: false}, [Validators.required],],
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
        this.quotationService.getItemById(this.idQuotation).subscribe(
            (response) => {
                console.log(response)
                delete response.folio;
                delete response.updated_at;
                delete response.created_at;
                delete response.is_active;
                delete response.deleted_at;
                delete response.is_deleted;
                //this.name = response.customer;

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

        this.quotationService.addItem(this.object).subscribe(
            (response) => {
                console.log(response)
                this.AppMainComponent.messageServiceCustom(
                    'success',
                    'Cotización',
                    `Se Agrego la cotización : ${response.data.folio}`,
                    'pi-file'
                );
                this.cancel();
                this.spinner.hide();
            },
            (error) => {
                this.AppMainComponent.errorDialog(error);
                this.spinner.hide();
            }
        );
    }

    update(): void {
        if (this.dataForm.invalid) return;
        this.spinner.show();
        this.validateObject();
        this.quotationService.updateItem(this.object).subscribe(
            (response) => {
                this.AppMainComponent.messageServiceCustom(
                    'success',
                    `Actualizado`,
                    `Se Actualizo la Cotización: ${response.folio} `,
                    'pi pi-file'
                );
                this.cancel();
                this.spinner.hide();
            },
            (error) => {
                this.AppMainComponent.errorDialog(error);
                this.spinner.hide();
            }
        );
    }

    validateObject() : void {
        this.object = this.dataForm.value;
        if (this.dataForm.value.project_types.length > 0) {
            this.object.project_types = this.dataForm.value.project_types.map(item => item.id);
        }
        if (this.dataForm.value.design_types.length > 0) {
            this.object.design_types = this.dataForm.value.design_types.map(item => item.id);
        }

        if (this.dataForm.value.electric_types.length > 0) {
            this.object.electric_types = this.dataForm.value.electric_types.map(item => item.id);
        }

        if (this.dataForm.value.energy_types.length > 0) {
            this.object.energy_types = this.dataForm.value.energy_types.map(item => item.id);
        }

        if (this.dataForm.value.manufacture_types.length > 0) {
            this.object.manufacture_types = this.dataForm.value.manufacture_types.map(item => item.id);
        }

        if (this.dataForm.value.standard_types.length > 0) {
            this.object.standard_types = this.dataForm.value.standard_types.map(item => item.id);
        }

        if (this.dataForm.value.work_height_types.length > 0) {
            this.object.work_height_types = this.dataForm.value.work_height_types.map(item => item.id);
        }

        if (this.dataForm.value.hot_work_types.length > 0) {
            this.object.hot_work_types = this.dataForm.value.hot_work_types.map(item => item.id);
        }

        if (this.dataForm.value.loading_equipment_types.length > 0) {
            this.object.loading_equipment_types = this.dataForm.value.loading_equipment_types.map(item => item.id);
        }

        this.object.user = this.dataForm.value.user.id;
        console.log(this.object)
    }

    fieldInvalidForm(field: string, form: FormGroup) {
        return form.get(field)?.invalid && form.get(field)?.touched
    }

    cancel() {
        this.router.navigateByUrl('/panel/quotation');
    }

    /*
      Add Selects
     */
    filterProjectType(event: any) {
        let filtered: any[] = [];
        let query = event.query;

        this.quotationService.getProjectTypes(query).subscribe(
            (projectTypes) => {
                this.projectTypes = projectTypes;
                this.projectTypes.filter((element:any) => {filtered.push(element);});
                this.filteredProjectTypes = filtered;
            },
            (error) => {
                this.AppMainComponent.errorDialog(error);
            }
        );
    }

    filterDesignType(event: any) {
        let filtered: any[] = [];
        let query = event.query;

        this.quotationService.getDesignTypes(query).subscribe(
            (designTypes) => {
                this.designTypes = designTypes;
                this.designTypes.filter((element: any) => {
                    filtered.push(element);
                });
                this.filteredDesignTypes = filtered;
            },
            (error) => {
                this.AppMainComponent.errorDialog(error);
            }
        );
    }

    filterElectricType(event: any) {
        let filtered: any[] = [];
        let query = event.query;

        this.quotationService.getElectricTypes(query).subscribe(
            (electricTypes) => {
                this.electricTypes = electricTypes;
                this.electricTypes.filter((element: any) => {
                    filtered.push(element);
                });
                this.filteredElectricTypes = filtered;
            },
            (error) => {
                this.AppMainComponent.errorDialog(error);
            }
        );
    }

    filterEnergyType(event: any) {
        let filtered: any[] = [];
        let query = event.query;

        this.quotationService.getEnergyTypes(query).subscribe(
            (energyTypes) => {
                this.energyTypes = energyTypes;
                this.energyTypes.filter((element: any) => {
                    filtered.push(element);
                });
                this.filteredEnergyTypes = filtered;
            },
            (error) => {
                this.AppMainComponent.errorDialog(error);
            }
        );
    }

    filterManufactureType(event: any) {
        let filtered: any[] = [];
        let query = event.query;

        this.quotationService.getManufactureTypes(query).subscribe(
            (manufactureTypes) => {
                this.manufactureTypes = manufactureTypes;
                this.manufactureTypes.filter((element: any) => {
                    filtered.push(element);
                });
                this.filteredManufactureTypes = filtered;
            },
            (error) => {
                this.AppMainComponent.errorDialog(error);
            }
        );
    }

    filterStandardType(event: any) {
        let filtered: any[] = [];
        let query = event.query;

        this.quotationService.getStandardTypes(query).subscribe(
            (standardTypes) => {
                this.standardTypes = standardTypes;
                this.standardTypes.filter((element: any) => {filtered.push(element);});
                this.filteredStandardTypes = filtered;
            },
            (error) => {
                this.AppMainComponent.errorDialog(error);
            }
        );
    }

    filterWorkHeightType(event: any) {
        let filtered: any[] = [];
        let query = event.query;

        this.quotationService.getWorkHeightTypes(query).subscribe(
            (workHeightTypes) => {
                this.workHeightTypes = workHeightTypes;
                this.workHeightTypes.filter((element: any) => {
                    filtered.push(element);
                });
                this.filteredWorkHeightTypes = filtered;
            },
            (error) => {
                this.AppMainComponent.errorDialog(error);
            }
        );
    }

    filterHotWorkType(event: any) {
        let filtered: any[] = [];
        let query = event.query;

        this.quotationService.getHotWorkTypes(query).subscribe(
            (hotWorkTypes) => {
                this.hotWorkTypes = hotWorkTypes;
                this.hotWorkTypes.filter((element: any) => {
                    filtered.push(element);
                });
                this.filteredHotWorkTypes = filtered;
            },
            (error) => {
                this.AppMainComponent.errorDialog(error);
            }
        );
    }

    filterLoadingEquipmentType(event: any) {
        let filtered: any[] = [];
        let query = event.query;

        this.quotationService.getLoadingEquipment(query).subscribe(
            (loadingEquipmentTypes) => {
                this.loadingEquipmentTypes = loadingEquipmentTypes;
                this.loadingEquipmentTypes.filter((element: any) => {
                    filtered.push(element);
                });
                this.filteredLoadingEquipment = filtered;
            },
            (error) => {
                this.AppMainComponent.errorDialog(error);
            }
        );
    }

}
