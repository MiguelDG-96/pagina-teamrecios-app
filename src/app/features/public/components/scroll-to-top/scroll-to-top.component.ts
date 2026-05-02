import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-scroll-to-top',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scroll-to-top.component.html',
})
export class ScrollToTopComponent {
  progress = 0;
  isVisible = false;
  readonly circumference = 2 * Math.PI * 18; // ~113.097

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    if (scrollHeight > 0) {
      this.progress = (scrollTop / scrollHeight) * 100;
    } else {
      this.progress = 0;
    }

    this.isVisible = scrollTop > 300;
  }

  get strokeDashoffset(): number {
    return this.circumference - (this.progress / 100) * this.circumference;
  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
