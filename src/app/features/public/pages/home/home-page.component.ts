import { Component } from '@angular/core';
import { HeroSectionComponent } from '../../components/hero-section/hero-section.component';
import { ServicesSectionComponent } from '../../components/services-section/services-section.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [HeroSectionComponent, ServicesSectionComponent],
  template: `
    <app-hero-section />
    <app-services-section />

    <section id="about"
      class="min-h-screen bg-[#000004] flex items-center justify-center px-6 py-24">
      <p class="text-gray-500 text-sm">Sección Sobre Nosotros — próximamente</p>
    </section>

    <section id="technologies"
      class="min-h-screen bg-[#020617] flex items-center justify-center px-6 py-24">
      <p class="text-gray-500 text-sm">Sección Tecnologías — próximamente</p>
    </section>

    <section id="contact"
      class="min-h-screen bg-[#000004] flex items-center justify-center px-6 py-24">
      <p class="text-gray-500 text-sm">Sección Contacto — próximamente</p>
    </section>
  `,
})
export class HomePageComponent {}
