import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { UserLogin } from '../types/typeHouse';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginUser: UserLogin | undefined;

  constructor(private LoginService: LoginService, private router: Router) {}

  // get isLoggedIn(): boolean {
  //   return this.LoginService.isLoggedIn;
  // }

  login(ev: Event, email: HTMLInputElement, password: HTMLInputElement): void {
    ev.preventDefault();

    this.loginUser = {
      email: email.value,
      password: password.value,
    };

    this.LoginService.login(this.loginUser).subscribe({
      next: (response) => {
        console.log('Login Successful');
        const accessToken = response.accessToken;
        this.router.navigate(['/']);

        if (accessToken) {
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('email', response.email);
        } else {
          console.error('Access Token is missing from the server response');
        }
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error:', error);
      },
      complete: () => {
     
        email.value = '';
        password.value = '';
      },
    });
  }
}
