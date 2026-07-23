import { Routes } from '@angular/router';

export const recipesRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./views/recipe-list/recipe-list.component').then((m) => m.RecipeListPageComponent),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./views/create-recipe/create-recipe.component').then((m) => m.CreateRecipePageComponent),
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./views/edit-recipe/edit-recipe.component').then((m) => m.EditRecipePageComponent),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./views/recipe-detail/recipe-detail.component').then((m) => m.RecipeDetailPageComponent),
  },
];
