import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

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

export const isOwner: CanActivateFn = (route, state) => {
  const http = inject(HttpClient);
  const router = inject(Router);
  const apiUrl = environment.apiUrl;
  const authService = inject(AuthService);
  const id = route.params['estateId'];
  const email = authService.email;

  return new Observable<boolean>((observer) => {
    http.get<{ email: string }>(`${apiUrl}/realEstate/${id}/owner`).subscribe({
      next: (response) => {
        const ownerEmail = response?.email;

        if (ownerEmail === email) {
          observer.next(true);
        } else {
          router.navigate(['/**']);
          observer.next(false);
        }
      },
    });
  });
};
