import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-overview',
  standalone: true,
  template: `
    <div style="padding: 2rem;">
      <h1 style="font-family: var(--font-display); margin-bottom: 1rem;">Dashboard</h1>
      <p style="color: var(--color-text-secondary);">Bienvenido al panel de administración de Team Recios.</p>
    </div>
  `,
})
export class DashboardOverviewComponent {}
