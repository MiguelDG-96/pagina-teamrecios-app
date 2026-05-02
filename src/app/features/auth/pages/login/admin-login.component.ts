import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

const REMEMBER_KEY = 'tr_remembered_user';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="relative min-h-screen bg-[#000004] flex items-center justify-center p-4 overflow-hidden select-none">
      
      <!-- Ambient Glowing Gradients directly matching contact section -->
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute top-1/3 left-1/3 w-[550px] h-[550px] bg-indigo-600/5 rounded-full blur-[130px]"></div>
        <div class="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-violet-700/5 rounded-full blur-[110px]"></div>
      </div>

      <!-- Main Login & Register Glass Card -->
      <div class="relative w-full max-w-md bg-[#040612]/95 border border-indigo-500/15 hover:border-indigo-500/35 rounded-2xl p-6 sm:p-10 transition-all duration-500 shadow-xl shadow-black/70">
        
        <!-- Tab buttons to switch between Login and Register -->
        <div class="flex rounded-xl bg-[#000004]/60 border border-indigo-500/15 p-1 mb-6">
          <button
            type="button"
            (click)="isRegistering = false"
            [class.bg-indigo-600]="!isRegistering"
            [class.text-white]="!isRegistering"
            [class.text-gray-400]="isRegistering"
            class="flex-1 py-2.5 text-xs font-bold tracking-wider rounded-lg transition-all duration-300 cursor-pointer text-center select-none"
          >
            ACCEDER
          </button>
          <button
            type="button"
            (click)="isRegistering = true"
            [class.bg-indigo-600]="isRegistering"
            [class.text-white]="isRegistering"
            [class.text-gray-400]="!isRegistering"
            class="flex-1 py-2.5 text-xs font-bold tracking-wider rounded-lg transition-all duration-300 cursor-pointer text-center select-none"
          >
            REGISTRARSE
          </button>
        </div>

        <div class="flex flex-col gap-6">
          
          <!-- Top Branding Context -->
          <div class="flex flex-col items-center text-center">
            <div class="w-14 h-14 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-3">
              <img src="/img/logo/logo.png" alt="Team Recios Logo" class="h-9 w-auto object-contain" />
            </div>
            <h1 class="text-2xl font-extrabold tracking-wider font-[Space_Grotesk,Inter,sans-serif] text-white">
              ADMIN <span class="text-indigo-400">PANEL</span>
            </h1>
            <p class="text-xs text-slate-400 font-medium tracking-wide">
              {{ isRegistering ? 'Crea una cuenta administrativa' : 'Ingresa tus credenciales para administrar la plataforma' }}
            </p>
          </div>

          <!-- LOGIN FORM -->
          @if (!isRegistering) {
            <form (ngSubmit)="onLogin()" #loginForm="ngForm" class="flex flex-col gap-5">
              
              <!-- Email / User Input -->
              <div class="flex flex-col gap-2">
                <label for="username" class="text-xs font-semibold text-gray-300 tracking-wider">CORREO O USUARIO <span class="text-indigo-400">*</span></label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  [(ngModel)]="username"
                  required
                  placeholder="Ej. admin@teamrecios.com"
                  class="w-full bg-[#000004]/60 border border-indigo-500/20 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-500 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
                />
              </div>

              <!-- Password Input -->
              <div class="flex flex-col gap-2">
                <label for="password" class="text-xs font-semibold text-gray-300 tracking-wider">CONTRASEÑA <span class="text-indigo-400">*</span></label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  [(ngModel)]="password"
                  required
                  placeholder="••••••••"
                  class="w-full bg-[#000004]/60 border border-indigo-500/20 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-500 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
                />
              </div>

              <!-- Remember me Checkbox -->
              <div class="flex items-center justify-between mt-1">
                <label class="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    [(ngModel)]="rememberMe"
                    class="checkbox checkbox-xs checkbox-primary bg-transparent border-indigo-500/40 rounded"
                  />
                  <span class="text-xs font-medium text-gray-400">Recordar usuario</span>
                </label>
              </div>

              <!-- Error Alerts -->
              @if (errorMessage) {
                <div class="flex items-center gap-3 bg-red-500/10 border border-red-500/20 text-red-300 px-4 py-3 rounded-xl animate-fade-in text-xs font-medium">
                  <svg class="w-4 h-4 fill-none stroke-current flex-shrink-0" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                  </svg>
                  <span>{{ errorMessage }}</span>
                </div>
              }

              <!-- Submit Button -->
              <button
                type="submit"
                [disabled]="isSubmitting"
                class="w-full flex items-center justify-center gap-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-700/50 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-xl border border-indigo-500/30 hover:border-indigo-400/40 transition-all duration-300 shadow-lg shadow-indigo-600/20 hover:shadow-indigo-500/30 cursor-pointer select-none"
              >
                @if (isSubmitting) {
                  <div class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Autenticando...</span>
                } @else {
                  <span>Ingresar</span>
                  <svg class="w-4 h-4 fill-none stroke-current" stroke-width="2.5" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                }
              </button>

            </form>
          } @else {
            
            <!-- REGISTER FORM -->
            <form (ngSubmit)="onRegister()" #registerForm="ngForm" class="flex flex-col gap-5">
              
              <!-- Full Name Input -->
              <div class="flex flex-col gap-2">
                <label for="regNombre" class="text-xs font-semibold text-gray-300 tracking-wider">NOMBRE COMPLETO <span class="text-indigo-400">*</span></label>
                <input
                  type="text"
                  id="regNombre"
                  name="regNombre"
                  [(ngModel)]="regNombre"
                  required
                  placeholder="Ej. Juan Pérez"
                  class="w-full bg-[#000004]/60 border border-indigo-500/20 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-500 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
                />
              </div>

              <!-- Email Input -->
              <div class="flex flex-col gap-2">
                <label for="regEmail" class="text-xs font-semibold text-gray-300 tracking-wider">CORREO ELECTRÓNICO <span class="text-indigo-400">*</span></label>
                <input
                  type="email"
                  id="regEmail"
                  name="regEmail"
                  [(ngModel)]="regEmail"
                  required
                  placeholder="Ej. admin@teamrecios.com"
                  class="w-full bg-[#000004]/60 border border-indigo-500/20 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-500 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
                />
              </div>

              <!-- Password Input -->
              <div class="flex flex-col gap-2">
                <label for="regPassword" class="text-xs font-semibold text-gray-300 tracking-wider">CONTRASEÑA <span class="text-indigo-400">*</span></label>
                <input
                  type="password"
                  id="regPassword"
                  name="regPassword"
                  [(ngModel)]="regPassword"
                  required
                  placeholder="••••••••"
                  class="w-full bg-[#000004]/60 border border-indigo-500/20 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-500 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
                />
              </div>

              <!-- Error Alerts -->
              @if (errorMessage) {
                <div class="flex items-center gap-3 bg-red-500/10 border border-red-500/20 text-red-300 px-4 py-3 rounded-xl animate-fade-in text-xs font-medium">
                  <svg class="w-4 h-4 fill-none stroke-current flex-shrink-0" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                  </svg>
                  <span>{{ errorMessage }}</span>
                </div>
              }

              <!-- Register Submit Button -->
              <button
                type="submit"
                [disabled]="isSubmitting"
                class="w-full flex items-center justify-center gap-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-700/50 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-xl border border-indigo-500/30 hover:border-indigo-400/40 transition-all duration-300 shadow-lg shadow-indigo-600/20 hover:shadow-indigo-500/30 cursor-pointer select-none"
              >
                @if (isSubmitting) {
                  <div class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Registrando...</span>
                } @else {
                  <span>Crear Cuenta</span>
                  <svg class="w-4 h-4 fill-none stroke-current" stroke-width="2.5" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                }
              </button>

            </form>
          }

          <!-- Divider line -->
          <div class="relative flex py-1 items-center">
            <div class="flex-grow border-t border-indigo-500/10"></div>
            <span class="flex-shrink mx-3 text-[10px] font-bold text-indigo-400/50 uppercase tracking-widest">O</span>
            <div class="flex-grow border-t border-indigo-500/10"></div>
          </div>

          <!-- Mock testing option button matching aesthetic -->
          <button
            type="button"
            (click)="mockLogin()"
            class="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500/5 to-violet-500/5 hover:from-indigo-500/10 hover:to-violet-500/10 border border-indigo-500/10 hover:border-indigo-500/25 text-indigo-300 hover:text-indigo-200 text-xs font-bold py-3.5 px-6 rounded-xl tracking-wide transition-all duration-300 select-none cursor-pointer"
          >
            <span>Iniciar sesión como Administrador (Prueba)</span>
          </button>

        </div>

      </div>

    </div>
  `,
})
export class AdminLoginComponent implements OnInit {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  isRegistering = false;

  // Login variables
  username = '';
  password = '';
  rememberMe = false;

  // Register variables
  regNombre = '';
  regEmail = '';
  regPassword = '';

  isSubmitting = false;
  errorMessage = '';

  ngOnInit(): void {
    const saved = localStorage.getItem(REMEMBER_KEY);
    if (saved) {
      this.username = saved;
      this.rememberMe = true;
    }
  }

  onLogin(): void {
    if (!this.username || !this.password) {
      this.errorMessage = 'Por favor, completa los campos requeridos.';
      return;
    }

    if (this.rememberMe) {
      localStorage.setItem(REMEMBER_KEY, this.username);
    } else {
      localStorage.removeItem(REMEMBER_KEY);
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    this.auth.login({ username: this.username, password: this.password }).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.router.navigate(['/admin/dashboard']);
      },
      error: (err) => {
        this.isSubmitting = false;
        this.errorMessage = err?.error?.message || 'Error al conectar con el servidor. Inténtalo de nuevo.';
      },
    });
  }

  onRegister(): void {
    if (!this.regNombre || !this.regEmail || !this.regPassword) {
      this.errorMessage = 'Por favor, completa todos los campos requeridos.';
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    this.auth.register({
      nombre: this.regNombre,
      email: this.regEmail,
      password: this.regPassword,
      rolId: 1
    }).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.router.navigate(['/admin/dashboard']);
      },
      error: (err) => {
        this.isSubmitting = false;
        this.errorMessage = err?.error?.message || 'Error al registrar usuario. Prueba con otro email.';
      },
    });
  }

  /** Direct fallback for offline/development */
  mockLogin(): void {
    this.auth.setSession(
      { id: 1, nombre: 'Miguel Angel', email: 'admin@teamrecios.com', role: 'admin' },
      'mock-admin-token-12345',
      Date.now() + 24 * 60 * 60 * 1000
    );
    this.router.navigate(['/admin/dashboard']);
  }
}
