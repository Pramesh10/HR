import { Component, inject, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/auth-services/authentication.service';
import { AttendanceServicesService } from '../components-services/attendance-services.service';
import { Subscription } from 'rxjs';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-attendance-lists',
  standalone: true,
  imports: [CommonModule],
  providers : [DatePipe],
  templateUrl: './attendance-list.component.html',
  styleUrl: './attendance-list.component.scss',
})
export class AttendanceListComponent implements OnInit {
  errorFetchingAttendance: boolean = false;
  isFetchingAttendance: boolean = false;

  attendanceService = inject(AttendanceServicesService);
  private todayAttendacneSubscription: Subscription | null = null;
  attendanceDetailsList: any;
  /**
   *
   */
  constructor(private userValue: AuthenticationService) {}
  ngOnInit(): void {
    this.getTodayAttendanceDetails();
  }

  getTodayAttendanceDetails() {
    this.isFetchingAttendance = true;
    const userValue = this.userValue.CurrentUserValue.username;
    let todayDate = (this.todayAttendacneSubscription = this.attendanceService
      .getAttendanceDetails(userValue)
      .subscribe({
        next: (data) => {
          console.log('attendance details', data);
          this.attendanceDetailsList = data;
          this.isFetchingAttendance = false;
        },
        error: (error) => {
          this.isFetchingAttendance = false;
          this.errorFetchingAttendance = true;
        },
      }));
  }
}

export interface Attendance {
  date: string;
  clientDateTimeCheckIn: string;
  clientDateTimeCheckOut: string;
  checkInAddress: string;
  checkOutAddress: string;
}
