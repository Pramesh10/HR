import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../../auth-layout/views-auth-layout/login/login.component';
import { NotFoundErrorPageComponent } from '../../../../common-pages/404-error/not-found-error-page/not-found-error-page.component';
import { MainLayoutComponent } from './main-layout.component';

const routes: Routes = [

  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'admin',
        loadChildren: () =>
          import(
            '../../admin-layout/admin-layout.module'
          ).then((m) => m.AdminLayoutModule),
      },
      {
        path: 'user',
        loadChildren: () =>
          import(
            '../../admin-layout/admin-layout.module'
          ).then((m) => m.AdminLayoutModule),
      },    
      
      {
        path: 'notfound',
        component: NotFoundErrorPageComponent,
      }
      
    ],
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainLayoutRoutingModule {}
