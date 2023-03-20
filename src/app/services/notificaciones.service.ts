import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { FileItems } from '../models/file-items';
import { NotificacionModel } from '../models/notificacion-model';

declare var $:any;

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {

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


  

  cargarNotificacionesFirebase(imagenes:FileItems[], notificacion:NotificacionModel){
    const storage=getStorage();
    for(const item of imagenes){
      let notificacionTrim=notificacion.nombreNotificacion;

      //Extrae la referencia de storage no incluyendo en el nombre espacios.
      const storageRef=ref(storage, `${this.CARPETA_IMAGENES}/${notificacionTrim.replace(/ /g, "")}`);

      const uploadTask=uploadBytesResumable(storageRef,item.archivo);

      uploadTask.on('state_changed', (snapshot)=>{
        const progresss=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
      }, (err)=>{
        console.log("Error al subir el archivo");
      }, ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl)=>{
          item.url=downloadUrl;
          this.guardarNotificacion({nombreNotificacion:notificacion.nombreNotificacion, imgUrl:item.url, info:notificacion.info, usuarioResponsable:notificacion.usuarioResponsable, fechaSubido:notificacion.fechaSubido, linkArchivo:notificacion.linkArchivo, icono:notificacion.icono, iconoClass:notificacion.iconoClass});
        })
      })


    }
  }




  async guardarNotificacion(notificacion:{nombreNotificacion:string, imgUrl:string, info:string, usuarioResponsable:string, fechaSubido:string, linkArchivo:string, icono:string, iconoClass:string;}):Promise<any>{
    try{


      if(notificacion.imgUrl == null){
        console.log("IMG NULL")
        notificacion.imgUrl='../../../assets/noimage.png';
      }
      return await this.db.collection('notificaciones').add(notificacion);

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
