import { Component, inject, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../../environments/environment';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-permisos',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './permisos.html',
  styleUrl: './permisos.css',
})
export class Permisos implements OnInit {
  private readonly http = inject(HttpClient);
  data = signal<any[]>([]);
  columns = signal<string[]>([]);
  isLoading = signal<boolean>(true);

  ngOnInit() {
    // We fetch Roles because Permissions are tied to them, and /v1/admin/permisos GET is not supported
    this.http.get<any>(`${environment.apiUrl}/v1/admin/roles`).subscribe({
      next: (res) => {
        if (res?.data) {
          this.data.set(res.data);
          if (res.data.length > 0) {
            const cols = Object.keys(res.data[0]).filter(k => !['createdAt', 'updatedAt'].includes(k)); this.columns.set(cols);
          }
        }
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      }
    });
  }
}



