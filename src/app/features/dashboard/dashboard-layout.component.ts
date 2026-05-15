import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LucideAngularModule } from 'lucide-angular';
import { AuthService } from '../../core/services/auth.service';
import { environment } from '../../../environments/environment';

interface ModuloBackend {
  id: number;
  nombre: string;
  slug: string;
  ruta: string;
}

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, LucideAngularModule],
  templateUrl: './dashboard-layout.component.html',
})
export class DashboardLayoutComponent implements OnInit {
  private readonly auth = inject(AuthService);
  private readonly http = inject(HttpClient);
  readonly currentUser = this.auth.user;

  modulos: ModuloBackend[] = [
    { id: 1, nombre: 'Servicios', slug: 'servicios', ruta: '/admin/servicios' },
    { id: 2, nombre: 'Clientes', slug: 'clientes', ruta: '/admin/clientes' },
    { id: 3, nombre: 'Usuarios', slug: 'usuarios', ruta: '/admin/usuarios' },
    { id: 5, nombre: 'Roles', slug: 'roles', ruta: '/admin/roles' },
    { id: 6, nombre: 'Productos', slug: 'productos', ruta: '/admin/productos' },
    { id: 7, nombre: 'Módulos', slug: 'modulos', ruta: '/admin/modulos' },
    { id: 8, nombre: 'Permisos', slug: 'permisos', ruta: '/admin/permisos' }
  ];

  private static modulosCargados = false;

  ngOnInit(): void {
    // If already loaded in this layout instance, don't re-fetch to avoid sidebar jumps
    if (DashboardLayoutComponent.modulosCargados && this.modulos.length > 5) {
      return;
    }

    this.http.get<any>(`${environment.apiUrl}/v1/admin/modulos`).subscribe({
      next: (res) => {
        if (res && res.data && res.data.length > 0) {
          const nuevosModulos = res.data
            .map((m: any) => {
              const name = m.nombre || '';
              const slug = (m.slug || name).toLowerCase().trim();
              let ruta = m.ruta || '';
              
              if (!ruta || ruta === '/admin/dashboard' || ruta === '') {
                if (slug.includes('servicio')) ruta = '/admin/servicios';
                else if (slug.includes('cliente')) ruta = '/admin/clientes';
                else if (slug.includes('usuario')) ruta = '/admin/usuarios';
                else if (slug.includes('roles') || slug.includes('rol')) ruta = '/admin/roles';
                else if (slug.includes('producto')) ruta = '/admin/productos';
                else if (slug.includes('modulo')) ruta = '/admin/modulos';
                else if (slug.includes('permiso') || slug.includes('seguridad')) ruta = '/admin/permisos';
                else ruta = '/admin/dashboard';
              }

              if (ruta && !ruta.startsWith('/')) ruta = '/' + ruta;

              return {
                id: m.id || Math.random(),
                nombre: name || 'Módulo',
                slug: slug,
                ruta: ruta
              };
            });
          
          this.modulos = nuevosModulos.sort((a: any, b: any) => (a.id || 0) - (b.id || 0));
          DashboardLayoutComponent.modulosCargados = true;
        }
      },
      error: () => {}
    });
  }

  getLucideName(slug: string): string {
    const s = slug ? slug.toLowerCase() : '';
    if (s.includes('servicio')) return 'briefcase';
    if (s.includes('cliente')) return 'rocket';
    if (s.includes('usuario')) return 'users';
    if (s.includes('contacto')) return 'message-square';
    if (s.includes('roles') || s.includes('rol')) return 'shield';
    if (s.includes('producto')) return 'package';
    if (s.includes('modulo')) return 'layers';
    if (s.includes('permiso')) return 'lock';
    if (s.includes('seguridad')) return 'shield-check';
    if (s.includes('configuracion')) return 'settings';
    return 'layout-grid';
  }

  getUserInitials(): string {
    const user = this.currentUser();
    if (!user || !user.nombre) return 'DU';
    const parts = user.nombre.split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return user.nombre.substring(0, 2).toUpperCase();
  }

  onLogout(): void {
    if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
      this.auth.logout();
    }
  }
}
