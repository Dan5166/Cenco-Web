import { Component, HostListener, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-arquitectura-finanzas',
  templateUrl: './arquitectura-finanzas.component.html',
  styleUrls: ['./arquitectura-finanzas.component.css']
})
export class ArquitecturaFinanzasComponent implements AfterViewInit {
  @ViewChild('fadeElements', { static: false }) fadeElements: ElementRef;
  elements: any[];

  constructor() {
    this.elements = [];
  }

  ngAfterViewInit() {
    this.elements = this.fadeElements.nativeElement.querySelectorAll('.fade-in-element');
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.fadeInElements();
  }

  fadeInElements() {
    this.elements.forEach(element => {
      if (this.isElementInViewport(element)) {
        element.classList.add('show');
      }
    });
  }

  isElementInViewport(element: any): boolean {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
}
