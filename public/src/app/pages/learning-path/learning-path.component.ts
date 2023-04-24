import { Component } from '@angular/core';

@Component({
  selector: 'app-learning-path',
  templateUrl: './learning-path.component.html',
  styleUrls: ['./learning-path.component.css']
})
export class LearningPathComponent {
  cursos=[
    {
      id:1,
      nombre:'Curso de Amazon Lambda I',
      descripcion:'Curso de Angular para principiantes',
      imagen:'../../../assets/dist/img/AmazonLambda.png',
      background1: 'background-color: #dd8b47; height: 250px; position: relative;',
      background2: 'background-color: #e0cabc; height: 250px; position: relative;',
    },
    {
      id:2,
      nombre:'Curso de Amazon Lambda I',
      descripcion:'Curso de Angular para principiantes',
      imagen:'../../../assets/dist/img/Amazon-S3-Logo.svg',
      background1: 'background-color: #c53333; height: 250px; position: relative;',
      background2: 'background-color: #e0bcbc; height: 250px; position: relative;',
    },
  ]

}
