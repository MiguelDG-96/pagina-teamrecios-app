import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { LucideAngularModule } from 'lucide-angular';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-dashboard-overview',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './dashboard-overview.component.html',
})
export class DashboardOverviewComponent implements OnInit {
  private readonly http = inject(HttpClient);

  stats = {
    servicesCount: 4,
    clientsCount: 8,
    usersCount: 2,
    contactsCount: 16,
  };

  servicesList: any[] = [
    { id: 1, nombre: 'Sistemas Web Premium', descripcion: 'Desarrollo de software y backends escalables' },
    { id: 2, nombre: 'Aplicaciones Móviles', descripcion: 'Soluciones móviles nativas e híbridas' },
    { id: 3, nombre: 'Landing Pages & E-commerce', descripcion: 'Sitios corporativos y tiendas virtuales' },
  ];

  usersList: any[] = [
    { id: 1, nombre: 'Miguel Angel Dolic', email: 'miguel@teamrecios.com', role: 'Super Admin' },
    { id: 2, nombre: 'Nixon Admin', email: 'nixon@teamrecios.com', role: 'Admin' },
  ];

  ngOnInit(): void {
    // Attempt loading real dashboard stats from the backend APIs
    this.http.get<any>(`${environment.apiUrl}/v1/admin/servicios`).subscribe({
      next: (res) => {
        if (res && res.data) {
          this.servicesList = res.data;
          this.stats.servicesCount = res.data.length;
        }
      },
      error: () => {}
    });

    this.http.get<any>(`${environment.apiUrl}/v1/admin/usuarios`).subscribe({
      next: (res) => {
        if (res && res.data) {
          this.usersList = res.data;
          this.stats.usersCount = res.data.length;
        }
      },
      error: () => {}
    });
  }
}
