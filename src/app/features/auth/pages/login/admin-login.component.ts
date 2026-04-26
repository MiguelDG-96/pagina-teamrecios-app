import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  template: `
    <div style="min-height:100vh; background:var(--gradient-bg); display:flex; align-items:center; justify-content:center;">
      <div class="card" style="width:100%; max-width:400px; margin:1rem; padding:2.5rem;">
        <h1 style="font-family:var(--font-display); font-size:1.5rem; margin-bottom:0.5rem;">Acceso Administrativo</h1>
        <p style="color:var(--color-text-secondary); margin-bottom:2rem; font-size:0.875rem;">Team Recios · Panel de Control</p>
        <p style="color:var(--color-text-muted); font-size:0.8125rem; text-align:center;">Formulario de login — próximamente</p>
      </div>
    </div>
  `,
})
export class AdminLoginComponent {}
