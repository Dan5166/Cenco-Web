import { Injectable } from '@angular/core';
import { DocsModel } from '../models/docs-model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore'; 
import { AngularFireStorage, AngularFireStorageModule } from '@angular/fire/compat/storage';
import { Observable, map, of, pluck, switchMap, take } from 'rxjs';
import { FileItems } from '../models/file-items';
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';

import Swal from 'sweetalert2';
import { CoursesService } from './courses.service';
import { CourseModel } from '../models/courses-model';

declare var $:any;

@Injectable({
  providedIn: 'root'
})

export class CertificatesService {

  private CARPETA_DOCS='certificates';
  private coursesCollection: AngularFirestoreCollection<DocsModel>;
  public uploadPercent:number=0;

  constructor(private db:AngularFirestore, private courseSVC:CoursesService, private storage:AngularFireStorage) { 
    this.coursesCollection=db.collection<DocsModel>('courses');
  }

  getCursos():Observable<DocsModel[]>{
    return this.coursesCollection.snapshotChanges().pipe(
      map(actions=>actions.map(a=>{
        const data=a.payload.doc.data() as DocsModel;
        data.id=a.payload.doc.id;
        const id =a.payload.doc.id;
        return {id, ...data}
      }))
    )
  }

  getCurso(id:string): Observable<DocsModel> {
    return this.db.collection('courses').doc(id).valueChanges() as Observable<DocsModel>;
  }

  cargarCursosFirebase(pdf:FileItems[], docs:DocsModel, llaveCurso:string, tipo:number){
    const storage=getStorage();
    let arregloUrls:string[]=[];
    let itemurl:string;

    try {
      Swal.fire({
        title: 'Subiendo archivo!',
        html: 'Cargando la vaina.',
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
       
      }).then((result) => {
        /* Read more about handling dismissals */
      });
     
      for (const item of pdf) {
        let docsTrim=docs.nombre;
        let storageRef=ref(storage, `${this.CARPETA_DOCS}/${docsTrim}/pdf/${docsTrim.replace(/\s+/g, '-')}`);

        //Extrae la referencia de storage no incluyendo en el nombre espacios.
        if(tipo==0){
          storageRef=ref(storage, `${this.CARPETA_DOCS}/${llaveCurso}/pdf/${docsTrim.replace(/\s+/g, '-')}`);
        }
        else if(tipo==1){
          storageRef=ref(storage, `${this.CARPETA_DOCS}/${llaveCurso}/pdf/${docsTrim.replace(/\s+/g, '-')}`);
        }
        else{
          storageRef=ref(storage, `${this.CARPETA_DOCS}/${llaveCurso}/pdf/${docsTrim.replace(/\s+/g, '-')}`);
        }

        const uploadTask=uploadBytesResumable(storageRef, item.archivo);

        uploadTask.on('state_changed', (snapshot)=>{
          const progresss=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
          //console.log('Upload is ' + this.uploadPercent + '% done');
        }, (err) => {
        }, () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            item.url=downloadURL;
            arregloUrls.push(downloadURL);
            itemurl=item.url;

            this.agregarUrlDocumentacionColection(llaveCurso, itemurl, tipo);
            
            try{

              Swal.fire({
                icon: 'success',
                title: 'El archivo se subió correctamente',
                confirmButtonText: 'Aceptar',
                allowOutsideClick: false,
              }).then((result) => {

                if(result.value){
                  $('#docsModal').modal('hide');
                  $('#videoModal').modal('hide');
                }

              })
            }catch(error){
              console.log(error);
            }
          });
        });

      }
    } catch (error) {
      console.log(error);
    }
  
  }

  async guardarDocs(docs:{arregloUrls:string[], info:string, linkVideo:string}, indice:string):Promise<any>{
    try {

      Swal.fire({
        title: 'success',
        html: 'El archivo se subió correctamente',
        confirmButtonText: 'Aceptar',
        allowOutsideClick:false,
      }).then((result) => {
        /* Read more about handling dismissals */
        if(result.value){
          $('#docsModal').modal('hide');
          $('#videoModal').modal('hide');

        }
      })
      if(docs.arregloUrls.length == 0){
        console.log("PDF NULL");
        docs.arregloUrls.push("");
      }
      return ((await this.db.collection('certificates').doc(indice).set({})));

    } catch (error) {
      console.log(error);
    }
  }

  public eliminarDoc(llaveCurso:string, docsNombre:string, tipo:number){
    //recibir el array de pdfs
    let listaPdf=[""];

    this.getCurso(llaveCurso).subscribe(data=>{
      listaPdf=data.docsPdf;
    });
  

  const cursoRef = this.db.collection<CourseModel>('courses').doc(llaveCurso);
  this.db.collection<CourseModel>('courses').doc(llaveCurso).get().pipe(
    take(1),
    switchMap((doc) => {
    let data = doc.data();
    let pdfs = data?.docsPdf || []
    let video = data?.docsVideo || [];
    const indiceDelElemento = pdfs.indexOf(docsNombre);
    const indiceDelElementoVideo = video.indexOf(docsNombre);

    if (indiceDelElemento > -1 && tipo==0) {
      pdfs.splice(indiceDelElemento, 1);
      return cursoRef.update({docsPdf: pdfs});
    }
    else if(indiceDelElementoVideo > -1 && tipo==1){
      video.splice(indiceDelElementoVideo, 1);
      return cursoRef.update({docsVideo: video});
    }
    else{
      return of(null);
    }
    })
  ).subscribe({
    next: () => {
    },
    error: (error) => {
    }
  });
  }
  
  editarCurso(id:string, docsNombre:string,itemurlNueva:string){
    let listaPdf=[""];

    this.getCurso(id).subscribe((data:any)=>{
      listaPdf=data.docspdf;
    });

    const cursoRef = this.db.collection<CourseModel>('courses').doc(id);
    this.db.collection<CourseModel>('courses').doc(id).get().pipe(
      take(1),
      switchMap((doc) => {
        let data = doc.data();
        let pdfs = data?.docsPdf || [];
        const indiceDelElemento = pdfs.indexOf(docsNombre);

        if (indiceDelElemento > -1) {
          pdfs[indiceDelElemento]=itemurlNueva;
        }
        return cursoRef.update({docsPdf: pdfs});
      })
    ).subscribe({
        next: () => {
        },
        error: (error) => {
        }
    });

  }
  agregarUrlDocumentacionColection(id:string, itemurl:string, tipo:number){
    let listaPdf=[""];

    this.getCurso(id).subscribe((data:any)=>{
      listaPdf=data.docspdf;
    });

    const cursoRef = this.db.collection<CourseModel>('courses').doc(id);
    this.db.collection<CourseModel>('courses').doc(id).get().pipe(
      take(1),
      switchMap((doc) => {
        let data = doc.data();
        let pdfs = data?.docsPdf || [];
        let videos = data?.docsVideo || [];
        

        if (tipo == 1) {
          videos.push(itemurl);
          return cursoRef.update({docsVideo: videos});
        }
        else{
          pdfs.push(itemurl);
          return cursoRef.update({docsPdf: pdfs});
        }

      })
    ).subscribe({
        next: () => {
        },
        error: (error) => {
        }
    });

  }
  
}
