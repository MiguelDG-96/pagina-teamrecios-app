import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../../environments/environment';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-contactos',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './contactos.html',
  styleUrl: './contactos.css',
})
export class Contactos implements OnInit {
  private readonly http = inject(HttpClient);
  data: any[] = [];
  columns: string[] = [];
  isLoading = true;

  ngOnInit() {
    this.http.get<any>(`${environment.apiUrl}/v1/admin/contactos`).subscribe({
      next: (res) => {
        if (res?.data) {
          this.data = res.data;
          if (this.data.length > 0) {
            this.columns = Object.keys(this.data[0]).filter(k => k !== 'iconoHtml' && k !== 'createdAt' && k !== 'updatedAt');
          }
        }
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }
}

