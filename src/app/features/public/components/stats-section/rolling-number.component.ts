import { Component, Input, OnInit, signal, effect, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rolling-number',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-center overflow-hidden h-[1.1em] leading-[1.1em]">
      <span *ngIf="prefix" class="mr-0.5">{{ prefix }}</span>
      
      <div *ngFor="let digit of digits; let i = index" 
           class="relative w-[0.65em] h-[1.1em] overflow-hidden">
        <div class="rolling-wheel"
             [class.animated]="animated"
             [style.transform]="'translateY(-' + (animated ? digit : 0) * 10 + '%)'">
          <span *ngFor="let n of [0,1,2,3,4,5,6,7,8,9]" 
                class="flex items-center justify-center h-[1.1em] w-full select-none">
            {{ n }}
          </span>
        </div>
      </div>
      
      <span *ngIf="suffix" class="ml-0.5">{{ suffix }}</span>
    </div>
  `,
  styles: [`
    :host {
      display: inline-block;
      vertical-align: middle;
    }
    .rolling-wheel {
      display: flex;
      flex-direction: column;
      transition: transform 3s cubic-bezier(0.12, 0, 0.39, 0); /* Start slow */
    }
    .rolling-wheel.animated {
      transition: transform 3s cubic-bezier(0.19, 1, 0.22, 1); /* End with smooth bounce/deceleration */
    }
  `]
})
export class RollingNumberComponent implements OnInit, AfterViewInit {
  @Input() value: string = '';
  
  prefix = '';
  suffix = '';
  digits: number[] = [];
  animated = false;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    const match = this.value.match(/^(\D*)(\d+)(\D*)$/);
    if (match) {
      this.prefix = match[1];
      this.digits = match[2].split('').map(Number);
      this.suffix = match[3];
    }
  }

  ngAfterViewInit() {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setTimeout(() => {
          this.animated = true;
        }, 100);
        observer.disconnect();
      }
    }, { threshold: 0.1 });

    observer.observe(this.el.nativeElement);
  }
}
