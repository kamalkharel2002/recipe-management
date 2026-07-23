import { Component, Input } from '@angular/core';
import { RecipeFormComponent } from '../../containers/recipe-form/recipe-form.component';

@Component({
  selector: 'app-edit-recipe-page',
  standalone: true,
  imports: [RecipeFormComponent],
  template: `
    <h1 class="text-xl font-semibold mb-6">Edit Recipe</h1>
    <app-recipe-form [recipeId]="recipeIdAsNumber" />
  `,
})
export class EditRecipePageComponent {
  @Input() id!: string;
  get recipeIdAsNumber(): number {
    return Number(this.id);
  }
}
