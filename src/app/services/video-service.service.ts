import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { FileItems } from '../models/file-items';
import { ProductoModel } from '../models/productos-model';

@Injectable({
  providedIn: 'root'
})
export class VideoServiceService {

  constructor() { }



  ObtenerVideo(){
    let url="";
    const storage=getStorage();
    const storageRef=ref(storage, `video/videoEjemplo.mp4`);
    getDownloadURL(storageRef).then((downloadUrl)=>{
      url = downloadUrl;}
    )
    return url;
  }

}
