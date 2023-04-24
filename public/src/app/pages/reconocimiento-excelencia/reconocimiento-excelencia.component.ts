import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reconocimiento-excelencia',
  templateUrl: './reconocimiento-excelencia.component.html',
  styleUrls: ['./reconocimiento-excelencia.component.css']
})
export class ReconocimientoExcelenciaComponent {
  cajaComentario = '';
  cajaNombre = '';



  comments = [
    {
      id: 1,
      namePF: 'Maryuris Torres',
      nameEmisor: 'Danyael Vásquez',
      email: 'maryuris.torres@cencosud.cl',
      comment: 'Alegrar siempre el día con su energía y buen humor.',
      asunto: 'Agradecimiento.',
      foto: '../../../assets/dist/img/IconoUsuarioNoFotoMujer.png',
    },
    {
      id: 2,
      namePF: 'Joaquín Fernandez',
      nameEmisor: 'Maryuris Torres',
      email: 'danyaelvasquez@cencosud.cl',
      comment: 'Agregó secciones útiles en CencoWeb.',
      asunto: 'Reconocimiento',
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
          namePF: 'Danyael Vásquez',
          nameEmisor: 'Maryuris Torres',
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
