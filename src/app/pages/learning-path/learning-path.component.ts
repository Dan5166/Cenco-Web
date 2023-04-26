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
      imagen:'../../../assets/dist/img/AmazonLambda.png'
    },
    {
      id:2,
      nombre:'Curso de Amazon Lambda I',
      descripcion:'Curso de Angular para principiantes',
      imagen:'../../../assets/dist/img/Amazon-S3-Logo.svg'
    },
  ]

}
