import { OnInit, Component, HostListener, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import OrgChart from '@balkangraph/orgchart.js';

@Component({
  selector: 'app-arquitecturas',
  templateUrl: './arquitecturas.component.html',
  styleUrls: ['./arquitecturas.component.css']
})
export class ArquitecturasComponent implements AfterViewInit,  OnInit{
  @ViewChild('fadeElements', { static: false }) fadeElements: ElementRef;
  elements: any[];
  
  constructor() {
    this.elements = [];
  }
  ngOnInit() {
    const tree = document.getElementById('tree');
    if (tree) {
        var chart = new OrgChart(tree, {
            nodeBinding: {
            field_0: "name",
            img_0: "img"
            },
            mouseScrool: OrgChart.action.none,
            enableDragDrop: true,
            toolbar: {
              layout: true,
              zoom: true,
            //  fit: true,
              expandAll: true
          },
        });

         chart.load([
            { id: 1, name: "Denny Curtis", title: "CEO", img: "https://cdn.balkan.app/shared/2.jpg" },
            { id: 2, pid: 1, name: "Ashley Barnett", title: "Sales Manager", img: "https://cdn.balkan.app/shared/3.jpg" },
            { id: 3, pid: 1, name: "Caden Ellison", title: "Dev Manager", img: "https://cdn.balkan.app/shared/4.jpg" },
            { id: 4, pid: 2, name: "Elliot Patel", title: "Sales", img: "https://cdn.balkan.app/shared/5.jpg" },
            { id: 5, pid: 2, name: "Lynn Hussain", title: "Sales", img: "https://cdn.balkan.app/shared/6.jpg" },
            { id: 6, pid: 3, name: "Tanner May", title: "Developer", img: "https://cdn.balkan.app/shared/7.jpg" },
            { id: 7, pid: 3, name: "Fran Parsons", title: "Developer", img: "https://cdn.balkan.app/shared/8.jpg" }
        ]);
    }

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