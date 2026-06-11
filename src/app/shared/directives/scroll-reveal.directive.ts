import { Directive, ElementRef, OnInit, OnDestroy, Input } from '@angular/core';

@Directive({
  selector: '[appScrollReveal]',
  standalone: true
})
export class ScrollRevealDirective implements OnInit, OnDestroy {
  // Ej: 'reveal-up', 'reveal-left', etc. Por defecto fade hacia arriba.
  @Input('appScrollReveal') animationClass: string = 'reveal-up'; 
  @Input() delay: string = ''; // Ej: 'delay-100'

  private observer!: IntersectionObserver;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    // Evitar que falle en Server Side Rendering si aplica (para angular universal)
    if (typeof window === 'undefined') return;

    // 1. Añadimos estado inicial (oculto y desplazado)
    const element = this.el.nativeElement;
    
    // Si no se le pasa string explícito al usar la directiva sin asignar valor
    if (this.animationClass === '' || !this.animationClass) {
        this.animationClass = 'reveal-up';
    }

    element.classList.add('reveal-base', this.animationClass);
    if (this.delay) {
      element.classList.add(this.delay);
    }

    // 2. Configuramos el observador
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Entró en pantalla
          element.classList.add('is-visible');
          // Desconectar para que la animación se ejecute solo 1 vez
          this.observer.disconnect();
        }
      });
    }, {
      threshold: 0.05, // Se dispara cuando asoma un 5%
      rootMargin: '0px 0px -40px 0px' // Dispara la animación ligeramente antes de que se vea por completo
    });

    this.observer.observe(element);
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
