import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent {
  cajaComentario = '';
  cajaNombre = '';



  comments = [
    {
      id: 1,
      name: 'Maryuris Torres',
      email: 'maryuris.torres@cencosud.cl',
      comment: 'Podrían agregar en CencoWeb una sección de comentarios para que recibamos feedback constante de los usuarios.',
      asunto: 'Mejora en la página web',
      foto: '../../../assets/dist/img/IconoUsuarioNoFotoMujer.png',
    },
    {
      id: 2,
      name: 'Danyael Vásquez',
      email: 'danyaelvasquez@cencosud.cl',
      comment: 'Podrían agregar en CencoWeb una sección de comentarios para que recibamos feedback constante de los usuarios.',
      asunto: 'Mejora en la página web',
      foto: '../../../assets/dist/img/IconoUsuarioNoFoto.png',
    },
  ]

  agregaComentario() {
    Swal.fire({
      icon:'question',
      title:`Desea publicar el comentario`,
      showCancelButton:true,
      cancelButtonText:'Cancelar',
      confirmButtonText:'Publicar',
      allowOutsideClick:false
    }).then((result)=>{
      if(result.isConfirmed){

        this.comments.push({
          id: 3,
          name: 'Danyael Vásquez',
          email: 'danyaelvasquez@cencosud.cl',
          comment: this.cajaComentario,
          asunto: this.cajaNombre,
          foto: '../../../assets/dist/img/IconoUsuarioNoFoto.png',
        });
        console.log(this.comments);
        Swal.fire({
          icon:'success',
          title:'El comentario se subió correctamente',
          confirmButtonText:'Aceptar',
          allowOutsideClick:false,
        }).then((result)=>{
  
          
  
        })



        
        
      }
    });


    
  }
}
