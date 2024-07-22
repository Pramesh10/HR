import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '../../services/auth-services/authentication.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JwthttpclientService {

  constructor(private http: HttpClient, private authService: AuthenticationService) {}

  private addAuthHeader(headers: HttpHeaders): HttpHeaders {
    const userValue = this.authService.CurrentUserValue;
    return headers.set('Authorization', `Bearer ${userValue.token}`);
  }

  get<T>(url: string, options?: any): Observable<any> {
    const headers = this.addAuthHeader(new HttpHeaders());
    return this.http.get<T>(url, { ...options, headers });
  }

  post<T>(url: string, body: any, options?: any): Observable<any> {
    const headers = this.addAuthHeader(new HttpHeaders());
    return this.http.post<T>(url, body, { ...options, headers });
  }
}
