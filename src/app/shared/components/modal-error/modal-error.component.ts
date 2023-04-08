import {Component, OnInit} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";

@Component({
  selector: 'app-modal-error',
  templateUrl: './modal-error.component.html',
  styleUrls: ['./modal-error.component.scss']
})
export class ModalErrorComponent implements OnInit {

    data : any;

    constructor(public ref: DynamicDialogRef,
                public config: DynamicDialogConfig) { }

    ngOnInit(): void {
        this.data = this.config.data

    }

    close() : void {
        this.ref.close();
    }

}
