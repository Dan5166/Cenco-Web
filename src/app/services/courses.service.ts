import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { Observable, of } from 'rxjs';
import { catchError, filter, first, map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { FileItems } from '../models/file-items';
import { CourseModel } from '../models/courses-model';


declare var $:any;


@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private CARPETA_IMAGENES='imgCourses';
  private coursesCollection: AngularFirestoreCollection<CourseModel>;


  constructor(private db:AngularFirestore) {
      
      this.coursesCollection=db.collection<CourseModel>('courses');
   }


   getCourses():Observable<CourseModel[]>{
    return this.coursesCollection.snapshotChanges().pipe(
      map(actions=>actions.map(a=>{
        const data=a.payload.doc.data() as CourseModel;
        data.id=a.payload.doc.id;
        const id =a.payload.doc.id;
        return {id, ...data}
      }))
    )
   }

   getCursito(id:string): Observable<CourseModel> {
    return this.db.collection('courses').doc(id).valueChanges() as Observable<CourseModel>;
   }

   async cargarCursosFirebase(imagenes:FileItems[], cursos:CourseModel): Promise<any>{
    const storage=getStorage();
    for(const item of imagenes){
      let cursoTrim=cursos.nombre;

      //Extrae la referencia de storage no incluyendo en el nombre espacios.
      const storageRef=ref(storage, `${this.CARPETA_IMAGENES}/${cursoTrim.replace(/ /g, "")}`);

      const uploadTask=uploadBytesResumable(storageRef,item.archivo);

      uploadTask.on('state_changed', (snapshot)=>{
        const progresss=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
      }, (err)=>{
      }, ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl)=>{
          cursos.imgUrl=downloadUrl;
          this.guardarCurso({nombre:cursos.nombre, imgUrl:cursos.imgUrl, info:cursos.descripcion, docs:cursos.docsPdf})
          return downloadUrl;
        });
      })
    }
  }

      
  async guardarCurso(curso:{nombre:string, imgUrl:string, info:string, docs:string[]}):Promise<any>{
    try{

      Swal.fire({
        icon:'success',
        title:'El archivo se subió correctamente',
        confirmButtonText:'Aceptar',
        allowOutsideClick:false,
      }).then((result)=>{

        if(result.value){
          $('#cursosModal').modal('hide');
        }

      })
      if(curso.imgUrl == null){

        curso.imgUrl='../../../assets/noimage.png';
      }
      
      let idCursoPromise = await this.db.collection('courses').add(curso);
      let idCurso = idCursoPromise.id;
      return await this.guardarCursoArchivosVarios(idCurso);

    }catch(error){

      





      console.log(error);
    }
  }

  async guardarCursoArchivosVarios(id:string){
    let curso={};
    this.db.collection('varios-servicio').doc(id).set({});
  }

  public eliminarCurso(id:string, cursoNombre:string):Promise<any>{
    const storage = getStorage();
    const desertRef = ref(storage, `${this.CARPETA_IMAGENES}/${cursoNombre.replace(/ /g, "")}`);
    deleteObject(desertRef).then(()=>{
      Swal.fire('EXITO','El servicio se eliminó correctamente','success');
    }).catch((error)=>{
      console.error(error);
    });
    return this.coursesCollection.doc(id).delete();
  }



  editarCurso(id:string, curso:CourseModel):Promise<any>{
    return this.coursesCollection.doc(id).update(curso);
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
          this.editarCursoCampo(id, nombre, item.url, info);
          return downloadUrl;
        })
      })


    }
  }

  async editarCursoCampo(id:string, nombre:string, imgURL:string, info:string){
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
        return await this.coursesCollection.doc(id).update({nombre:nombre, descripcion:info, imgUrl:imgURL});
      }
      return await this.coursesCollection.doc(id).update({nombre:nombre, descripcion:info});
    }catch(error){
      console.log(error);
    } 
  }
}