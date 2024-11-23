import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Email } from '../types/typeHouse';

@Injectable({
  providedIn: 'root',
})
export class LogoutService {
  apiLogout = environment.apiLogout;
  emailLoginUser: Email | undefined;

  constructor(private http: HttpClient) {}

  logoutFromServer() {
    const accessToken = localStorage.getItem('accessToken') || '';
    console.log(accessToken);
    const headers = new HttpHeaders({ 'X-Authorization': accessToken });
    this.emailLoginUser = undefined;
    return this.http.get<any>(this.apiLogout, { headers });
  }

}
