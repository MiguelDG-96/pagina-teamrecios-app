import { Component, signal, HostListener, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

interface NavLink {
  label: string;
  route: string;
  fragment?: string;
}

@Component({
  selector: 'app-public-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule],
  templateUrl: './public-navbar.component.html',
  styleUrl: './public-navbar.component.css',
})
export class PublicNavbarComponent implements OnInit {
  readonly navLinks = signal<NavLink[]>([
    { label: 'Inicio',          route: '/',          fragment: 'hero' },
    { label: 'Servicios',       route: '/',          fragment: 'services' },
    { label: 'Sobre Nosotros',  route: '/',          fragment: 'about' },
    { label: 'Clientes',        route: '/',          fragment: 'clients' },
    { label: 'Contacto',        route: '/',          fragment: 'contact' },
  ]);

  readonly isScrolled   = signal(false);
  readonly isMobileOpen = signal(false);
  readonly activeSection = signal('hero');

  ngOnInit(): void {
    this.checkScroll();
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.checkScroll();
  }

  private checkScroll(): void {
    this.isScrolled.set(window.scrollY > 20);
  }

  toggleMobileMenu(): void {
    this.isMobileOpen.update(v => !v);
  }

  closeMobileMenu(): void {
    this.isMobileOpen.set(false);
  }

  scrollToSection(fragment: string | undefined): void {
    if (!fragment) return;
    this.closeMobileMenu();
    const el = document.getElementById(fragment);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
