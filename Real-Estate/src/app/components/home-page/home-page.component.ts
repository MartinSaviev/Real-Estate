import { Component } from '@angular/core';
import { LastThreeEstateComponent } from '../last-three-estate/last-three-estate.component';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [LastThreeEstateComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  constructor(private AuthService:AuthService){}

  email() {
    return this.AuthService.email || '';
  
  }
}