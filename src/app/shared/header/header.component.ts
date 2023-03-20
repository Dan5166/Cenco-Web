import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificacionModel } from 'src/app/models/notificacion-model';
import { NotificacionesService } from 'src/app/services/notificaciones.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  notificacionEjemplo:NotificacionModel={
    order:1,
    nombreNotificacion:"Brad Diesel",
    imgUrl:"./assets/dist/img/user1-128x128.jpg",
    info:"Call me whenever you can...",
    usuarioResponsable:"CorreoResponsable@cencosud.com",
    fechaSubido:"08-03-2023",
    linkArchivo:"productos",
    icono:"fas fa-star",
    iconoClass:"float-right text-sm text-danger"
  }

  notificaciones:NotificacionModel[]=[
  ];
  constructor(private router:Router, private notificacionesSvc:NotificacionesService) { }

  ngOnInit(): void {
    this.notificacionesSvc.getNotificaciones().subscribe(res=>{
      this.notificaciones=[];
      res.forEach((element:NotificacionModel)=>{
        this.notificaciones.push({
          ...element
        })
      })
      console.log("Notificaciones Inicales:  ");
      console.log(this.notificaciones)
    });
  }


  registrarNotificacionManualmente(){
    //Si quiero hacer notificaciones personalizadas debo seguir lo que dice productos.component.ts en registrarProducto()
    let cargaNotificacion:any={
      nombreProducto:this.notificacionEjemplo.nombreNotificacion,
      info:this.notificacionEjemplo.info,
    }


    //this.notificacionesSvc.cargarProductosFirebase(this.imagenes, cargaNotificacion);
    //this.limpiarForm();
  }


  eliminar(id:any, productoNombre:string, indice:number){

    Swal.fire({
      icon:'question',
      title:`Desea eliminar el producto ${productoNombre}`,
      showCancelButton:true,
      confirmButtonText:'Aceptar',
      allowOutsideClick:false
    }).then((result)=>{
      if(result.isConfirmed){
        this.notificacionesSvc.eliminarNotificacion(id, productoNombre);
        
        this.notificaciones.splice(indice, 1);
        console.log("nuevo arreglo: "+this.notificaciones);
      }
    });
  }

}
