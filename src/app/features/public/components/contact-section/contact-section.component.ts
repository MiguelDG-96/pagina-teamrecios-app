import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';

interface ContactForm {
  name: string;
  email: string;
  whatsapp: string;
  projectType: string;
  message: string;
}

@Component({
  selector: 'app-contact-section',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './contact-section.component.html',
})
export class ContactSectionComponent {
  form: ContactForm = {
    name: '',
    email: '',
    whatsapp: '',
    projectType: '',
    message: '',
  };

  isSubmitting = false;
  isSubmitted = false;

  readonly projectOptions = [
    'Desarrollo Web / E-commerce',
    'Aplicación Móvil (iOS / Android)',
    'Sistemas Web / Backend',
    'Landing Page / Portafolio',
    'Otros servicios de consultoría',
  ];

  onSubmit(): void {
    if (!this.form.name || !this.form.email || !this.form.message) {
      alert('Por favor, completa los campos requeridos.');
      return;
    }

    this.isSubmitting = true;

    // Simulate sending with a slight premium delay
    setTimeout(() => {
      this.isSubmitting = false;
      this.isSubmitted = true;

      // Reset the form
      this.form = {
        name: '',
        email: '',
        whatsapp: '',
        projectType: '',
        message: '',
      };

      // Hide success message after 5 seconds
      setTimeout(() => {
        this.isSubmitted = false;
      }, 5000);
    }, 1500);
  }
}
