import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LogoutService } from '../logout/logout.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  providers:[LogoutService],
  imports: [RouterOutlet, RouterLink], 
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  constructor(
    private LogoutService: LogoutService,
    private AuthService: AuthService
  ) {}

  logout() {
    this.LogoutService.logoutService();
  }

   isLoggedIn() {
    return this.AuthService.accessToken || undefined;
  }
}
