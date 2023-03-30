import { Component, OnInit } from '@angular/core';
import { VideoServiceService } from 'src/app/services/video-service.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from 'src/app/services/productos.service';

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

  constructor(private videoService:VideoServiceService, private route:ActivatedRoute, private productoSVC:ProductosService) { 
    
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



}
