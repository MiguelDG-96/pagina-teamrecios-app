import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { RollingNumberComponent } from './rolling-number.component';

interface StatItem {
  icon: string;
  value: string;
  label: string;
}

@Component({
  selector: 'app-stats-section',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, RollingNumberComponent],
  templateUrl: './stats-section.component.html',
})
export class StatsSectionComponent {
  readonly stats: StatItem[] = [
    {
      icon: 'rocket',
      value: '+3',
      label: 'Proyectos completados',
    },
    {
      icon: 'users',
      value: '+15',
      label: 'Clientes satisfechos',
    },
    {
      icon: 'clock',
      value: '+20',
      label: 'Publicaciones automatizadas',
    },
    {
      icon: 'trending-up',
      value: '100%',
      label: 'Comprometidos con tu crecimiento',
    },
  ];
}
