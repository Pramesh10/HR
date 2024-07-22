import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor() {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }


  public get CurrentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(loginData: any): Observable<any> {
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}api/Auth/authenticate`, loginData, { headers }).pipe(
      map((response) => {
        if (response) {
          localStorage.setItem('currentUser', JSON.stringify(response))
          this.currentUserSubject.next(response);
          return response;
        }
        return false;
      }),
      catchError((error) => {
        console.error('Error logging in:', error);
        return of(false);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }
  private apiIpUrl = 'https://api.ipify.org?format=json';
  getIpAddress(): Observable<{ ip: string }> {
    return this.http.get<{ ip: string }>(this.apiIpUrl);
  }
}


export class User {
  username: string;
  token: string;
  expiresAt: Date;
}
