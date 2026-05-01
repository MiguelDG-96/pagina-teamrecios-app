import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter, withViewTransitions, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { authInterceptor } from './interceptors/auth.interceptor';
import { errorInterceptor } from './interceptors/error.interceptor';
import { loadingInterceptor } from './interceptors/loading.interceptor';
import { LUCIDE_ICONS, LucideIconProvider, Menu, X, Send, ArrowRight, Rocket, Code, Zap, TrendingUp, ShieldCheck, CheckCircle, Calendar, Video, Clock, Users } from 'lucide-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),

    // ── Router ──────────────────────────────────────────────
    provideRouter(
      routes,
      withViewTransitions(),
      withInMemoryScrolling({ scrollPositionRestoration: 'top' })
    ),

    // ── HTTP Client with interceptors ───────────────────────
    provideHttpClient(
      withInterceptors([
        authInterceptor,
        errorInterceptor,
        loadingInterceptor,
      ])
    ),

    // ── Icons ───────────────────────────────────────────────
    { 
      provide: LUCIDE_ICONS, 
      multi: true, 
      useValue: new LucideIconProvider({ Menu, X, Send, ArrowRight, Rocket, Code, Zap, TrendingUp, ShieldCheck, CheckCircle, Calendar, Video, Clock, Users }) 
    },
  ],
};
