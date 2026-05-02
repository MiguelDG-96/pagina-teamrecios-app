import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-public-footer',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './public-footer.component.html',
})
export class PublicFooterComponent {
  readonly currentYear = new Date().getFullYear();
}
