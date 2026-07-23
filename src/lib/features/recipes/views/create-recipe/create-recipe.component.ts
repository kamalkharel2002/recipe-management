import { Component } from '@angular/core';
import { RecipeFormComponent } from '../../containers/recipe-form/recipe-form.component';

@Component({
  selector: 'app-create-recipe-page',
  standalone: true,
  imports: [RecipeFormComponent],
  template: `
    <h1 class="text-xl font-semibold mb-6">Create Recipe</h1>
    <app-recipe-form />
  `,
})
export class CreateRecipePageComponent {}
