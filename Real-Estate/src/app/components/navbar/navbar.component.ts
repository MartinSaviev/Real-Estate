import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LogoutService } from '../logout/logout.service';
import { AuthService } from '../auth/auth.service';
import { NavbarHighlightDirective } from './navbar-highlight.directive';

@Component({
  selector: 'app-navbar',
  standalone: true,
  providers: [LogoutService],
  imports: [RouterOutlet, RouterLink, NavbarHighlightDirective],
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
