import { Component } from '@angular/core';
import { RegisterService } from './register.service';
import { UserRegister } from './UserRegisterType';
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
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  providers: [RegisterService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerUser: UserRegister | undefined;

  constructor(
    private RegisterService: RegisterService,
    private router: Router,
    private AuthService: AuthService
  ) {}

  registerForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern('/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/gm'),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    rePassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  register(event: Event) {
    event.preventDefault();

    const { email, password, rePassword } = this.registerForm.value;

    this.registerUser = {
      email,
      password,
    } as UserRegister;

    if (password !== rePassword) {
      this.registerForm.value.password = '';
      this.registerForm.value.rePassword = '';
      alert('Passwords do not match');
      return;
    }
    this.RegisterService.registerUser(this.registerUser).subscribe({
      next: (response) => {
        console.log('Login Successful');

        const accessToken = response.body?.accessToken || '';
        const email = response.body?.email || '';
        this.router.navigate(['/']);

        if (accessToken) {
          this.AuthService.accessToken = accessToken;
          this.AuthService.email = email;
        } else {
          console.error('Access Token is missing from the server response');
        }
      },

      error: (error: HttpErrorResponse) => {
        console.error('Error:', error);
      },
      complete: () => {
        this.registerForm.reset();
      },
    });
  }
}
