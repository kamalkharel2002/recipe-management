import { Routes } from '@angular/router';

export const tagsRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./views/tag-list/tag-list.component').then((m) => m.TagListPageComponent),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./views/create-tag/create-tag.component').then((m) => m.CreateTagPageComponent),
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./views/edit-tag/edit-tag.component').then((m) => m.EditTagPageComponent),
  },
];
