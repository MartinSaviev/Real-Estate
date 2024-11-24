import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService implements OnInit {
  apiUrl = environment.apiUrl;
  constructor(
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  ngOnInit(): void {}

   isAuthenticated(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('accessToken');
      if (token) {
        return true;
      }
    }
    return false;
  }

   isAuthEmail(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      const email = localStorage.getItem('email');
      return email || ''
    }
    return '';
   
  }
}
