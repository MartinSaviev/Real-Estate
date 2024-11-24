import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  private _accessToken: string | null = null;
  private _email: string | null = null;

  set accessToken(token: string) {
    this._accessToken = token;
    localStorage.setItem('accessToken', token);
  }

  get accessToken(): string | null {
    if (typeof localStorage !== 'undefined') {
      return this._accessToken || localStorage.getItem('accessToken');
    }
    return null;
  }

  set email(email: string) {
    if (typeof localStorage !== 'undefined') {
      this._email = email;
      localStorage.setItem('email', email);
    }
  }

  get email(): string | null {
    if (typeof localStorage !== 'undefined') {
      return this._email || localStorage.getItem('email');
    }
    return null;
  }

  clearData(): void {
    this._accessToken = null;
    this._email = null;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('email');
  }
}
