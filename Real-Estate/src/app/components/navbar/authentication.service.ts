import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor() {}

  get isAuthenticated(): boolean {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      return true;
    }
    return false;
  }
}
