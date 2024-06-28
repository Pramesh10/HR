import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  // http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  constructor() {}

  // login(username: string, password: string): Observable<boolean> {
  //   return this.http.post<any>(this.apiUrl, { username, password }).pipe(
  //     map((response) => {
  //       if (response && response.token) {
  //         localStorage.setItem('currentUser', JSON.stringify(response));
  //         return true;
  //       }
  //       return false;
  //     }),
  //     catchError((error) => {
  //       console.error('Error logging in:', error);
  //       return of(false);
  //     })
  //   );
  // }

  logout(): void {
    localStorage.removeItem('currentUser');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }
}
