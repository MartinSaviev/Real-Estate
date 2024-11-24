import { HttpClient, HttpHeaders, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class LogoutService {
  apiLogout = environment.apiLogout;
  constructor(private http:HttpClient,private route:Router,private AuthService:AuthService) { }

  logoutFromServer() {
    const accessToken = this.AuthService.accessToken || '';
    const headers = new HttpHeaders({ 'X-Authorization': accessToken });
    return this.http.get<any>(this.apiLogout, { headers });
  }

  logoutService(): void {
    this.logoutFromServer().subscribe({
      next: () => {
        if (HttpStatusCode.NoContent) {
          this.AuthService.clearData();
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
