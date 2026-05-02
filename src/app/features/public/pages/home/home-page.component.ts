import { Component } from '@angular/core';
import { HeroSectionComponent } from '../../components/hero-section/hero-section.component';
import { ServicesSectionComponent } from '../../components/services-section/services-section.component';
import { StatsSectionComponent } from '../../components/stats-section/stats-section.component';
import { AboutSectionComponent } from '../../components/about-section/about-section.component';
import { WhyUsSectionComponent } from '../../components/why-us-section/why-us-section.component';
import { ContactSectionComponent } from '../../components/contact-section/contact-section.component';
import { PublicFooterComponent } from '../../components/public-footer/public-footer.component';
import { ScrollToTopComponent } from '../../components/scroll-to-top/scroll-to-top.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    HeroSectionComponent,
    ServicesSectionComponent,
    StatsSectionComponent,
    AboutSectionComponent,
    WhyUsSectionComponent,
    ContactSectionComponent,
    PublicFooterComponent,
    ScrollToTopComponent,
  ],
  template: `
    <app-hero-section />
    <app-services-section />
    <app-stats-section />
    <app-about-section />
    <app-why-us-section />

    <section id="technologies"
      class="min-h-screen bg-[#020617] flex items-center justify-center px-6 py-24">
      <p class="text-gray-500 text-sm">Sección Tecnologías — próximamente</p>
    </section>

    <app-contact-section />

    <app-public-footer />

    <app-scroll-to-top />
  `,
})
export class HomePageComponent {}
