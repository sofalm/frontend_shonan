import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MenuItem} from "primeng/api";
import {debounceTime, Subscription} from "rxjs";
import {environment} from "../../../../../../../environments/environment";
import {QuotationService} from "../../services/quotation.service";
import {DialogService} from "primeng/dynamicdialog";
import {SharedService} from "../../../../../../shared/services/shared.service";
import {AppBreadcrumbService} from "../../../../../../app.breadcrumb.service";
import {NgxSpinnerService} from "ngx-spinner";
import {CrudComponent} from "../modals/crud/crud.component";
import {SendComponent} from "../modals/send/send.component";
import {AppMainComponent} from "../../../../../../app.main.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit{

    dataPaginate!: any;
    dataForm!: FormGroup;
    dataItems!: any;
    selected!: any;
    itemsPanel! : MenuItem[];
    loading: boolean = true;
    name : string = '';
    subscription!:Subscription;
    s3Url: string = environment.s3Url;
    sidebarFilter = false;
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

    ngOnInit(): void {
        this.loadDataForm();
        this.loadData();
        this.loadFilter();
        this.loadMenuPanel();
    }

    constructor(private quotationService: QuotationService,
                private formBuilder: FormBuilder,
                private dialogService: DialogService,
                private sharedService: SharedService,
                private breadcrumbService: AppBreadcrumbService,
                public AppMainComponent: AppMainComponent,
                private spinner: NgxSpinnerService,
                private router: Router,) {

        this.breadcrumbService.setItems([
            {label: 'Panel', routerLink: ''},
            {label: 'Cotización', routerLink: 'quotation'},
        ]);
    }

    loadData() : void {
        this.sharedService.spinnerShow()
        this.quotationService.getQuotationsPaginate(this.dataPaginate).subscribe((response) => {
                console.log(response.items)
                this.dataItems = response.items;
                this.loading = false;
                this.dataPaginate.page = response.page;
                this.dataPaginate.totalRecords = response.total;
                this.sharedService.spinnerHide();
            }, (error => {
                this.AppMainComponent.errorDialog(error)
                this.sharedService.spinnerHide()
            })
        )
    }

    loadFilter() : void {
        this.subscription = this.dataForm.valueChanges
            .pipe(debounceTime(500))
            .subscribe(data => {
                this.dataPaginate.search = data.search;
                this.loadData();
            });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    /**
     * Items Panel
     */
    loadMenuPanel(): void {
        this.itemsPanel = [
            {
                items: [
                    /*{
                        label: 'Editar',
                        icon: 'fa-solid fa-user-pen',
                        iconClass: 'color-icon-fa-blue',
                        command: () => {
                            this.addUpdate('edit', this.selected,false)
                        }
                    },*/
                    {
                        label: 'Editar',
                        icon: 'fa-solid fa-user-pen',
                        iconClass: 'color-icon-fa-blue',
                        command: () => {
                            this.router.navigateByUrl("/panel/quotation/crud/" + this.selected.id)
                        }
                    },
                    {
                        label: 'Pdf',
                        icon: 'pi pi-file-pdf',
                        iconClass: 'color-icon-fa-blue',
                        command: () => {
                            this.viewPdf(this.selected)
                        }
                    },
                    {
                        label: 'Enviar',
                        icon: 'pi pi-send',
                        iconClass: 'color-icon-fa-blue',
                        command: () => {
                            this.sendPdf(this.selected)
                        }
                    },
                    {
                        label: 'Eliminar',
                        icon: 'fa-solid fa-trash-can',
                        iconClass: 'color-icon-fa-pink',
                        command: () => {
                            this.addUpdate('delete', this.selected, false);
                        }
                    },
                ]},
        ];

    }

    /**
     * Open dialog update And new.
     * @param type
     * @param item
     * @param info
     */
    addUpdate(type: string, item: any, info: boolean): void {
        let sizeModal = '70%';
        let title = 'Cotización'
        if (item !== '') {
            this.name = item.name;
        }

        if (this.AppMainComponent.isMobile()) sizeModal = '90%';
        const dialog = this.dialogService.open(CrudComponent, {
            data: {
                type: type,
                item: item,
                info: info,
            },
            header: `${title}`,
            width: sizeModal,
            dismissableMask: true
        });

        dialog.onClose.subscribe((res:boolean) => {
            this.loadData();
        });

    }

    /**
     * View Service Pdf
     * @param item
     */
    viewPdf(item: any) : void {
        this.spinner.show();
        this.quotationService.getPdfById(item.id).subscribe((response) => {
            let url = this.s3Url + '/' + response.data;
            console.log(response)
            window.open(url, '_blank')
            this.spinner.hide();
        }, (error => {
            this.AppMainComponent.errorDialog(error)
            this.spinner.hide();
        }));
    }

    /**
     * Open dialog update And new.
     * @param item
     */
    sendPdf(item: any): void {
        let sizeModal = '50%';
        let title = 'Cotización'
        if (item !== '') {
            this.name = item.name;
        }

        if (this.AppMainComponent.isMobile()) sizeModal = '90%';
        const dialog = this.dialogService.open(SendComponent, {
            data: {
                item: item,
            },
            header: `${title}`,
            width: sizeModal,
            dismissableMask: true
        });

        dialog.onClose.subscribe((res:boolean) => {
            this.loadData();
        });

    }

    loadDataForm() : void {
        this.dataForm = this.formBuilder.group({
            page_size : 5,
            first: 0,
            page: 0,
            rows: 5,
            totalRecords: 0,
            search: '',
            date: '',
            s_project_types: '',
            project_types: '',
            s_design_types: '',
            design_types: '',
            s_electric_types: '',
            electric_types: '',
            s_energy_types: '',
            energy_types: '',
            s_manufacture_types: '',
            manufacture_types: '',
            s_standard_types: '',
            standard_types: '',
            s_work_height_types: '',
            work_height_types: '',
            s_hot_work_types: '',
            hot_work_types: '',
            s_loading_equipment_types: '',
            s_status: '',
            status: ''
        });
        this.convertData();
    }

    convertData() : void {
        this.dataPaginate = this.dataForm.value
    }

    getEventValue($event:any) {
        this.dataPaginate.search = $event.target.value;
        this.loadData();
    }

    onPageChange(event: any) {
        this.dataPaginate.loading = true;
        this.dataPaginate.first = event.first;
        this.dataPaginate.page_size = event.rows;
        this.dataPaginate.pageCount = event.pageCount;
        this.dataPaginate.page = event.page + 1;
        this.loadData();
    }

    /**
     * Search Customers by Autocomplete
     */
    search() {

        if (this.dataForm.value.s_project_types !== ''){
            this.dataForm.patchValue({project_types: this.dataForm.value.s_project_types?.id})
            this.convertData();
            this.loadData();
        }

        if (this.dataForm.value.date !== ''){
            console.log(this.dataForm.value.date)
            let initial_date!: string, final_date: string;
            //let range_date: string = this.dataForm.value.range_date[1];
            /*if (range_date !== null) {
                initial_date = this.dateService.getFormatDataDate(this.dataForm.value.range_date[0]);
                final_date = this.dateService.getFormatDataDate(this.dataForm.value.range_date[1]);
                this.dataForm.patchValue({
                    initial_date: initial_date,
                    final_date: final_date
                });*/
            //this.dataForm.patchValue({date: this.dataForm.value.s_project_types?.id})
            this.convertData();
            this.loadData();
        }

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
