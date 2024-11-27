import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserRegister } from './UserRegisterType';

@Injectable()
export class RegisterService {
  apiRegister = environment.apiRegister;
  constructor(private http: HttpClient) {}

  registerUser(user: UserRegister) {
    return this.http.post<UserRegister>(this.apiRegister, user ,{ observe: 'response' });
  }
}
