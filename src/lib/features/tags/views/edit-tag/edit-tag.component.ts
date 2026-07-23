import { Component, Input } from '@angular/core';
import { TagFormContainerComponent } from '../../containers/tag-form/tag-form.component';

@Component({
  selector: 'app-edit-tag-page',
  standalone: true,
  imports: [TagFormContainerComponent],
  template: `
    <h1 class="text-xl font-semibold mb-6">Edit Tag</h1>
    <app-tag-form-container [tagId]="tagIdAsNumber" />
  `,
})
export class EditTagPageComponent {
  @Input() id!: string;

  get tagIdAsNumber(): number {
    return Number(this.id);
  }
}
