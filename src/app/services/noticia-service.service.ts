import { Injectable } from '@angular/core';
import { NoticiaModel } from '../models/noticia-model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable, Subject, map, switchMap, take } from 'rxjs';
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import Swal from 'sweetalert2';
import { FileItems } from '../models/file-items';
import { SlideModel } from '../models/slide-model';
import { Timestamp } from 'firebase/firestore';
import { ComponenteHTMLModel } from '../models/componente-model';
import { ComponenteHTMLObjectModel } from '../models/componente-html-object-model';

declare var $:any;

@Injectable({
  providedIn: 'root'
})
export class NoticiaServiceService {
  private CARPETA_IMAGENES='img';
  private noticiasCollection: AngularFirestoreCollection<NoticiaModel>;
  private slideCollection: AngularFirestoreCollection<SlideModel>;
  private componenteCollection: AngularFirestoreCollection<ComponenteHTMLObjectModel>;

  constructor(private db:AngularFirestore) { 

    this.noticiasCollection=db.collection<NoticiaModel>('home-noticias');
    this.slideCollection=db.collection<SlideModel>('home-carrusel');
    this.componenteCollection=db.collection<ComponenteHTMLObjectModel>('home-componentesHTMLObject');

  }

  getNoticias():Observable<NoticiaModel[]>{
    return this.noticiasCollection.snapshotChanges().pipe(
      map(actions=>actions.map(a=>{
        const data=a.payload.doc.data() as NoticiaModel;
        data.id=a.payload.doc.id;
        const id =a.payload.doc.id;
        return {id, ...data}
      }))
    )
  }

  getNoticias2():Observable<NoticiaModel[]>{
    const noticiasSubject = new Subject<NoticiaModel[]>();
    
    this.noticiasCollection.ref
      .orderBy('titulo', 'asc')
      .onSnapshot(querySnapshot => {
        const noticias = querySnapshot.docs.map(doc => {
          const data = doc.data() as NoticiaModel;
          data.id = doc.id;
          const id = doc.id;
          return {id, ...data};
        });
        noticiasSubject.next(noticias);
      },
      error => {
        console.log('Error al obtener noticias: ', error);
      });
  
    return noticiasSubject.asObservable();
  }

  getSlides2():Observable<SlideModel[]>{
    const slideSubject = new Subject<SlideModel[]>();
    
    this.slideCollection.ref
      .orderBy('orden', 'asc')
      .onSnapshot(querySnapshot => {
        const slide = querySnapshot.docs.map(doc => {
          const data = doc.data() as SlideModel;
          data.id = doc.id;
          const id = doc.id;
          return {id, ...data};
        });
        slideSubject.next(slide);
      },
      error => {
        console.log('Error al obtener slides: ', error);
      });
  
    return slideSubject.asObservable();
  }
  
  

  getSlides():Observable<SlideModel[]>{
    return this.slideCollection.snapshotChanges().pipe(
      map(actions=>actions.map(a=>{
        const data=a.payload.doc.data() as SlideModel;
        data.id=a.payload.doc.id;
        const id =a.payload.doc.id;
        return {id, ...data}
      }))
    )
  }

  async cargarNoticiaFirebase(imagenes:FileItems[], noticia:NoticiaModel): Promise<any>{
    const storage=getStorage();
    for(const item of imagenes){
      let noticiaTrim=noticia.titulo;

      //Extrae la referencia de storage no incluyendo en el nombre espacios.
      const storageRef=ref(storage, `${this.CARPETA_IMAGENES}/${noticiaTrim.replace(/ /g, "")}`);

      const uploadTask=uploadBytesResumable(storageRef,item.archivo);

      uploadTask.on('state_changed', (snapshot)=>{
        const progresss=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
      }, (err)=>{
      }, ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl)=>{
          item.url=downloadUrl;
          let fecha = Timestamp.now();
          this.guardarNoticia({titulo:noticia.titulo, cuerpo:noticia.cuerpo, img:item.url, fecha:fecha});
          return downloadUrl;
        })
      })


    }
  }

  



  async guardarNoticia(noticia:{titulo : string, cuerpo : string, img : string, fecha?: Timestamp}):Promise<any>{
    try{
      Swal.fire({
        icon:'success',
        title:'El archivo se subió correctamente',
        confirmButtonText:'Aceptar',
        allowOutsideClick:false,
      }).then((result)=>{
        if(result.value){
          $('#noticiasModal').modal('hide');
        }
      })
      if(noticia.img == null){
        noticia.img='../../../assets/noimage.png';
      }
      return await this.db.collection('home-noticias').add(noticia);
    }catch(error){
      console.log(error);
    }
  }

  async cargarSlideFirebase(imagenes:FileItems[], slide:SlideModel): Promise<any>{
    const storage=getStorage();
    for(const item of imagenes){
      let slideTrim=slide.titulo;

      //Extrae la referencia de storage no incluyendo en el nombre espacios.
      const storageRef=ref(storage, `${this.CARPETA_IMAGENES}/${slideTrim.replace(/ /g, "")}`);

      const uploadTask=uploadBytesResumable(storageRef,item.archivo);

      uploadTask.on('state_changed', (snapshot)=>{
        const progresss=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
      }, (err)=>{
      }, ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl)=>{
          item.url=downloadUrl;
          this.guardarSlide({titulo:slide.titulo, cuerpo:slide.cuerpo, img:item.url, orden:slide.orden});
          return downloadUrl;
        })
      })


    }
  }

  async guardarSlide(slide:{titulo : string, cuerpo : string, img : string, orden: number}):Promise<any>{
    try{
      Swal.fire({
        icon:'success',
        title:'El archivo se subió correctamente',
        confirmButtonText:'Aceptar',
        allowOutsideClick:false,
      }).then((result)=>{
        if(result.value){
          $('#slidesModal').modal('hide');
        }
      })
      if(slide.img == null){
        slide.img='../../../assets/noimage.png';
      }
      console.log("GUARDANDO SLIDE----")
      return await this.db.collection('home-carrusel').add(slide);
    }catch(error){
      console.log(error);
    }
  }


  getComponentesHTML():Observable<ComponenteHTMLObjectModel[]>{
    console.log("FIREBASE COMPONENTES HTML----")
    return this.componenteCollection.snapshotChanges().pipe(
      map(actions=>actions.map(a=>{
        const data=a.payload.doc.data() as ComponenteHTMLObjectModel;
        data.id=a.payload.doc.id;
        const id =a.payload.doc.id;
        return {id, ...data}
      }))
    )
  }
  
  async cargarComponenteHTMLFirebase(componenteHTML: ComponenteHTMLObjectModel): Promise<any> {
    try {
      await this.db.collection('home-componentesHTMLObject').add(componenteHTML);
    } catch (error) {
      console.log(error);
    }
  }

  getComponente(id:string): Observable<ComponenteHTMLObjectModel> {
    return this.db.collection('home-componentesHTMLObject').doc(id).valueChanges() as Observable<ComponenteHTMLObjectModel>;
  }

  async obtenerComponente(id: string): Promise<ComponenteHTMLObjectModel> {
    try {
      const data = await this.getComponente(id).toPromise();
      return data;
    } catch (error) {
      // Manejar el error si ocurre
      console.error('Error al obtener el componente:', error);
      throw error;
    }
  }

  async agregarComponenteinterior(id:string, elemento:{tipo: string; elementos: string[]}){
    //recibir el array de pdfs
    let listaComponentesInterior:[{tipo: string; elementos: string[]}];


    const componente = await this.obtenerComponente(id);
    listaComponentesInterior = componente.elementos;


    
    const componentesRef = this.db.collection<ComponenteHTMLObjectModel>('home-componentesHTMLObject').doc(id);
    this.db.collection<ComponenteHTMLObjectModel>('home-componentesHTMLObject').doc(id).get().pipe(
      take(1),
      switchMap((doc) => {
        let data = doc.data();
        let elementos = data?.elementos || [];

        listaComponentesInterior.push(elemento);
        return componentesRef.update({elementos:listaComponentesInterior});


        
      })
    )
  }


  public eliminarComponenteHTMLObject(id:string, componenteTitulo:string):Promise<any>{
    const storage = getStorage();
    const desertRef = ref(storage, `${this.CARPETA_IMAGENES}/${componenteTitulo.replace(/ /g, "")}`);

    
    return this.componenteCollection.doc(id).delete();
  }





  public eliminarNoticia(id:string, noticiaNombre:string):Promise<any>{
    const storage = getStorage();
    const desertRef = ref(storage, `${this.CARPETA_IMAGENES}/${noticiaNombre.replace(/ /g, "")}`);
    deleteObject(desertRef).then(()=>{
      Swal.fire('EXITO','El servicio se eliminó correctamente','success');
    }).catch((error)=>{
      console.error(error);
    });
    return this.noticiasCollection.doc(id).delete();
  }

  public eliminarSlide(id:string, slideNombre:string):Promise<any>{
    const storage = getStorage();
    const desertRef = ref(storage, `${this.CARPETA_IMAGENES}/${slideNombre.replace(/ /g, "")}`);
    deleteObject(desertRef).then(()=>{
      Swal.fire('EXITO','El slide se eliminó correctamente','success');
    }).catch((error)=>{
      console.error(error);
    });
    return this.slideCollection.doc(id).delete();
  }

  public editarNoticia(id:string, noticia:NoticiaModel):Promise<any>{
    return this.noticiasCollection.doc(id).update(noticia);
  }

  public editarOrdenNoticia(id:string, campo:string, valor:string):Promise<any>{
    return this.noticiasCollection.doc(id).update({titulo:valor});
  }

  async editarSlidesOrden(orden:number[], idSlidesEditados:string[]){
    console.log("FIREBASE ORDEN DE SLIDES----");
    idSlidesEditados.forEach((id)=>{
      console.log(id);
    })
    try{
      Swal.fire({
        icon:'success',
        title:'El orden se modificó correctamente',
        confirmButtonText:'Aceptar',
        allowOutsideClick:false,
      }).then((result)=>{
        if(result.value){
          $('#slidesOrderModal').modal('hide');
        }
      })

      for(let i=0; i<idSlidesEditados.length; i++){;
        await this.slideCollection.doc(idSlidesEditados[i]).update({orden:orden[i]});
      }

      /*
      idSlidesEditados.forEach(async (id)=>{
        return await this.slideCollection.doc(id).update({orden:orden});
      })
      */
    }catch(error){
      console.log(error);
    }
  }



  



  async editarSlideCampo(id:string, imgURL:string, titulo:string, cuerpo:string){
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
        if(titulo=="--" && cuerpo=="--"){
          return await this.slideCollection.doc(id).update({img:imgURL});
        }
        else if(titulo=="--"){
          return await this.slideCollection.doc(id).update({cuerpo:cuerpo, img:imgURL});
        }
        else if(cuerpo=="--"){
          return await this.slideCollection.doc(id).update({titulo:titulo, img:imgURL});
        }
        return await this.slideCollection.doc(id).update({titulo:titulo, cuerpo:cuerpo, img:imgURL});
      }
      if(titulo=="--" && cuerpo=="--"){
        return await this.slideCollection.doc(id).update({img:imgURL});
      }
      else if(titulo=="--"){
        return await this.slideCollection.doc(id).update({cuerpo:cuerpo});
      }
      else if(cuerpo=="--"){
        return await this.slideCollection.doc(id).update({titulo:titulo});
      }
      return await this.slideCollection.doc(id).update({titulo:titulo, cuerpo:cuerpo});
    }catch(error){
      console.log(error);
    } 
  }


  async guardarFotoEditada(id:string, imagenes:FileItems[], cuerpo="--", titulo="--"){
    const storage=getStorage();
    let imgURL="../../../assets/noimage.png";

    for(const item of imagenes){
      let slideTrim=titulo;

      //Extrae la referencia de storage no incluyendo en el nombre espacios.
      const storageRef=ref(storage, `${this.CARPETA_IMAGENES}/${slideTrim.replace(/ /g, "")}`);

      const uploadTask=uploadBytesResumable(storageRef,item.archivo);

      uploadTask.on('state_changed', (snapshot)=>{
        const progresss=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
      }, (err)=>{
      }, ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl)=>{
          item.url=downloadUrl;
          if(titulo==null){
            this.editarSlideCampo(id, item.url, titulo, cuerpo);
            return downloadUrl;
          }
          this.editarSlideCampo(id, item.url, titulo, cuerpo);
          return downloadUrl;
        })
      })
    }
  }




  async editarNoticiaCampo(id:string, imgURL:string, titulo:string, cuerpo:string){
    try{
      Swal.fire({
        icon:'success',
        title:'El archivo se subió correctamente',
        confirmButtonText:'Aceptar',
        allowOutsideClick:false,
      }).then((result)=>{
        if(result.value){
          $('#noticiaEditarModal').modal('hide');
        }
      })
      if(imgURL!="../../../assets/noimage.png"){
        if(titulo=="--" && cuerpo=="--"){
          return await this.noticiasCollection.doc(id).update({img:imgURL});
        }
        else if(titulo=="--"){
          return await this.noticiasCollection.doc(id).update({cuerpo:cuerpo, img:imgURL});
        }
        else if(cuerpo=="--"){
          return await this.noticiasCollection.doc(id).update({titulo:titulo, img:imgURL});
        }
        return await this.noticiasCollection.doc(id).update({titulo:titulo, cuerpo:cuerpo, img:imgURL});
      }
      if(titulo=="--" && cuerpo=="--"){
        return await this.noticiasCollection.doc(id).update({img:imgURL});
      }
      else if(titulo=="--"){
        return await this.noticiasCollection.doc(id).update({cuerpo:cuerpo});
      }
      else if(cuerpo=="--"){
        return await this.noticiasCollection.doc(id).update({titulo:titulo});
      }
      return await this.noticiasCollection.doc(id).update({titulo:titulo, cuerpo:cuerpo});
    }catch(error){
      console.log(error);
    } 
  }


  async guardarFotoEditadaNoticia(id:string, imagenes:FileItems[], cuerpo="--", titulo="--"){
    const storage=getStorage();
    let imgURL="../../../assets/noimage.png";

    for(const item of imagenes){
      let noticiaTrim=titulo;

      //Extrae la referencia de storage no incluyendo en el nombre espacios.
      const storageRef=ref(storage, `${this.CARPETA_IMAGENES}/${noticiaTrim.replace(/ /g, "")}`);

      const uploadTask=uploadBytesResumable(storageRef,item.archivo);

      uploadTask.on('state_changed', (snapshot)=>{
        const progresss=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
      }, (err)=>{
      }, ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl)=>{
          item.url=downloadUrl;
          if(titulo==null){
            this.editarNoticiaCampo(id, item.url, titulo, cuerpo);
            return downloadUrl;
          }
          this.editarNoticiaCampo(id, item.url, titulo, cuerpo);
          return downloadUrl;
        })
      })
    }
  }

}
