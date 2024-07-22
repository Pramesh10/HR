import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout.component';
import { DashboardComponent } from '../../component/dashboard/dashboard.component';
import { UserProfileComponent } from '../../component/user-profile/user-profile.component';
import { NepaliDatePickerComponent } from '../../component/nepali-date-picker/nepali-date-picker.component';
import { AttendanceListComponent } from '../../component/attendance-list/attendance-list.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { breadcrumb: 'Dashboard' , title : 'Dashboard' }
      },
      {
        path: 'user-profile',
        component: UserProfileComponent,
        data: { breadcrumb: 'Dashboard' , title : 'Dashboard' }
      },
      {
        path: 'nep-date-picker',
        component: NepaliDatePickerComponent,
        data: { breadcrumb: 'Dashboard' , title : 'Dashboard' }
      },
      {
        path: 'attendance-list',
        component: AttendanceListComponent,
        data: { breadcrumb: 'Dashboard' , title : 'Dashboard' }
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminLayoutRoutingModule {}
