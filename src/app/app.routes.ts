import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('@layout/main-layout/main-layout.component').then((m) => m.MainLayoutComponent),
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadComponent: () => import('@layout/header/header.component').then(m => m.HeaderComponent) }, // temporary placeholder, replaced in dashboard part
    ],
  },
  {
    path: '**',
    loadComponent: () =>
      import('@shared/views/page-not-found/page-not-found.component').then((m) => m.PageNotFoundComponent),
  },
];