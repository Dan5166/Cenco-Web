import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { map, Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { ContactoRapidoModel } from '../models/contacto-rapido-model';
import { FileItems } from '../models/file-items';
import { NotificacionModel } from '../models/notificacion-model';

@Injectable({
  providedIn: 'root'
})
export class ContactoRapidoService {


  private CARPETA_IMAGENES='img';
  private notificacionesCollection: AngularFirestoreCollection<NotificacionModel>;

  constructor(private db:AngularFirestore) { 

    this.notificacionesCollection=db.collection<NotificacionModel>('notificaciones');

  }


  getNotificaciones():Observable<NotificacionModel[]>{
    return this.notificacionesCollection.snapshotChanges().pipe(
      map(actions=>actions.map(a=>{
        const data=a.payload.doc.data() as NotificacionModel;
        const id =a.payload.doc.id;
        return {id, ...data}
      }))
    )
  }


  

  cargarContactoFirebase(contactoRapido:ContactoRapidoModel){
    this.guardarContactoRapido({asuntoContacto:contactoRapido.asuntoContacto, info:contactoRapido.info, usuarioResponsable:contactoRapido.usuarioResponsable, fechaSubido:contactoRapido.fechaSubido});
  }




  async guardarContactoRapido(contactoRapido:{asuntoContacto:string, info:string, usuarioResponsable:string, fechaSubido:string}):Promise<any>{
    try{

      return this.db.collection('contacto-rapido').add(contactoRapido);

    }catch(error){
      console.log("NO FUNCIONA------------------------------------");
      





      console.log(error);
    }
  }

  public eliminarNotificacion(id:string, notificacionNombre:string):Promise<any>{
    const storage = getStorage();
    const desertRef = ref(storage, `${this.CARPETA_IMAGENES}/${notificacionNombre.replace(/ /g, "")}`);
    deleteObject(desertRef).then(()=>{
      Swal.fire('EXITO','El servicio se eliminó correctamente','success');
    }).catch((error)=>{
      console.error(error);
    });
    return this.notificacionesCollection.doc(id).delete();
  }



  editar(id:string, notificacion:NotificacionModel):Promise<any>{
    return this.notificacionesCollection.doc(id).update(notificacion);
  }
}
