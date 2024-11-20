import { HttpClient, HttpHeaders, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {
  apiLogout = environment.apiLogout;
  constructor(private http:HttpClient,private route:Router) { }

  logoutFromServer() {
    const accessToken = localStorage.getItem('accessToken') || '';
    console.log(accessToken);
    const headers = new HttpHeaders({ 'X-Authorization': accessToken });
    return this.http.get<any>(this.apiLogout, { headers });
  }

  logoutService(): void {
    this.logoutFromServer().subscribe({
      next: () => {
        if (HttpStatusCode.NoContent) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('email');
          this.route.navigate(['/']);
          console.log('Logged out successfully');
        } else {
          console.error('Failed to log out');
        }
      },
      error: (error) => {
        console.error('Failed to log out', error);
      },
    });
  }
}
