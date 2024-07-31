import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonServicesService {
  private companyColor: string = 'rgb(242, 255, 255)'; // Default color

  private companyconfig = {
    companyColor : 'rgb(242, 255, 255)'
  }
  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  fetchCompanyColor(): Observable<any> {
    return this.http
      .get<any>('assets/config.json')
      .pipe(map((response) => response));
  }

  setCompanyColor(color: any): void {
    
    if (isPlatformBrowser(this.platformId)) {
      document.documentElement.style.setProperty('--nav-upper-bg-color', color.companyColor);
    }
  }

  getCompanyColor(): any {
    return this.companyconfig;
  }
}
