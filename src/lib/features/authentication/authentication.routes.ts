import { Routes } from '@angular/router';

export const authenticationRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./views/login-page/login-page.component').then((m) => m.LoginPageComponent),
  },
];
