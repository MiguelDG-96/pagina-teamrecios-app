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
      {
        path: 'servicios',
        loadComponent: () =>
          import('./features/dashboard/pages/servicios/servicios').then(m => m.Servicios),
        title: 'Servicios | Team Recios',
      },
      {
        path: 'clientes',
        loadComponent: () =>
          import('./features/dashboard/pages/clientes/clientes').then(m => m.Clientes),
        title: 'Clientes | Team Recios',
      },
      {
        path: 'usuarios',
        loadComponent: () =>
          import('./features/dashboard/pages/usuarios/usuarios').then(m => m.Usuarios),
        title: 'Usuarios | Team Recios',
      },
      {
        path: 'roles',
        loadComponent: () =>
          import('./features/dashboard/pages/roles/roles').then(m => m.Roles),
        title: 'Roles | Team Recios',
      },
      {
        path: 'productos',
        loadComponent: () =>
          import('./features/dashboard/pages/productos/productos').then(m => m.Productos),
        title: 'Productos | Team Recios',
      },
      {
        path: 'modulos',
        loadComponent: () =>
          import('./features/dashboard/pages/modulos/modulos').then(m => m.Modulos),
        title: 'Módulos | Team Recios',
      },
      {
        path: 'permisos',
        loadComponent: () =>
          import('./features/dashboard/pages/permisos/permisos').then(m => m.Permisos),
        title: 'Permisos | Team Recios',
      }
    ],
  },

  // ── Wildcard ─────────────────────────────────────────────────────────
  {
    path: '**',
    redirectTo: '',
  },
];
