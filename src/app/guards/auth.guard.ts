import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

/**
 * authGuard — Protects dashboard routes, redirects to login if not authenticated.
 */
export const authGuard: CanActivateFn = () => {
  const auth   = inject(AuthService);
  const router = inject(Router);

  if (auth.isAuthenticated()) {
    return true;
  }

  router.navigate(['/admin/login'], { replaceUrl: true });
  return false;
};

/**
 * guestGuard — Prevents authenticated users from accessing the login page.
 */
export const guestGuard: CanActivateFn = () => {
  const auth   = inject(AuthService);
  const router = inject(Router);

  if (!auth.isAuthenticated()) {
    return true;
  }

  router.navigate(['/admin/dashboard'], { replaceUrl: true });
  return false;
};
