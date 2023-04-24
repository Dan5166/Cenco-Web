import { Injectable } from '@angular/core';
import { DocsModel } from '../models/docs-model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage, AngularFireStorageModule } from '@angular/fire/compat/storage';
import { Observable, map, of, pluck, switchMap, take } from 'rxjs';
import { FileItems } from '../models/file-items';
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';

import Swal from 'sweetalert2';
import { ProductosService } from './productos.service';
import { ProductoModel } from '../models/productos-model';

declare var $:any;

@Injectable({
  providedIn: 'root'
})
export class DocsService {

  private CARPETA_DOCS='docs';
  private productosCollection: AngularFirestoreCollection<DocsModel>;
  public uploadPercent:number=0;

  constructor(private db:AngularFirestore, private productoSVC:ProductosService, private storage:AngularFireStorage) { 

    this.productosCollection=db.collection<DocsModel>('productos');
    console.log("Productos: "+this.productosCollection);

  }


  getProductos():Observable<DocsModel[]>{
    return this.productosCollection.snapshotChanges().pipe(
      map(actions=>actions.map(a=>{
        const data=a.payload.doc.data() as DocsModel;
        data.id=a.payload.doc.id;
        const id =a.payload.doc.id;
        console.log("DATOS:       "+data);
        return {id, ...data}
      }))
    )
  }


  getProducto(id:string): Observable<DocsModel> {
    return this.db.collection('productos').doc(id).valueChanges() as Observable<DocsModel>;
}


  cargarProductosFirebase(pdf:FileItems[], docs:DocsModel, llaveServicio:string, tipo:number){
    const storage=getStorage();
    let arregloUrls:string[]=[];
    let itemurl:string;
    for(const item of pdf){
      let docsTrim=docs.nombre;
      let storageRef=ref(storage, `${this.CARPETA_DOCS}/${llaveServicio}/pdf/${docsTrim.replace(/ /g, "-")}`);

      //Extrae la referencia de storage no incluyendo en el nombre espacios.
      if(tipo==0){
        storageRef=ref(storage, `${this.CARPETA_DOCS}/${llaveServicio}/pdf/${docsTrim.replace(/ /g, "-")}`);
      }
      else if(tipo==1){
        storageRef=ref(storage, `${this.CARPETA_DOCS}/${llaveServicio}/video/${docsTrim.replace(/ /g, "-")}`);
      }
      else{
        storageRef=ref(storage, `${this.CARPETA_DOCS}/${llaveServicio}/pdf/${docsTrim.replace(/ /g, "-")}`);
      }

      const uploadTask=uploadBytesResumable(storageRef,item.archivo);

      
      uploadTask.on('state_changed', (snapshot)=>{
        const progresss=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
      }, (err)=>{
        console.log("Error al subir el archivo");
      }, ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl)=>{
          item.url=downloadUrl;
          arregloUrls.push(item.url);
          itemurl=item.url;
          //this.guardarDocs({arregloUrls, info:docs.info, linkVideo:docs.linkVideo}, llaveServicio);
          this.agregarUrlDocumentacionColeccion(llaveServicio, itemurl, tipo);

          try{

            Swal.fire({
              icon:'success',
              title:'El archivo se subió correctamente',
              confirmButtonText:'Aceptar',
              allowOutsideClick:false,
            }).then((result)=>{
      
              if(result.value){
                $('#docsModal').modal('hide');
                $('#videoModal').modal('hide');
              }
      
            })
      
          }catch(error){
            console.log("NO FUNCIONA");
            console.log(error);
          }



        })
      })


    }
    
  }




  async guardarDocs(docs:{arregloUrls:string[], info:string, linkVideo:string},indice:string):Promise<any>{
    try{

      Swal.fire({
        icon:'success',
        title:'El archivo se subió correctamente',
        confirmButtonText:'Aceptar',
        allowOutsideClick:false,
      }).then((result)=>{

        if(result.value){
          $('#docsModal').modal('hide');
          $('#videoModal').modal('hide');
        }

      })
      if(docs.arregloUrls.length==0){
        console.log("PDF NULL")
        docs.arregloUrls.push("");
      }
      return ((await this.db.collection('docs').doc(indice).set({})));

    }catch(error){
      console.log("NO FUNCIONA");
      console.log(error);
    }

  }





  public eliminarDoc(llaveServicio:string, docsNombre:string, tipo:number){
    //recibir el array de pdfs
    let listaPdf=[""];

    this.getProducto(llaveServicio).subscribe(data => {
      listaPdf=data.docsPdf;
    });

    
    const productoRef = this.db.collection<ProductoModel>('productos').doc(llaveServicio);
    this.db.collection<ProductoModel>('productos').doc(llaveServicio).get().pipe(
      take(1),
      switchMap((doc) => {
        let data = doc.data();
        let pdfs = data?.docsPdf || [];
        let video = data?.docsVideo || [];
        const indiceDelElemento = pdfs.indexOf(docsNombre);
        const indiceDelElementoVideo = video.indexOf(docsNombre);

        if (indiceDelElemento > -1 && tipo==0) {
          pdfs.splice(indiceDelElemento, 1);
          return productoRef.update({docsPdf: pdfs});
        }
        else if(indiceDelElementoVideo > -1 && tipo==1){
          video.splice(indiceDelElementoVideo, 1);
          return productoRef.update({docsVideo: video});
        }
        else{
          return of(null);
        }
      })
    ).subscribe({
        next: () => {
            console.log('Documento eliminado con éxito');
        },
        error: (error) => {
            console.log('Error al eliminar documento:', error);
        }
    });
  }




  editarProducto(id:string, docsNombre:string, itemurlNueva:string){
    //recibir el array de pdfs
    let listaPdf=[""];

    this.getProducto(id).subscribe(data => {
      listaPdf=data.docsPdf;
    });

    
    const productoRef = this.db.collection<ProductoModel>('productos').doc(id);
    this.db.collection<ProductoModel>('productos').doc(id).get().pipe(
      take(1),
      switchMap((doc) => {
        let data = doc.data();
        let pdfs = data?.docsPdf || [];
        const indiceDelElemento = pdfs.indexOf(docsNombre);

        if (indiceDelElemento > -1) {
          pdfs[indiceDelElemento]=itemurlNueva;
        }
        return productoRef.update({docsPdf: pdfs});
      })
    ).subscribe({
        next: () => {
            console.log('Documento actualizado con éxito');
        },
        error: (error) => {
            console.log('Error al actualizar documento:', error);
        }
    });




  }




  agregarUrlDocumentacionColeccion(id:string, itemurl:string, tipo:number){
    //recibir el array de pdfs
    let listaPdf=[""];

    this.getProducto(id).subscribe(data => {
      listaPdf=data.docsPdf;
    });

    
    const productoRef = this.db.collection<ProductoModel>('productos').doc(id);
    this.db.collection<ProductoModel>('productos').doc(id).get().pipe(
      take(1),
      switchMap((doc) => {
        let data = doc.data();
        let pdfs = data?.docsPdf || [];
        let videos = data?.docsVideo || [];
        
        if(tipo==1){
          console.log("----------------------NUEVO VIDEO CHAVALES------------------"+pdfs);
          videos.push(itemurl);
          return productoRef.update({docsVideo: videos});
        }
        else{
          console.log("----------------------NUEVO PDF CHAVALES------------------"+itemurl);
          pdfs.push(itemurl);
          return productoRef.update({docsPdf: pdfs});
        }
        
      })
    ).subscribe({
        next: () => {
            console.log('Documento actualizado con éxito');
        },
        error: (error) => {
            console.log('Error al actualizar documento:', error);
        }
    });




  }
}