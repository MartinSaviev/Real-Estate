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
      Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$'),
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

  passwordsMatch(): boolean {
    return (
      this.registerForm.get('password')?.value ===
      this.registerForm.get('rePassword')?.value
    );
  }
  
  register(event: Event) {
    event.preventDefault();
    if (this.registerForm.invalid) {
      alert('Грешно потебителско име или парола!');
      return;
    }

    const { email, password, rePassword } = this.registerForm.value;

    this.registerUser = {
      email,
      password,
    } as UserRegister;

    if (this.registerUser.password.length < 6) {
      return;
    }

    this.RegisterService.registerUser(this.registerUser).subscribe({
      next: (response) => {
        
        console.log(response.body?.password);
        console.log(response.body?.password.length)
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
        if (error.status === 409) {
          alert('Съществуващ емайл адрес!');
          this.registerForm.reset();
        }
        else if (error.status !== 200) {
          console.log(error.status);
          alert('Грешно потребителско име или парола!');
          return;
        }

        console.error('Error:', error);
      },
      complete: () => {
        console.log('Registration completed');
        this.registerForm.reset();
      },
    });
  }
}
