import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'app-delete-recipe-dialog',
  standalone: true,
  imports: [DialogModule, ButtonModule],
  template: `
    <p-dialog
      [visible]="recipe !== null"
      (visibleChange)="!$event && cancelled.emit()"
      [modal]="true"
      header="Delete recipe?"
      [style]="{ width: '400px' }"
    >
      @if (recipe) {
        <p>
          Are you sure you want to delete <strong>{{ recipe.title }}</strong>?
          This cannot be undone.
        </p>
      }

      <div class="flex justify-end gap-2 mt-4">
        <p-button label="Cancel" [text]="true" (onClick)="cancelled.emit()" />
        <p-button label="Delete" severity="danger" (onClick)="confirmed.emit()" />
      </div>
    </p-dialog>
  `,
})
export class DeleteRecipeDialogComponent {
  @Input() recipe: Recipe | null = null;
  @Output() confirmed = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();
}
