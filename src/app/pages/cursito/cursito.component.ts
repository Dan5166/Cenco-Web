import { Component, OnInit } from '@angular/core';
import { VideoServiceService } from 'src/app/services/video-service.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';
import { ServicioEspService } from 'src/app/services/servicio-esp.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-cursito',
  templateUrl: './cursito.component.html',
  styleUrls: ['./cursito.component.css']
})
export class CursitoComponent implements OnInit{
  videoUrl: string = "https://firebasestorage.googleapis.com/v0/b/cenco-web-prot.appspot.com/o/video%2FvideoEjemplo2.mp4?alt=media&token=635a89cb-5954-41aa-a206-1fa56539ef70";
  videoRef: any;
  indice:string;
  nombreCurso:string = "Cargando...";
  imgUrl:string="../../assets/img/imagenEjemplo.jpg";
  info:string="Cargando...";
  curso: any;
  usuario:any;

  opcionSeleccionada: string = 'Ingresa tu caso...';
  botonDesactivado: boolean = true;

  comentario:string="";

  constructor(private videoService:VideoServiceService, private route:ActivatedRoute, private cursoSvc:CoursesService, private servicioEspSvc:ServicioEspService, private authSvc:AuthService){ 
    
    this.indice=this.route.snapshot.params['id'];
    this.cursoSvc.getCursito(this.indice).subscribe(data => {
      this.nombreCurso=data.nombre;
      this.imgUrl=data.imgUrl;
      this.curso=data;
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
      this.servicioEspSvc.guardarPeticion(this.usuario.email, seleccion, this.indice);
    });
  }

  vaciarComentario(){
    this.comentario="";
  }

  async guardarComentario(){
    const comentario = this.comentario;
    this.vaciarComentario();
    await this.authSvc.getCurrentUser().then(data => {
      this.usuario=data;
      this.servicioEspSvc.guardarComentario(this.usuario.email, comentario, this.indice);
    });
  }

  guardarCursoArchivosVarios(){
    this.cursoSvc.guardarCursoArchivosVarios(this.indice);
  }
}
