import { Routes } from '@angular/router';
import { authGuard } from '@core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('@features/authentication/authentication.routes').then(
        (m) => m.authenticationRoutes,
      ),
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('@layout/main-layout/main-layout.component').then(
        (m) => m.MainLayoutComponent,
      ),
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('@layout/header/header.component').then(
            (m) => m.HeaderComponent,
          ),
      },
      {
        path: 'recipes',
        loadChildren: () =>
          import('@features/recipes/recipes.routes').then(
            (m) => m.recipesRoutes,
          ),
      },
      {
        path: 'tags',
        loadChildren: () =>
          import('@features/tags/tags.routes').then((m) => m.tagsRoutes),
      },
    ],
  },
  {
    path: '**',
    loadComponent: () =>
      import('@shared/views/page-not-found/page-not-found.component').then(
        (m) => m.PageNotFoundComponent,
      ),
  },
];
