import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { RecipeService } from '@features/recipes/services/recipe.service';

@Injectable({ providedIn: 'root' })
export class TagInUseGuard {
  constructor(private recipeService: RecipeService) {}

  isTagInUse(tagName: string): Observable<boolean> {
    return this.recipeService.getAll().pipe(
      map((recipes) => recipes.some((recipe) => recipe.tags.includes(tagName))),
    );
  }
}
