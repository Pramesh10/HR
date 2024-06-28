import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./layouts/auth-layout/auth-layout/auth-layout.module').then(
        (m) => m.AuthLayoutModule
      ),
  },
];
