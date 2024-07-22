import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./layouts/auth-layout/auth-layout/auth-layout.module').then(
        (m) => m.AuthLayoutModule
      ),
  },
  {
    path: 'companyName',
    loadChildren: () =>
      import('./layouts/app-main-layout/main-layout/main-layout-routing.module').then(
        (m) => m.MainLayoutRoutingModule
      ),
  },
];
