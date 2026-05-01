import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

interface StatItem {
  icon: string;
  value: string;
  label: string;
}

@Component({
  selector: 'app-stats-section',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './stats-section.component.html',
})
export class StatsSectionComponent {
  readonly stats: StatItem[] = [
    {
      icon: 'rocket',
      value: '+20',
      label: 'Proyectos completados',
    },
    {
      icon: 'users',
      value: '+15',
      label: 'Clientes satisfechos',
    },
    {
      icon: 'clock',
      value: '+200',
      label: 'Publicaciones automatizadas',
    },
    {
      icon: 'trending-up',
      value: '100%',
      label: 'Comprometidos con tu crecimiento',
    },
  ];
}
