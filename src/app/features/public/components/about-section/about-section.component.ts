import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

interface TechIcon {
  name: string;
  iconUrl: string;
}

interface Founder {
  name: string;
  role: string;
  education: string;
  description: string;
  image: string;
  skills: string[];
  techStack: TechIcon[];
}

@Component({
  selector: 'app-about-section',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './about-section.component.html',
})
export class AboutSectionComponent {
  readonly visibleSkills = signal<Record<string, boolean>>({});

  toggleSkills(name: string) {
    this.visibleSkills.update(v => ({
      ...v,
      [name]: !v[name]
    }));
  }

  readonly founders: Founder[] = [
    {
      name: 'Miguel Angel Dolic Grández',
      role: 'CEO & Fundador',
      education: 'Ingeniería de Sistemas por la Universidad Nacional de San Martín',
      description: 'Frontend Specialist orientado a construir productos digitales con propósito. Combino diseño, arquitectura y lógica de negocio para desarrollar interfaces modernas, eficientes y alineadas a objetivos reales. Más que desarrollar interfaces, diseño la “columna vertebral” visual y funcional del sistema, asegurando que cada componente tenga impacto en la experiencia del usuario y en el crecimiento del negocio.',
      image: '/img/fundadores/madg.png',
      skills: ['Desarrollo de Software', 'Innovación Tecnológica', 'Gestión de Proyectos'],
      techStack: [
        { name: 'Figma', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg' },
        { name: 'Angular', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angular/angular-original.svg' },
        { name: 'TypeScript', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
        { name: 'Laravel', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg' },
        { name: 'Tailwind CSS', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
      ],
    },
    {
      name: 'Nixon Herrera Fernández',
      role: 'CEO & Co-fundador',
      education: 'Ingeniería de Sistemas por la Universidad Nacional de San Martín',
      description: 'Experto en el diseño de bases de datos y modelado de la lógica del negocio. Siempre en constante aprendizaje, es un verdadero apasionado por la inteligencia artificial y el uso de herramientas de vanguardia.',
      image: '/img/fundadores/nixon-gay.png',
      skills: ['Bases de Datos', 'Lógica del Negocio', 'Inteligencia Artificial'],
      techStack: [
        { name: 'MySQL', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg' },
        { name: 'GitHub', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg' },
        { name: 'SQL', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original-wordmark.svg' },
        { name: 'Java', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg' },
        { name: 'Spring Boot', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg' },
        { name: '.NET', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dotnetcore/dotnetcore-original.svg' },
      ],
    },
  ];
}
