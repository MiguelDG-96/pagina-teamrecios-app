import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  // ── Public ──────────────────────────────────────────────────────────
  {
    path: '',
    loadComponent: () =>
      import('./features/public/public-layout.component').then(m => m.PublicLayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/public/pages/home/home-page.component').then(m => m.HomePageComponent),
        title: 'Team Recios | Soluciones Digitales de Alto Impacto',
      },
    ],
  },

  // ── Auth ─────────────────────────────────────────────────────────────
  {
    path: 'admin/login',
    loadComponent: () =>
      import('./features/auth/pages/login/admin-login.component').then(m => m.AdminLoginComponent),
    title: 'Acceso Administrativo | Team Recios',
  },

  // ── Dashboard ────────────────────────────────────────────────────────
  {
    path: 'admin',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/dashboard/dashboard-layout.component').then(m => m.DashboardLayoutComponent),
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/pages/overview/dashboard-overview.component').then(m => m.DashboardOverviewComponent),
        title: 'Dashboard | Team Recios',
      },
    ],
  },

  // ── Wildcard ─────────────────────────────────────────────────────────
  {
    path: '**',
    redirectTo: '',
  },
];
