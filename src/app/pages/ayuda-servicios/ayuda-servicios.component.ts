import { Component } from '@angular/core';

@Component({
  selector: 'app-ayuda-servicios',
  templateUrl: './ayuda-servicios.component.html',
  styleUrls: ['./ayuda-servicios.component.css']
})
export class AyudaServiciosComponent {
  productos = [
    {
      nombre: 'Asesoramiento de Amazon Lambda',
      descripcion: 'Servicio de Asesoramiento de Amazon Lambda, donde se le ayudará a configurar su servicio de AWS Lambda, para que pueda comenzar a utilizarlo de inmediato.',
      imagen: '../../../assets/dist/img/amazon-icono.png'
    },
    {
      nombre: 'Asesoramiento de Amazon Lambda',
      descripcion: 'Servicio de Asesoramiento de Amazon Lambda, donde se le ayudará a configurar su servicio de AWS Lambda, para que pueda comenzar a utilizarlo de inmediato.',
      imagen: '../../../assets/dist/img/AmazonLambda.png'
    },
    {
      nombre: 'Asesoramiento de Amazon Lambda',
      descripcion: 'Servicio de Asesoramiento de Amazon Lambda, donde se le ayudará a configurar su servicio de AWS Lambda, para que pueda comenzar a utilizarlo de inmediato.',
      imagen: '../../../assets/dist/img/AmazonLambda.png'
    },
    {
      nombre: 'Asesoramiento de Amazon Lambda',
      descripcion: 'Servicio de Asesoramiento de Amazon Lambda, donde se le ayudará a configurar su servicio de AWS Lambda, para que pueda comenzar a utilizarlo de inmediato.',
      imagen: '../../../assets/dist/img/AmazonLambda.png'
    },
  ];
}
