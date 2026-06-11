import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';

interface HeroStat {
  icon: string;
  label: string;
}

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [LucideAngularModule, ScrollRevealDirective],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.css',
})
export class HeroSectionComponent {
  readonly stats: HeroStat[] = [
    { icon: 'code',        label: 'Soluciones Personalizadas' },
    { icon: 'zap',         label: 'Automatización Inteligente' },
    { icon: 'trending-up', label: 'Resultados Reales' },
    { icon: 'shield-check',label: 'Soporte Continuo' },
  ];

  scrollToSection(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
