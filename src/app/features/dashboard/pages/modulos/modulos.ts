import { Component, inject, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../../environments/environment';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-modulos',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './modulos.html',
  styleUrl: './modulos.css',
})
export class Modulos implements OnInit {
  private readonly http = inject(HttpClient);
  data = signal<any[]>([]);
  columns = signal<string[]>([]);
  isLoading = signal<boolean>(true);

  ngOnInit() {
    this.http.get<any>(`${environment.apiUrl}/v1/admin/modulos`).subscribe({
      next: (res) => {
        if (res?.data) {
          this.data.set(res.data);
          if (res.data.length > 0) {
            const cols = Object.keys(res.data[0]).filter(k => k !== 'iconoHtml' && k !== 'createdAt' && k !== 'updatedAt'); this.columns.set(cols);
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




