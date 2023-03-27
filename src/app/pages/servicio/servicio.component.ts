import { Component, OnInit } from '@angular/core';
import { VideoServiceService } from 'src/app/services/video-service.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.css']
})

export class ServicioComponent implements OnInit {
  videoUrl: string = "https://firebasestorage.googleapis.com/v0/b/cenco-web-prot.appspot.com/o/video%2FvideoEjemplo2.mp4?alt=media&token=635a89cb-5954-41aa-a206-1fa56539ef70";
  videoRef: any;

  constructor(private videoService:VideoServiceService) { 
    
    
    
  }

  ngOnInit(): void {
    
  }



}
