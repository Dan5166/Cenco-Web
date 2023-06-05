import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-ayuda-servicios',
  templateUrl: './ayuda-servicios.component.html',
  styleUrls: ['./ayuda-servicios.component.css']
})
export class AyudaServiciosComponent implements OnInit{
  cajaComentario = '';
  cajaNombre = '';
  comments = [
    {
      id: 1,
      name: 'Asistente',
      email: 'asistant@cencosud.cl',
      comment: 'Porfavor describa su problema',
      asunto: 'Mejora en la página web',
      foto: '../../../assets/dist/img/IconoUsuarioNoFotoMujer.png',
    }
  ]

  async ngOnInit() {
    try {
      Swal.fire({
        title: 'Cargando página de ayuda...',
        html: 'Cargando ayuda.',
        didOpen: () => {
          Swal.showLoading();
        },
      }).then((result) => {
        console.log('close');
      });
      
      //how to make a delay in js
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.log(error);
    }
    Swal.close();
  }

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
