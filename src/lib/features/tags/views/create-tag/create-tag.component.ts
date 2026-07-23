import { Component } from '@angular/core';
import { TagFormContainerComponent } from '../../containers/tag-form/tag-form.component';

@Component({
  selector: 'app-create-tag-page',
  standalone: true,
  imports: [TagFormContainerComponent],
  template: `
    <h1 class="text-xl font-semibold mb-6">Create Tag</h1>
    <app-tag-form-container />
  `,
})
export class CreateTagPageComponent {}
