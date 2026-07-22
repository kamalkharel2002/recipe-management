import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class IngredientFactory {
  constructor(private fb: FormBuilder) {}

  create(initial?: { name: string; quantity: number; unit: string }): FormGroup {
    return this.fb.group({
      name: [initial?.name ?? '', Validators.required],
      quantity: [initial?.quantity ?? 1, [Validators.required, Validators.min(0.1)]],
      unit: [initial?.unit ?? '', Validators.required],
    });
  }
}
