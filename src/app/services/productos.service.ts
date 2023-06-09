import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { Observable, of } from 'rxjs';
import { catchError, filter, first, map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { FileItems } from '../models/file-items';
import { ProductoModel } from '../models/productos-model';

declare var $:any;


@Injectable({
  providedIn: 'root'
})
export class ProductosService {


  private CARPETA_IMAGENES='img';
  private productosCollection: AngularFirestoreCollection<ProductoModel>;

  constructor(private db:AngularFirestore) { 

    this.productosCollection=db.collection<ProductoModel>('productos');

  }


  getProductos():Observable<ProductoModel[]>{
    return this.productosCollection.snapshotChanges().pipe(
      map(actions=>actions.map(a=>{
        const data=a.payload.doc.data() as ProductoModel;
        data.id=a.payload.doc.id;
        const id =a.payload.doc.id;
        return {id, ...data}
      }))
    )
  }


  getProducto(id:string): Observable<ProductoModel> {
    return this.db.collection('productos').doc(id).valueChanges() as Observable<ProductoModel>;
  }


  async cargarProductosFirebase(imagenes:FileItems[], productos:ProductoModel): Promise<any>{
    const storage=getStorage();
    for(const item of imagenes){
      let productoTrim=productos.nombreProducto;

      //Extrae la referencia de storage no incluyendo en el nombre espacios.
      const storageRef=ref(storage, `${this.CARPETA_IMAGENES}/${productoTrim.replace(/ /g, "")}`);

      const uploadTask=uploadBytesResumable(storageRef,item.archivo);

      uploadTask.on('state_changed', (snapshot)=>{
        const progresss=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
      }, (err)=>{
      }, ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl)=>{
          item.url=downloadUrl;
          this.guardarProducto({nombreProducto:productos.nombreProducto, imgUrl:item.url, info:productos.info, docs:productos.docsPdf, responsables:productos.responsables});
          return downloadUrl;
        })
      })


    }
  }

  



  async guardarProducto(producto:{nombreProducto:string, imgUrl:string, info:string, docs:string[], responsables:string[]}):Promise<any>{
    try{

      Swal.fire({
        icon:'success',
        title:'El archivo se subió correctamente',
        confirmButtonText:'Aceptar',
        allowOutsideClick:false,
      }).then((result)=>{

        if(result.value){
          $('#productosModal').modal('hide');
        }

      })
      if(producto.imgUrl == null){

        producto.imgUrl='../../../assets/noimage.png';
      }
      
      let idProductoPromise = await this.db.collection('productos').add(producto);
      let idProducto = idProductoPromise.id;
      return await this.guardarProductoArchivosVarios(idProducto);

    }catch(error){

      





      console.log(error);
    }
  }

  async guardarProductoArchivosVarios(id:string){
    let producto={};
    this.db.collection('varios-servicio').doc(id).set({});
  }

  public eliminarProducto(id:string, productoNombre:string):Promise<any>{
    const storage = getStorage();
    const desertRef = ref(storage, `${this.CARPETA_IMAGENES}/${productoNombre.replace(/ /g, "")}`);
    deleteObject(desertRef).then(()=>{
      Swal.fire('EXITO','El servicio se eliminó correctamente','success');
    }).catch((error)=>{
      console.error(error);
    });
    return this.productosCollection.doc(id).delete();
  }



  editarProducto(id:string, producto:ProductoModel):Promise<any>{

    return this.productosCollection.doc(id).update(producto);

  }

  async guardarFotoEditada(id:string, nombre:string, imagenes:FileItems[], info:string){
    const storage=getStorage();
    let imgURL="../../../assets/noimage.png";

    for(const item of imagenes){
      let productoTrim=nombre;

      //Extrae la referencia de storage no incluyendo en el nombre espacios.
      const storageRef=ref(storage, `${this.CARPETA_IMAGENES}/${productoTrim.replace(/ /g, "")}`);

      const uploadTask=uploadBytesResumable(storageRef,item.archivo);

      uploadTask.on('state_changed', (snapshot)=>{
        const progresss=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
      }, (err)=>{
      }, ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl)=>{
          item.url=downloadUrl;
          this.editarProductoCampo(id, nombre, item.url, info);
          return downloadUrl;
        })
      })


    }
  }

  async editarProductoCampo(id:string, nombre:string, imgURL:string, info:string){
    try{
      Swal.fire({
        icon:'success',
        title:'El archivo se subió correctamente',
        confirmButtonText:'Aceptar',
        allowOutsideClick:false,
      }).then((result)=>{
        if(result.value){
          $('#slidesEditarModal').modal('hide');
        }
      })
      if(imgURL!="../../../assets/noimage.png"){
        return await this.productosCollection.doc(id).update({nombreProducto:nombre, info:info, imgUrl:imgURL});
      }
      return await this.productosCollection.doc(id).update({nombreProducto:nombre, info:info});
    }catch(error){
      console.log(error);
    } 
  }

}
