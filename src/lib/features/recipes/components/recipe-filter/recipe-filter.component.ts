import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MultiSelectModule } from "primeng/multiselect"

@Component({
  selector: 'app-recipe-filter',
  standalone: true,
  imports:[FormsModule, MultiSelectModule],
  template: `
    <p-multiselect
      [options]="availableTags",
      [(ngModel)] = "selectedTags",
      (ngModelChange)="tagsChange.emit($event)",
      placeholder="Filter by tag"
      Class="w-full"
    />
  `
})
export class RecipeFilterComponent {
  @Input() availableTags: String[] = []
  selectedTags: String[] = []
  @Output() tagsChange = new EventEmitter<string[]>();
}
