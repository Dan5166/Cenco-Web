import { Component } from '@angular/core';
import { timeStamp } from 'console';
import { NominaAAlguienService } from 'src/app/services/nomina-a-alguien.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nomina-a-alguien',
  templateUrl: './nomina-a-alguien.component.html',
  styleUrls: ['./nomina-a-alguien.component.css']
})
export class NominaAAlguienComponent {
  nominado="";
  info="Si";
  fecha="Hoy";
  usuarioResponsable="Juanito";

  constructor(private nominaAAlguienSV:NominaAAlguienService) { 
  }
  nominaAAlguien(){
    let nominado={
      nominado:this.nominado,
      info:'Cliente siempre primero',
      usuarioResponsable:this.usuarioResponsable,
      fechaSubido:this.fecha
    }


    Swal.fire({
      icon:'question',
      title:`Desea publicar el comentario`,
      showCancelButton:true,
      cancelButtonText:'Cancelar',
      confirmButtonText:'Publicar',
      allowOutsideClick:false
    }).then((result)=>{
      if(result.isConfirmed){
        const fecha = new Date();
        nominado.fechaSubido=fecha.toString();

        this.nominaAAlguienSV.guardarNomina(nominado);
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
