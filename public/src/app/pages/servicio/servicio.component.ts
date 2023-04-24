import { Component, OnInit } from '@angular/core';
import { VideoServiceService } from 'src/app/services/video-service.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from 'src/app/services/productos.service';
import { ServicioEspService } from 'src/app/services/servicio-esp.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.css']
})

export class ServicioComponent implements OnInit {
  videoUrl: string = "https://firebasestorage.googleapis.com/v0/b/cenco-web-prot.appspot.com/o/video%2FvideoEjemplo2.mp4?alt=media&token=635a89cb-5954-41aa-a206-1fa56539ef70";
  videoRef: any;
  indice:string;
  nombreProducto:string = "Cargando...";
  imgUrl:string="../../assets/img/imagenEjemplo.jpg";
  info:string="Cargando...";
  servicio: any;
  usuario:any;

  opcionSeleccionada: string = 'Ingresa tu caso...';
  botonDesactivado: boolean = true;

  comentario:string="";

  constructor(private videoService:VideoServiceService, private route:ActivatedRoute, private productoSVC:ProductosService, private servicioEspSvc:ServicioEspService, private authSvc:AuthService){ 
    
    this.indice=this.route.snapshot.params['id'];
    console.log("INDICE ACTUAL: "+this.indice);
    this.productoSVC.getProducto(this.indice).subscribe(data => {
      console.log("DATOS: "+data);
      console.log("DATA NOMBRE:  "+data.nombreProducto);
      this.nombreProducto=data.nombreProducto;
      console.log("DATA INFO:  "+data.info);
      this.info=data.info;
      console.log("DATA IMG:  "+data.imgUrl);
      this.imgUrl=data.imgUrl;
      this.servicio=data;
    });

    
  }
  


  ngOnInit(): void {
    
  }

  cambiarOpcion(event: any) {
    this.opcionSeleccionada = event.target.value;
    if (this.opcionSeleccionada === 'Ingresa tu caso...') {
      this.botonDesactivado = true;
    } else {
      this.botonDesactivado = false;
    }
  }

  obtenerSeleccion() {
    const selectElement = document.querySelector('#inputState') as HTMLSelectElement;
    const seleccion = selectElement.value;
    return seleccion;
  }

  async guardarPeticion(){
    const seleccion = this.obtenerSeleccion();
    await this.authSvc.getCurrentUser().then(data => {
      this.usuario=data;
      console.log("USUARIO: "+this.usuario);
      this.servicioEspSvc.guardarPeticion(this.usuario.email, seleccion, this.indice);
    });
  }

  vaciarComentario(){
    this.comentario="";
  }

  async guardarComentario(){
    console.log("COMENTARIO: "+this.comentario);
    const comentario = this.comentario;
    this.vaciarComentario();
    await this.authSvc.getCurrentUser().then(data => {
      this.usuario=data;
      console.log("USUARIO: "+this.usuario);
      this.servicioEspSvc.guardarComentario(this.usuario.email, comentario, this.indice);
    });
  }

  guardarproductoArchivosVarios(){
    this.productoSVC.guardarProductoArchivosVarios(this.indice);
  }
  





}
