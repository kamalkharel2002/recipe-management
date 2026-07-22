import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function minArrayLength(min: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const length = control.value?.length ?? 0;
    return length >= min ? null : { minArrayLength: { required: min, actual: length } };
  };
}
