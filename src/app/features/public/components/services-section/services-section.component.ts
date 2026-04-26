import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

interface ServiceFeature {
  icon: string;
  title: string;
  description: string;
  accent: string;
  features: string[];
  image: string;
}

@Component({
  selector: 'app-services-section',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './services-section.component.html',
})
export class ServicesSectionComponent {
  readonly services: ServiceFeature[] = [
    {
      icon: 'code',
      title: 'Desarrollo de Software',
      accent: 'a la medida',
      description: 'Creamos soluciones de software personalizadas que se adaptan a los procesos de tu negocio, escalables, seguras y eficientes.',
      features: [
        'Sistemas Web y Móviles',
        'Aplicaciones Empresariales',
        'Integraciones y APIs',
        'Soporte y Mantenimiento'
      ],
      image: '/img/services/desarrollo-software.webp'
    },
    {
      icon: 'calendar',
      title: 'Automatización de',
      accent: 'publicaciones',
      description: 'Automatizamos tus publicaciones en redes sociales para que mantengas presencia, ahorres tiempo y llegues a más clientes.',
      features: [
        'Programación automática',
        'Multi-plataforma',
        'Contenido inteligente',
        'Reportes y analíticas'
      ],
      image: '/img/services/automatizacion.webp'
    },
    {
      icon: 'video',
      title: 'Creación de publicidad',
      accent: 'con videos',
      description: 'Creamos videos publicitarios profesionales con After Effects que destacan tu negocio y atraen nuevos clientes.',
      features: [
        'Videos publicitarios impactantes',
        'Animaciones profesionales',
        'Diseño con After Effects',
        'Más visualizaciones, más clientes'
      ],
      image: '/img/services/creacion-videos.webp'
    }
  ];
}
