import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from "lucide-angular";

interface Feature {
  id: string;
  title: string;
  description: string;
  iconPath: string;
}

@Component({
  selector: 'app-why-us-section',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './why-us-section.component.html',
})
export class WhyUsSectionComponent {
  readonly features: Feature[] = [
    {
      id: 'focus',
      title: 'Enfoque en tus objetivos',
      description: 'Entendemos tu negocio y creamos soluciones que generan resultados.',
      iconPath: 'target',
    },
    {
      id: 'tech',
      title: 'Tecnología que impulsa',
      description: 'Usamos las mejores herramientas para construir soluciones robustas y modernas.',
      iconPath: 'bolt',
    },
    {
      id: 'security',
      title: 'Seguridad y calidad',
      description: 'Código limpio, buenas prácticas y seguridad en cada línea de código.',
      iconPath: 'shield',
    },
    {
      id: 'support',
      title: 'Acompañamiento real',
      description: 'No solo desarrollamos, te acompañamos en todo el proceso.',
      iconPath: 'headphones',
    },
  ];
}
