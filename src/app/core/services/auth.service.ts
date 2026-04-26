import { Injectable, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { User, AuthState } from '../models/auth.model';

const TOKEN_KEY = 'tr_access_token';
const USER_KEY  = 'tr_user';

/**
 * AuthService — Manages authentication state using Angular signals.
 * Token is persisted in localStorage.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly _state = signal<AuthState>({
    user:            this.loadUser(),
    token:           this.loadToken(),
    expiresAt:       null,
    isAuthenticated: !!this.loadToken(),
  });

  readonly user            = computed(() => this._state().user);
  readonly token           = computed(() => this._state().token);
  readonly isAuthenticated = computed(() => this._state().isAuthenticated);
  readonly role            = computed(() => this._state().user?.role ?? null);

  constructor(private readonly router: Router) {}

  /** Set auth session after successful login */
  setSession(user: User, token: string, expiresAt: number): void {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));

    this._state.set({
      user,
      token,
      expiresAt,
      isAuthenticated: true,
    });
  }

  /** Destroy session and navigate to login */
  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);

    this._state.set({
      user:            null,
      token:           null,
      expiresAt:       null,
      isAuthenticated: false,
    });

    this.router.navigate(['/admin/login']);
  }

  getToken(): string | null {
    return this._state().token;
  }

  hasRole(role: string): boolean {
    return this._state().user?.role === role;
  }

  // ── Private helpers ──────────────────────────────────────────────────

  private loadToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  private loadUser(): User | null {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as User;
    } catch {
      return null;
    }
  }
}
