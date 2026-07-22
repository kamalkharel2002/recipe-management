import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class StepFactory {
  constructor(private fb: FormBuilder) {}

  create(initial?: string): FormControl {
    return this.fb.control(initial ?? '', Validators.required);
  }
}
