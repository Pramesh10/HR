import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../../auth-layout/views-auth-layout/login/login.component';
import { NotFoundErrorPageComponent } from '../../../../common-pages/404-error/not-found-error-page/not-found-error-page.component';

const routes: Routes = [
  { path: '', component: NotFoundErrorPageComponent },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainLayoutRoutingModule { }
