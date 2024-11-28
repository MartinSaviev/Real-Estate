import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const isAuthenticated: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const authService = inject(AuthService);
  const token = authService.accessToken;

  if (!token) {
    return true;
  }
  router.navigate(['/**']);
  return false;
};
