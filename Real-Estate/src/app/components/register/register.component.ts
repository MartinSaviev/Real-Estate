import { Component } from '@angular/core';
import { RegisterService } from './register.service';
import { UserRegister } from '../types/typeHouse';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerUser: UserRegister | undefined;

  constructor(private RegisterService: RegisterService,private router:Router ) {}

  register(
    event: Event,
    email: HTMLInputElement,
    password: HTMLInputElement,
    rePassword: HTMLInputElement
  ) {
    event.preventDefault();

    this.registerUser = {
      email: email.value,
      password: password.value,
      rePassword: rePassword.value,
    };

    if (this.registerUser.password !== this.registerUser.rePassword) {
      alert('Passwords do not match');
      this.registerUser.email = email.value;
      password.value = '';
      rePassword.value = '';
      return;
    }
    this.RegisterService.registerUser(this.registerUser).subscribe({
      next: (response: any) => {
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
        // Handle error here
      },
      complete: () => {
        (email.value = ''), (password.value = ''), (rePassword.value = '');
      },
    });
  }
}
