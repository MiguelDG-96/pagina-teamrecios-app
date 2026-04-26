import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PublicNavbarComponent } from './components/public-navbar/public-navbar.component';

@Component({
  selector: 'app-public-layout',
  standalone: true,
  imports: [RouterOutlet, PublicNavbarComponent],
  template: `
    <app-public-navbar />
    <main class="public-layout__main">
      <router-outlet />
    </main>
  `,
  styles: [`
    :host { display: block; }
    .public-layout__main { min-height: 100vh; }
  `],
})
export class PublicLayoutComponent {}
