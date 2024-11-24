import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LogoutService } from '../logout/logout.service';
import { AuthenticationService } from '../auth/authentication.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  constructor(
    private LogoutService: LogoutService,
    private AuthenticationService: AuthenticationService
  ) {}

  logout() {
    this.LogoutService.logoutService();
  }

   isLoggedIn() {
    return this.AuthenticationService.isAuthenticated;
  }
}
