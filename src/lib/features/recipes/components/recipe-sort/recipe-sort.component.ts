import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';

export type SortOption = 'newest' | 'cookTime' | 'servings' | 'title';

@Component({
  selector: 'app-recipe-sort',
  standalone: true,
  imports: [FormsModule, SelectModule],
  template: `
    <p-select
      [options]="options"
      [(ngModel)]="selected"
      (ngModelChange)="sortChange.emit($event)"
      optionLabel="label"
      optionValue="value"
      Class="w-48"
    />
  `,
})
export class RecipeSortComponent {
  selected: SortOption = 'newest';
  options = [
    { label: 'Newest first', value: 'newest' },
    { label: 'Cook time', value: 'cookTime' },
    { label: 'Servings', value: 'servings' },
    { label: 'Title (A-Z)', value: 'title' },
  ];
  @Output() sortChange = new EventEmitter<SortOption>();
}
