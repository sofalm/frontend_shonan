import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MenuItem} from "primeng/api";
import {DialogService} from "primeng/dynamicdialog";
import {CrudComponent} from "../../modals/crud/crud.component";
import {debounceTime, Subscription} from "rxjs";
import {CatalogService} from "../../../services/catalog.service";
import {AppMainComponent} from "../../../../../../../app.main.component";

@Component({
  selector: 'app-hot-work-types',
  templateUrl: './hot-work-types.component.html',
  styleUrls: ['./hot-work-types.component.scss'],
    providers: [DialogService]
})
export class HotWorkTypesComponent implements OnInit, OnDestroy {

    dataPaginate!: any;
    dataForm!: FormGroup;
    dataItems!: any;
    selected!: any;
    itemsPanel! : MenuItem[];
    loading: boolean = true;
    name : string = '';
    subscription!:Subscription;

    ngOnInit(): void {
        this.loadDataForm();
        this.loadData();
        this.loadFilter();
        this.loadMenuPanel();
    }

    constructor(private catalogService: CatalogService,
                private formBuilder: FormBuilder,
                private dialogService: DialogService,
                public AppMainComponent: AppMainComponent) {
    }

    loadData() : void {
        this.loading = true
        this.catalogService.getHotWorksPaginate(this.dataPaginate).subscribe((response) => {
                this.dataItems = response.items;
                this.loading = false;
                this.dataPaginate.page = response.page;
                this.dataPaginate.totalRecords = response.total;

            }, (error => {
                this.AppMainComponent.errorDialog(error)
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
                    {
                        label: 'Editar',
                        icon: 'fa-solid fa-user-pen',
                        iconClass: 'color-icon-fa-blue',
                        command: () => {
                            this.addUpdate('edit', this.selected,false)
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
     * @param url
     */
    addUpdate(type: string, item: any, info: boolean): void {
        let sizeModal = '50%';
        let title = 'Tipo Diseño'
        if (item !== '') {
            this.name = item.name;
        }
        if (this.AppMainComponent.isMobile()) sizeModal = '90%';
        const dialog = this.dialogService.open(CrudComponent, {
            data: {
                type: type,
                item: item,
                info: info,
                url: '/catalogs/hot-work-types/',
                input: 1
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
        console.log(event)
        this.dataPaginate.loading = true;
        this.dataPaginate.first = event.first;
        this.dataPaginate.page_size = event.rows;
        this.dataPaginate.pageCount = event.pageCount;
        this.dataPaginate.page = event.page + 1;
        this.loadData();
    }

}

