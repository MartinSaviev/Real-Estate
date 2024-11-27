import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { UserLogin } from './userLoginType';

@Injectable()
export class LoginService {
  apiLogin = environment.apiLogin;
  constructor(private http: HttpClient) {}

  login(user: UserLogin) {
    return this.http.post<UserLogin>(this.apiLogin, user,{ observe: 'response' });
  }
}
