import { Injectable } from '@angular/core';
import {AbstractControl, ValidationErrors} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  public email: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  public onlyNumber: string = '^\\d+$';

  constructor() { }

  fieldEquals(fieldOne: string, fieldTwo: string) {
    return (formGroup: AbstractControl) : ValidationErrors | null => {
      const passOne = formGroup.get(fieldOne)?.value
      const passTwo = formGroup.get(fieldTwo)?.value
      if (passOne !== passTwo) {
        return {noEquals: true}
      }
      return null
    }
  }

  /**
   * Validate value if exist object
   * @param value
   */
  isObject(value : any) {
    return (formGroup: AbstractControl) : ValidationErrors | null => {
      let object = value;
      if (value !== '') object = formGroup.get(value)?.value;
      if (typeof object !== 'object' && object !== '') {
        formGroup.get(value)?.setErrors({noType: true})
        return {noType: true}
      }
      return null;
    }
  }

}
