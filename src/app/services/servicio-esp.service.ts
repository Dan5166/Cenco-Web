import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ProductosService } from './productos.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { getFirestore } from 'firebase/firestore';
import firebase from 'firebase/compat/app'
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ServicioEspService {

  constructor(private db:AngularFirestore, private productoSVC:ProductosService, private storage:AngularFireStorage) {
  }
  
  async guardarPeticion(correoEmisor:string, asunto:string, id:string){
    const myObject = {
      name: correoEmisor,
      fecha: new Date().getDate() + "/" + (new Date().getMonth() +1) + "/" + new Date().getFullYear() + " " + new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds(),
      asunto: asunto
    };

    try{

      Swal.fire({
        icon:'success',
        title:'La petición se ha enviado correctamente',
        confirmButtonText:'Aceptar',
        allowOutsideClick:false,
      }).then((result)=>{

        if(result.value){
          let peticiones=[myObject];
          
        }

      })
      return this.db.collection('varios-servicio').doc(id).update({peticiones: firebase.firestore.FieldValue.arrayUnion(myObject)});

    }catch(error){
      console.log("NO FUNCIONA");
      console.log(error);
      return null;
    }
  }

  async guardarComentario(correoEmisor:string, contenido:string, id:string){
    
    const myObject = {
      name: correoEmisor,
      fecha: new Date().getDate() + "/" + (new Date().getMonth() +1) + "/" + new Date().getFullYear() + " " + new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds(),
      contenido: contenido
    };

    try{

      Swal.fire({
        icon:'success',
        title:'El comentario se ha subido correctamente',
        confirmButtonText:'Aceptar',
        allowOutsideClick:false,
      }).then((result)=>{

        if(result.value){
          let comentarios=[myObject];
          
        }

      })
      return this.db.collection('varios-servicio').doc(id).update({comentarios: firebase.firestore.FieldValue.arrayUnion(myObject)});

    }catch(error){
      console.log("NO FUNCIONA");
      console.log(error);
      return null;
    }




  }

}
