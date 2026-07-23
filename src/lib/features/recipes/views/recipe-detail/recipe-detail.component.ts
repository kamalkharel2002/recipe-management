import { Component, Input } from '@angular/core';
import { RecipeDetailComponent } from '../../containers/recipe-detail/recipe-detail.component';

@Component({
  selector: 'app-recipe-detail-page',
  standalone: true,
  imports: [RecipeDetailComponent],
  template: `<app-recipe-detail [id]="id" />`,
})
export class RecipeDetailPageComponent {
  @Input() id!: string;
}
