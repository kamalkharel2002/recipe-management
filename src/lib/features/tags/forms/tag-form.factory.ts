import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Tag } from '../models/tag.model';

@Injectable({ providedIn: 'root' })
export class TagFormFactory {
  constructor(private fb: FormBuilder) {}

  create(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      color: ['#22c55e', Validators.required],
    });
  }

  patchWithTag(form: FormGroup, tag: Tag): void {
    form.patchValue({ name: tag.name, color: tag.color });
  }
}
