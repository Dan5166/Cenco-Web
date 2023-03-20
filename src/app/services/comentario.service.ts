import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { ComentariosModel } from '../models/comentarios-model';
@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  private comentariosCollection: AngularFirestoreCollection<ComentariosModel>;

  constructor(private db:AngularFirestore) { 
    this.comentariosCollection=db.collection<ComentariosModel>('comentarios');
  }
    async guardarComentario(comentario:{asunto:string,comment:string, usuarioResponsable:string, fechaSubido:string;}):Promise<any>{
      try{
        Swal.fire('EXITO','Comentario añadido con exito','success');
        return await this.db.collection('comentarios').add(comentario);
  
      }catch(error){
        console.log("NO FUNCIONA------------------------------------");
  
        console.log(error);
      }
    }
}