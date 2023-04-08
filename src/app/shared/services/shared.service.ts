import {EventEmitter, Injectable} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Observable, Subscription} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private http: HttpClient) {}

  // Show Spinner
  spinnerShow(){
    //this.spinner.show()
  }

  // Hide Spinner
  spinnerHide(){
    //this.spinner.hide()
  }

  /**
   * Validations
   * @param field
   * @param form
   */
  fieldInvalidForm(field: string, form: FormGroup) {
    return form.get(field)?.invalid && form.get(field)?.touched
  }

}
