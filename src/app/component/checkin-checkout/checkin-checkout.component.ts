import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AttendanceServicesService } from '../components-services/attendance-services.service';
import { Subscription } from 'rxjs';
import { CommonModule, DatePipe } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { AuthenticationService } from '../../services/auth-services/authentication.service';

@Component({
  selector: 'app-checkin-checkout',
  standalone: true,
  imports: [CommonModule, ToastModule],
  providers: [MessageService, DatePipe],
  templateUrl: './checkin-checkout.component.html',
  styleUrl: './checkin-checkout.component.scss',
})
export class CheckinCheckoutComponent implements OnInit, OnDestroy {
  isCheckedIn: boolean = false;
  clockBtnText: string = 'Clock In';

  headerMessage: string = "Let's go to work!!";

  attendanceService = inject(AttendanceServicesService);
  todayCheckInDateTime: string;
  todayCheckOutDateTime: string = '--:--:--';
  todayAttendance: any;
 

  errorFetchingAttendance: boolean = false;
  isFetchingAttendance: boolean = true;
  private todayAttendacneSubscription: Subscription | null = null;

  /**
   *
   */
  constructor(
    private messageService: MessageService,
    private datePipe: DatePipe,
    private userValue: AuthenticationService
  ) {}
  ngOnInit(): void {
    //get the data from the API Attendace Table
    this.getLocation();
    this.getTodayAttendanceDetails();
  }
  getTodayAttendanceDetails() {
    this.isFetchingAttendance = true;
    const userValue = this.userValue.CurrentUserValue.username;
    let todayDate =
      this.datePipe.transform(new Date(), 'yyyy-MM-ddTHH:mm:ss.SSS') + 'Z';
    this.todayAttendacneSubscription = this.attendanceService
      .getTodayAttendance(userValue, todayDate)
      .subscribe({
        next: (data) => {
          this.onTodayAttendacneDataRetrieved(data);
          this.isFetchingAttendance = false;
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Fetching Attendance For Day',
            detail: error.message,
            styleClass: 'custom-toast',
          });
          console.log(this.isFetchingAttendance);
          console.log(this.errorFetchingAttendance);
          console.log(this.isCheckedIn);
          this.isFetchingAttendance = false;
          this.errorFetchingAttendance = true;
        },
      });
  }

  ///Perform what to do after getting the today attendance
  ///Perform what to do after getting the today attendance
  onTodayAttendacneDataRetrieved(todayAttendanceDetails) {
    // if (todayAttendanceDetails.isCheckedIn == false) {
    //   this.isCheckedIn = false;
    // } else if (
    //   todayAttendanceDetails.isCheckedIn == true &&
    //   todayAttendanceDetails.isCheckedOut == true
    // ) {
    //   this.isCheckedIn = true;
    //   this.headerMessage = 'Thank You!!';
    //   this.clockBtnText = 'Your Shift is Over.';
    //   this.todayCheckInDateTime = todayAttendanceDetails.attendanceDetails
    //     .clientDateTimeCheckIn
    //     ? this.datePipe.transform(
    //         todayAttendanceDetails.attendanceDetails.clientDateTimeCheckIn,
    //         'HH:mm:ss'
    //       )
    //     : '--:--:--';
    //   this.todayCheckOutDateTime = todayAttendanceDetails.attendanceDetails
    //     .clientDateTimeCheckOut
    //     ? this.datePipe.transform(
    //         todayAttendanceDetails.attendanceDetails.clientDateTimeCheckOut,
    //         'HH:mm:ss'
    //       )
    //     : '--:--:--';
    // } else {
    //   this.isCheckedIn = true;
    //   this.headerMessage = 'You are at work!!';
    //   this.clockBtnText = 'Clock Out';

    //   this.todayCheckInDateTime = todayAttendanceDetails.attendanceDetails
    //     .clientDateTimeCheckIn
    //     ? this.datePipe.transform(
    //         todayAttendanceDetails.attendanceDetails.clientDateTimeCheckIn,
    //         'HH:mm:ss'
    //       )
    //     : '--:--:--';
    //   this.todayCheckOutDateTime = todayAttendanceDetails.attendanceDetails
    //     .clientDateTimeCheckOut
    //     ? this.datePipe.transform(
    //         todayAttendanceDetails.attendanceDetails.clientDateTimeCheckOut,
    //         'HH:mm:ss'
    //       )
    //     : '--:--:--';
    // }
    // Destructure the attendance details for easier access
    const { isCheckedIn, isCheckedOut, attendanceDetails } =
      todayAttendanceDetails;
    const { clientDateTimeCheckIn = null, clientDateTimeCheckOut = null } =
      attendanceDetails || {};

    this.todayCheckInDateTime = clientDateTimeCheckIn
      ? this.datePipe.transform(clientDateTimeCheckIn, 'hh:mm:ss a')
      : '--:--:--';

    this.todayCheckOutDateTime = clientDateTimeCheckOut
      ? this.datePipe.transform(clientDateTimeCheckOut, 'hh:mm:ss a')
      : '--:--:--';

    if (!isCheckedIn) {
      this.isCheckedIn = false;
    } else {
      this.isCheckedIn = true;

      if (isCheckedOut) {
        this.headerMessage = 'Thank You!!';
        this.clockBtnText = 'Your Shift is Over.';
      } else {
        this.headerMessage = 'You are at work!!';
        this.clockBtnText = 'Clock Out';
      }
    }
  }

  //Check IN AND CHECK OUT FUNCTION
  //Check IN AND CHECK OUT FUNCTION
  //Check IN AND CHECK OUT FUNCTION
  defaultLat = 27.7172335;
  defaultLon = 85.3239504;
  clockIn() {
    this.isFetchingAttendance = true;
    const userValue = this.userValue.CurrentUserValue.username;
    const now = new Date();
    const data = {
      employeeId: userValue,
      date: this.datePipe.transform(now, 'yyyy-MM-ddTHH:mm:ss.SSS') + 'Z',
      // date: '2024-07-15T15:10:17.090Z',
      employeeName: 'Pramesh K.C.',
      clientDateTimeCheckIn:
        this.datePipe.transform(now, 'yyyy-MM-ddTHH:mm:ss.SSS') + 'Z',
      // clientDateTimeCheckIn: '2024-07-15T15:10:17.090Z',
      checkInLatitude: (this.lat ?? '') === '' ? this.defaultLat : this.lat,
      checkInLongitude: (this.lng ?? '') === '' ? this.defaultLon : this.lng,
      remarks: '',
    };
    this.attendanceService.checkIn(data).subscribe(
      (response) => {
        this.isFetchingAttendance = false;
        this.getTodayAttendanceDetails();
        console.log('Response:', response);
      },
      (error) => {
        if (error.status == 500) {
          try {
            if (error.error.includes('Violation of PRIMARY KEY constraint')) {
              console.log('helllooo');
              this.messageService.add({
                severity: 'error',
                summary: 'Check In',
                detail: 'You have already checked in.',
                styleClass: 'custom-toast',
              });
            } else if (
              error.error.includes('Server and client times do not match.')
            ) {
              this.messageService.add({
                severity: 'error',
                summary: 'Server and client times do not match.',
                detail: 'Please update your Time.',
                styleClass: 'custom-toast',
              });
            } else {
              this.messageService.add({
                severity: 'error',
                summary: 'Fetching Attendance For Day',
                detail: error.error,
                styleClass: 'custom-toast',
              });
            }
          } catch (error) {
            this.isFetchingAttendance = false;
          }
        }
      }
    );
  }
  //clockout function
  //clockout function
  clockOut() {
    if (this.todayCheckOutDateTime !== '--:--:--') {
      this.messageService.add({
        severity: 'error',
        summary: 'Checked Out',
        detail: 'You have already checked out.',
      });
      return;
    }
    const userValue = this.userValue.CurrentUserValue.username;
    const now = new Date();
    const data = {
      employeeId: userValue,
      date: this.datePipe.transform(now, 'yyyy-MM-ddTHH:mm:ss.SSS') + 'Z',
      clientDateTimeCheckOut:
        this.datePipe.transform(now, 'yyyy-MM-ddTHH:mm:ss.SSS') + 'Z',
      checkOutLatitude: (this.lat ?? '') === '' ? this.defaultLat : this.lat,
      checkOutLongitude: (this.lng ?? '') === '' ? this.defaultLon : this.lng,
      remarks: '',
    };
    this.attendanceService.checkOut(data).subscribe(
      (response) => {
        console.log('Response:', response);
        this.getTodayAttendanceDetails();
      },
      (error) => {
        if (error.status == 500) {
          if (error.error.includes('Violation of PRIMARY KEY constraint')) {
            console.log('helllooo');
            this.messageService.add({
              severity: 'error',
              summary: 'Check In',
              detail: 'You have already checked in.',
              styleClass: 'custom-toast',
            });
          } else if (
            error.error.includes('Server and client times do not match.')
          ) {
            this.messageService.add({
              severity: 'error',
              summary: 'Server and client times do not match.',
              detail: 'Please update your Time.',
              styleClass: 'custom-toast',
            });
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Fetching Attendance For Day',
              detail: error.error,
              styleClass: 'custom-toast',
            });
          }
        }
        console.error('Error:', error);
      }
    );

    this.headerMessage = 'Thank You!!';
    this.clockBtnText = 'Your Shift is Over.';
  }

  ///Get the location of the current user
  ///Get the location of the current user
  lat: any;
  lng: any;
  getLocation() {
    if (navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        (position) => {
          if (position) {
            console.log(
              'Latitude: ' +
                position.coords.latitude +
                'Longitude: ' +
                position.coords.longitude
            );
            this.lat = position.coords.latitude;
            this.lng = position.coords.longitude;
            console.log(this.lat);
            console.log(this.lng);
          }
        },
        (error) => console.log(error)
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }

  ///ON Component destroy
  ///ON Component destroy
  ngOnDestroy(): void {
    if (this.todayAttendacneSubscription) {
      this.todayAttendacneSubscription.unsubscribe();
    }
    this.errorFetchingAttendance = false;
    this.isFetchingAttendance = false;
  }
}
