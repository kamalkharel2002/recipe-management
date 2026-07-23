import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-recipe-search',
  standalone: true,
  imports: [FormsModule, InputTextModule],
  template: `
    <input
      pInputText
      placeholder="Search recipes..."
      [(ngModel)]="query"
      (ngModelChange)="searchChange.emit($event)"
      class="w-full"
    />
  `,
})

export class RecipeSearchComponent {
  query = '';
  @Output() searchChange = new EventEmitter<string>();
}
