import { Component } from '@angular/core';
import { RecipeListComponent } from '../../containers/recipe-list/recipe-list.component';

@Component({
  selector: 'app-recipe-list-page',
  standalone: true,
  imports: [RecipeListComponent],
  template: `<app-recipe-list />`,
})
export class RecipeListPageComponent {}
