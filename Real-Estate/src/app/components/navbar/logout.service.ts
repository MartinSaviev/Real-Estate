import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class LogoutService {
  apiLogout = environment.apiLogout;

  constructor(private http: HttpClient) {}

  logoutFromServer() {
    const accessToken = localStorage.getItem('accessToken') || '';
    console.log(accessToken);
    const headers = new HttpHeaders({ 'X-Authorization': accessToken });
    return this.http.get<any>(this.apiLogout, { headers });
  }
}
