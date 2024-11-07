import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';

@Directive({
  selector: '[appCityValidate]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: CityValidateDirective, multi: true },
  ],
})
export class CityValidateDirective implements Validator {
  validate(control: AbstractControl): { [key: string]: any } | null {
    const value: string = control.value;
    const allowedCities = ['Virudhunagar', 'Sivakasi', 'Aruppukottai'];

    if (!allowedCities.includes(value)) {
      return { invalidCity: true }; // Validation failed, selected city is invalid
    } else {
      return null; // Validation passed, selected city is valid
    }
  }
  constructor() {}
}
