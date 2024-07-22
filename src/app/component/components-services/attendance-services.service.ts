import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AttendanceServicesService {
  //  initialize the environment apiUrl
  private apiUrl = environment.apiUrl;
  // inject the Http Client
  http = inject(HttpClient);

  
  constructor() {}

  getTodayAttendance(employeeId: string, todayDate: any): Observable<any> {
    const params = new HttpParams()
      .set('employeeId', employeeId)
      .set('todayDate', todayDate);

    return this.http.get<any>(
      `${this.apiUrl}api/Attendance/GetTodayAttendanceOfEmployeeWithId`,
      { params }
    );
  }

  checkIn(checkInData: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<any>(
      `${this.apiUrl}api/Attendance/CheckIn`,
      checkInData,
      { headers }
    );
  }

  checkOut(checkOutData: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.patch<any>(
      `${this.apiUrl}api/Attendance/CheckOut`,
      checkOutData,
      { headers }
    );
  }

  getAttendanceDetails(employeeId : string): Observable<any>{
    const params = new HttpParams()
      .set('employeeId', employeeId) ;

      return this.http.get<any>(
        `${this.apiUrl}api/Attendance/GetAllAttendanceOfEmployeeWithId`,
        { params }
      );
  }
}
