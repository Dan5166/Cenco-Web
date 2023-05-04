import { Component } from '@angular/core';

@Component({
  selector: 'app-cms',
  template: '<h1>Contenido de CMS</h1>',
  styleUrls: ['./cms.component.css']
})
export class CmsComponent {
  asuntoContacto = '';
  infoContacto = '';

  constructor() { }
}
