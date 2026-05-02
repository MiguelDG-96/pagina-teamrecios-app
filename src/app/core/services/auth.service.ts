import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { User, AuthState, AuthApiResponse } from '../models/auth.model';
import { environment } from '../../../environments/environment';

const TOKEN_KEY = 'tr_access_token';
const USER_KEY  = 'tr_user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  private readonly _state = signal<AuthState>({
    user:            this.loadUser(),
    token:           this.loadToken(),
    expiresAt:       null,
    isAuthenticated: !!this.loadToken(),
  });

  readonly user            = computed(() => this._state().user);
  readonly token           = computed(() => this._state().token);
  readonly isAuthenticated = computed(() => this._state().isAuthenticated);

  /** Authenticate user via backend */
  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/v1/auth/login`, credentials).pipe(
      tap((res: any) => {
        if (res && res.data) {
          const { token, usuario } = res.data;
          this.setSession(
            {
              id: usuario.id,
              nombre: usuario.nombre,
              email: usuario.email,
              role: usuario.rolNombre || usuario.role || 'admin',
            },
            token,
            Date.now() + 24 * 60 * 60 * 1000
          );
        }
      })
    );
  }

  /** Register user via backend */
  register(userData: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/v1/auth/register`, userData).pipe(
      tap((res: any) => {
        if (res && res.data) {
          const { token, usuario } = res.data;
          this.setSession(
            {
              id: usuario.id,
              nombre: usuario.nombre,
              email: usuario.email,
              role: usuario.rolNombre || usuario.role || 'admin',
            },
            token,
            Date.now() + 24 * 60 * 60 * 1000
          );
        }
      })
    );
  }

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
