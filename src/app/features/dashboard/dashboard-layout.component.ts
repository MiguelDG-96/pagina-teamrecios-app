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
    { id: 1, nombre: 'Servicios', slug: 'servicios', ruta: '/admin/dashboard' },
    { id: 2, nombre: 'Clientes', slug: 'clientes', ruta: '/admin/dashboard' },
    { id: 3, nombre: 'Usuarios', slug: 'usuarios', ruta: '/admin/dashboard' },
    { id: 4, nombre: 'Contactos', slug: 'contactos', ruta: '/admin/dashboard' },
    { id: 5, nombre: 'Roles', slug: 'roles', ruta: '/admin/dashboard' },
    { id: 6, nombre: 'Productos', slug: 'productos', ruta: '/admin/dashboard' },
    { id: 7, nombre: 'Módulos', slug: 'modulos', ruta: '/admin/dashboard' }
  ];

  ngOnInit(): void {
    // Attempt loading backend modules dynamically
    this.http.get<any>(`${environment.apiUrl}/v1/admin/modulos`).subscribe({
      next: (res) => {
        if (res && res.data && res.data.length > 0) {
          // If modules exist, populate from the backend
          this.modulos = res.data.map((m: any) => ({
            id: m.id,
            nombre: m.nombre,
            slug: m.slug || m.nombre.toLowerCase(),
            ruta: m.ruta || '/admin/dashboard'
          }));
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
    this.auth.logout();
  }
}
