import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * DashboardLayout — Shell for all admin/dashboard pages.
 * Will contain sidebar, topbar and the router outlet.
 */
@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="dashboard-layout">
      <!-- Sidebar will go here -->
      <aside class="dashboard-layout__sidebar">
        <p style="color:var(--color-text-muted); padding:1rem; font-size:0.75rem;">Sidebar — próximamente</p>
      </aside>
      <!-- Main -->
      <div class="dashboard-layout__content">
        <router-outlet />
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
    .dashboard-layout {
      display: flex;
      min-height: 100vh;
      background: var(--color-bg-base);
    }
    .dashboard-layout__sidebar {
      width: 260px;
      background: var(--color-bg-secondary);
      border-right: 1px solid var(--border-subtle);
      flex-shrink: 0;
    }
    .dashboard-layout__content {
      flex: 1;
      overflow: auto;
    }
  `],
})
export class DashboardLayoutComponent {}
