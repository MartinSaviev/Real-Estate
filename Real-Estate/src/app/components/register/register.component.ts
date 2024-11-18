import { Component } from '@angular/core';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  constructor(private RegisterService: RegisterService) {}

  register(
    event: Event,
    email: HTMLInputElement,
    password: HTMLInputElement,
    rePassword: HTMLInputElement
  ) {
    let pass = true;
    event.preventDefault();
    if(password === rePassword){
      pass = false;
    }
  }

  
}
