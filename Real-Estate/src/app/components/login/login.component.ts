import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { UserLogin } from './typeHouse';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  providers: [LoginService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginUser: UserLogin | undefined;

  constructor(
    private LoginService: LoginService,
    private AuthService: AuthService,
    private router: Router
  ) {}

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  login() {
    if(this.loginForm.invalid) {
      return;
    }

    this.loginUser = this.loginForm.value as UserLogin;

    this.LoginService.login(this.loginUser).subscribe({
      next: (response) => {
        
        console.log('Server Response:', response);
        console.log('Status Code:', response.status);

        const accessToken = response.body?.accessToken;
        const email = response.body?.email;

        if (accessToken) {
          this.AuthService.accessToken = accessToken;
          this.AuthService.email = email || '';
          this.router.navigate(['/']);
        } else {
          console.error('Access Token is missing from the server response');
        }
      },
      error: (error: HttpErrorResponse) => {
        alert('Грешно потребителско име или парола');
        console.error('Error:', error);
      },
      complete: () => {
        this.loginForm.reset();
      },
    });
  }
}
