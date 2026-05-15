import { Component, inject, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { HeroSectionComponent } from '../../components/hero-section/hero-section.component';
import { ServicesSectionComponent } from '../../components/services-section/services-section.component';
import { StatsSectionComponent } from '../../components/stats-section/stats-section.component';
import { AboutSectionComponent } from '../../components/about-section/about-section.component';
import { WhyUsSectionComponent } from '../../components/why-us-section/why-us-section.component';
import { ContactSectionComponent } from '../../components/contact-section/contact-section.component';
import { ClientsSectionComponent } from '../../components/clients-section/clients-section.component';
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
    ClientsSectionComponent,
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
    <app-clients-section />
    <app-contact-section />
    <app-public-footer />
    <app-scroll-to-top />
  `,
})
export class HomePageComponent implements OnInit {
  private title = inject(Title);
  private meta = inject(Meta);

  ngOnInit(): void {
    this.title.setTitle('Team Recios | Desarrollo Web y Apps Móviles');
    this.meta.updateTag({ 
      name: 'description', 
      content: 'Expertos en transformar ideas en productos digitales de alto impacto. Desarrollo web, aplicaciones móviles y automatización para tu negocio.' 
    });
    
    // Open Graph
    this.meta.updateTag({ property: 'og:title', content: 'Team Recios | Soluciones Digitales' });
    this.meta.updateTag({ property: 'og:image', content: '/img/logo/logo.png' });
  }
}
