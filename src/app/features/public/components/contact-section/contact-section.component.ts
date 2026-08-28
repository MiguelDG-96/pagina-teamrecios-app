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
    if (!this.form.name || !this.form.message) {
      alert('Por favor, completa los campos requeridos.');
      return;
    }

    this.isSubmitting = true;

    const whatsappMessage = [
      '¡Hola Team Recios!',
      `Mi nombre es ${this.form.name},`,
      this.form.email && `mi correo ${this.form.email},`,
      this.form.whatsapp && `mi celular es ${this.form.whatsapp},`,
      this.form.projectType && `Tipo de proyecto de mi interés${this.form.projectType},`,
      `${this.form.message}.`,
    ]
      .filter((line): line is string => Boolean(line))
      .join('\n');

    window.open(
      `https://wa.me/51934634772?text=${encodeURIComponent(whatsappMessage)}`,
      '_blank',
      'noopener,noreferrer',
    );

    this.isSubmitting = false;
    this.isSubmitted = true;
    this.form = {
      name: '',
      email: '',
      whatsapp: '',
      projectType: '',
      message: '',
    };

    setTimeout(() => {
      this.isSubmitted = false;
    }, 5000);
  }
}
