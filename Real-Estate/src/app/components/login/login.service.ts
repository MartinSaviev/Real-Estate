import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { UserLogin } from '../types/typeHouse';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  apiLogin = environment.apiLogin;
  constructor(private http: HttpClient) {}

  login(user: UserLogin) {
    return this.http.post<UserLogin>(this.apiLogin, user);
  }
}
