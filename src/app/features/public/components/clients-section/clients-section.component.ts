import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-clients-section',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  templateUrl: './clients-section.component.html',
  styleUrl: './clients-section.component.css'
})
export class ClientsSectionComponent {}
