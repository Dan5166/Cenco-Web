import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { FileItems } from 'src/app/models/file-items';
import { NoticiaModel } from 'src/app/models/noticia-model';
import { SlideModel } from 'src/app/models/slide-model';
import { NoticiaServiceService } from 'src/app/services/noticia-service.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-cms-comp',
  templateUrl: './cms-comp.component.html',
  styleUrls: ['./cms-comp.component.css']
})
export class CmsCompComponent {
  noticiasSubscripcion: any;
  noticiasSubscripcion2: any;
  carruselSubscripcion: any;
  listaNovedades: any[] = [{titulo:"Si", cuerpo:"No", img:"../../../assets/dist/img/cargando.gif"}
  ];
  listaNovedades2: NoticiaModel[] = [{titulo:"Cargando...", cuerpo:"", img:"../../../assets/dist/img/cargando.gif"}];
  imagenes: FileItems[] = [];
  slideSeleccionado: string = '';
  noticiaSeleccionada: string = '';
  imgURL = '../../../assets/noimage.png';
  file: any;
  listaCarrusel: SlideModel[] = [{titulo:"Cargando", cuerpo:"", img:"../../../assets/dist/img/cargando.gif", orden:0}];
  listaCarruselRespaldo: SlideModel[] = [];


  noticiasForm = this.fb.group({
    titulo: ['', [Validators.required]],
    cuerpo: ['', [Validators.required]],
    video: ['', [Validators.required]],
  });

  slidesForm = this.fb.group({
    titulo: ['', [Validators.required]],
    cuerpo: ['', [Validators.required]],
  });
  listaElementosModificados = new Set<string>();
  imgEditando="";
  tituloEditando="";
  cuerpoEditando="";


  constructor(
    private noticiasSVC: NoticiaServiceService,
    private fb: UntypedFormBuilder,
  ) {}

  async ngOnInit() {
    let indicadorCarrusel = false;
    let indicadorNoticias = false;
    try {
      Swal.fire({
        title: 'Cargando CMS...',
        html: 'Cargando contenido dinámico de la página.',
        didOpen: () => {
          Swal.showLoading();
        },
      }).then((result) => {
        console.log('close');
      });
       
        this.carruselSubscripcion = this.noticiasSVC
        .getSlides2()
        .subscribe((res) => {
          this.listaCarrusel = [];
          res.forEach((element: SlideModel) => {
            this.listaCarrusel.push({
              ...element,
            });
          });
          indicadorCarrusel = true;
          if(indicadorCarrusel){console.log("CARRUSEL TRUE: ");}
          
        });
        
        this.noticiasSubscripcion2 = this.noticiasSVC
        .getNoticias2()
        .subscribe((res) => {
          this.listaNovedades2 = [];
          res.forEach((element: NoticiaModel) => {
            this.listaNovedades2.push({
              ...element,
            });
          });
          this.listaNovedades = this.listaNovedades2.slice();
          indicadorNoticias = true;
          if(indicadorNoticias){console.log("NOTICIAS TRUE: ");}
          if(indicadorCarrusel && indicadorNoticias){
            Swal.close();
          }
        });
        
        
        
    } catch (error) {
      console.log(error);
    }
    let hola=true;
    
  }

  cambiaIndices(currentIndex:number, idElementoDeplazado:string){
    console.log("SE MUEVE HASTA: "+currentIndex);
    let indiceElementoDesplazado = this.listaCarruselRespaldo.findIndex(element => element.id == idElementoDeplazado);
    for (let i = indiceElementoDesplazado; i < this.listaCarruselRespaldo.length; i++) {
      let elemento = this.listaCarruselRespaldo[i];
      console.log("ELEMENTO: "+elemento.titulo);
    }
  }

  onDrop(event: CdkDragDrop<any>) {
    
    moveItemInArray(this.listaCarruselRespaldo, event.previousIndex, event.currentIndex);
    // Intercambia los elementos en la lista
    // REVISO INDICE DEL QUE ESTABA ANTES
    let idElementoDeplazado = this.listaCarruselRespaldo[event.currentIndex].id;
    if(event.previousIndex < event.currentIndex){
      // SI EL INDICE DEL QUE ESTABA ANTES ES MENOR AL INDICE DEL QUE ESTA AHORA
      // SE DEBE DECREMENTAR EL INDICE DE LOS ELEMENTOS QUE ESTAN ENTRE EL INDICE DEL QUE ESTABA ANTES Y EL INDICE DEL QUE ESTA AHORA
      for (let i = event.previousIndex; i < event.currentIndex; i++) {
        let elemento = this.listaCarruselRespaldo[i];
        elemento.orden = elemento.orden-1;
        this.listaElementosModificados.add(elemento.id);
      }
    }else{
      // SI EL INDICE DEL QUE ESTABA ANTES ES MAYOR AL INDICE DEL QUE ESTA AHORA
      // SE DEBE INCREMENTAR EL INDICE DE LOS ELEMENTOS QUE ESTAN ENTRE EL INDICE DEL QUE ESTABA ANTES Y EL INDICE DEL QUE ESTA AHORA
      for (let i = event.currentIndex; i <= event.previousIndex; i++) {
        let elemento = this.listaCarruselRespaldo[i];
        elemento.orden = elemento.orden+1;
        this.listaElementosModificados.add(elemento.id);
      }
      
    }
    //cambia el indice del elemento que se movio
    this.listaCarruselRespaldo[event.currentIndex].orden = event.currentIndex;
    this.listaElementosModificados.add(this.listaCarruselRespaldo[event.currentIndex].id);
    
  }

  actualizaCampo(id:string, campo:string, valor:string){
    this.noticiasSVC.editarOrdenNoticia(id, campo, valor);
  }


  eliminar(id: any, noticiaNombre: string, indice: number) {
    if(this.listaNovedades.length > 1){
      Swal.fire({
        icon: 'question',
        title: `Desea eliminar la noticia ${noticiaNombre}`,
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#c82333',
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          try {
            Swal.fire({
              title: 'Cargando noticias...',
              html: 'Cargando las noticias.',
              didOpen: () => {
                Swal.showLoading();
              },
            }).then((result) => {
              console.log('close');
            });
            this.noticiasSVC.eliminarNoticia(id, noticiaNombre);
            this.listaNovedades.splice(indice, 1);
          } catch (error) {
            console.log(error);
          }
          Swal.close();
        }
      });
    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No puedes dejarnos sin noticias!',
        footer: '<a href="">Por que tengo este error?</a>'
      })
    }
    
  }

  eliminarSlide(id: any, slideNombre: string, indice: number) {
    if(this.listaCarrusel.length > 1){
      Swal.fire({
        icon: 'question',
        title: `Desea eliminar el slide ${slideNombre}`,
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#c82333',
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          try {
            Swal.fire({
              title: 'Cargando slide...',
              html: 'Cargando los slide.',
              didOpen: () => {
                Swal.showLoading();
              },
            }).then((result) => {
              console.log('close');
            });
            this.noticiasSVC.eliminarSlide(id, slideNombre);
          } catch (error) {
            console.log(error);
          }
          Swal.close();
        }
      });
    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No puedes dejarnos sin slides!',
        footer: '<a href="">Por que tengo este error?</a>'
      })
    }
    
  }


  selectChange($event: any) {
    if ($event.target.files[0]) {
      this.imagenes = [];
      this.file = $event.target.files;
      let reader = new FileReader();
      reader.readAsDataURL($event.target.files[0]);
      reader.onload = ($event: any) => {
        this.imgURL = $event.target.result;
        this.imagenes.push({
          archivo: this.file[0],
        });
      };
    } else {
      this.imgURL;
    }
  }


  limpiarForm() {
    this.noticiasForm.reset();
    this.slidesForm.reset();
    this.imgURL = '../../../assets/noimage.png';
  }

  registrarNoticia() {
    let pdf: string[] = [];
    let cargaNoticia: any = {
      titulo: this.noticiasForm.value.titulo,
      cuerpo: this.noticiasForm.value.cuerpo,
      img: "",
    };

    let timerInterval = 0;
    try {
      Swal.fire({
        title: 'Subiendo archivo...',
        html: 'Cargando archivo.',
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
      }).then((result) => {
        /* Read more about handling dismissals below */
      });

      this.noticiasSVC.cargarNoticiaFirebase(this.imagenes, cargaNoticia);
      this.limpiarForm();
    } catch (error) {
      console.log(error);
    }
  }

  encontrarMaximo() {
    let maximo = 0;
    this.listaCarrusel.forEach(element => {
      if (element.orden > maximo) {
        maximo = element.orden;
      }
    });
    return maximo;
  }

  registrarSlide() {
    let cargaSlide: any = {
      titulo: this.slidesForm.value.titulo,
      cuerpo: this.slidesForm.value.cuerpo,
      img: "",
      orden: this.encontrarMaximo()+1,
    };

    let timerInterval = 0;
    try {
      Swal.fire({
        title: 'Subiendo archivo...',
        html: 'Cargando archivo.',
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
      }).then((result) => {
        /* Read more about handling dismissals below */
      });

      this.noticiasSVC.cargarSlideFirebase(this.imagenes, cargaSlide);
      this.limpiarForm();
    } catch (error) {
      console.log(error);
    }
    console.log("MAXIMO:  "+this.encontrarMaximo()+1);
  }

  ordenarSlides(){
    this.listaCarruselRespaldo = this.listaCarrusel.slice();
    this.listaCarruselRespaldo.forEach(element => {
      if(element.orden != this.listaCarruselRespaldo.indexOf(element)){
        this.listaElementosModificados.add(element.id);
        element.orden = this.listaCarruselRespaldo.indexOf(element);
      }
      
    });
  }

  compararCamposOrden() {
    var indicesDiferentes = [];
  
    for (let i = 0; i < this.listaCarruselRespaldo.length; i++) {
      if (this.listaCarruselRespaldo[i]["orden"] !== this.listaCarrusel[i]["orden"]) {
        indicesDiferentes.push(i);
      }
    }
  
    return indicesDiferentes;
  }

  guardarOrden(){
    let orden = [];
    console.log("ELEMENTOS MODIFICADOS: ");
    this.listaElementosModificados.forEach(element => {
      console.log(element+"   TITULO:   "+this.listaCarruselRespaldo.find(elemento => elemento.id == element).titulo+"    ORDER: "+this.listaCarruselRespaldo.find(elemento => elemento.id == element).orden);

    });
    
    console.log("------------ELEMENTOS ORDEN-------------: ");
    this.listaElementosModificados.forEach(element => {
      orden.push(this.listaCarruselRespaldo.find(elemento => elemento.id == element).orden);
      console.log("ORDEN: "+this.listaCarruselRespaldo.find(elemento => elemento.id == element).orden);
    });
    this.noticiasSVC.editarSlidesOrden(orden, Array.from(this.listaElementosModificados));
    this.listaElementosModificados.clear();
    
  }

  cargarSlideSeleccionado() {
    this.imgEditando = this.listaCarrusel.find(
      (slide) => slide.id == this.slideSeleccionado
    )?.img;
    this.tituloEditando = this.listaCarrusel.find(
      (slide) => slide.id == this.slideSeleccionado
    )?.titulo;
    this.cuerpoEditando = this.listaCarrusel.find(
      (slide) => slide.id == this.slideSeleccionado
    )?.cuerpo;
  }

  setSlideSeleccionado(nombre: any) {
    this.slideSeleccionado = nombre;
    this.cargarSlideSeleccionado();
    console.log(this.slideSeleccionado);
  }

  editarSlide() {
    console.log("+++++++++++++++++++EDITANDO: "+this.slideSeleccionado);
    if (
      this.slidesForm.value.titulo ||
      this.slidesForm.value.cuerpo ||
      this.imgURL != '../../../assets/noimage.png'
    ) {
      console.log("EDITANDO IF: "+this.slideSeleccionado);
      if (this.slidesForm.value.titulo) {
        this.tituloEditando = this.slidesForm.value.titulo;
      }
      if (this.slidesForm.value.cuerpo) {
        this.cuerpoEditando = this.slidesForm.value.cuerpo;
      }
      if (this.imgURL != '../../../assets/noimage.png') {
        this.imgEditando = this.imgURL;
        this.noticiasSVC.guardarFotoEditada(
          this.slideSeleccionado,
          this.imagenes,
          this.tituloEditando,
          this.cuerpoEditando
        );
      } else {
        console.log("EDITANDO ELSE: "+this.slideSeleccionado);
        this.noticiasSVC.editarSlideCampo(
          this.slideSeleccionado,
          this.imgEditando,
          this.tituloEditando,
          this.cuerpoEditando
        );
      }
    }
    else{
      console.log("EDITANDO ELSE2: "+this.slideSeleccionado);
    }
  }

  cargarNoticiaSeleccionada() {
    this.imgEditando = this.listaNovedades2.find(
      (noticia) => noticia.id == this.noticiaSeleccionada
    )?.img;
    this.tituloEditando = this.listaNovedades2.find(
      (noticia) => noticia.id == this.noticiaSeleccionada
    )?.titulo;
    this.cuerpoEditando = this.listaNovedades2.find(
      (noticia) => noticia.id == this.noticiaSeleccionada
    )?.cuerpo;
  }

  setNoticiaSeleccionada(nombre: any) {
    this.noticiaSeleccionada = nombre;
    this.cargarNoticiaSeleccionada();
    console.log(this.noticiaSeleccionada);
  }

  editarNoticia() {
    console.log("+++++++++++++++++++EDITANDO: "+this.noticiaSeleccionada);
    if (
      this.noticiasForm.value.titulo ||
      this.noticiasForm.value.cuerpo ||
      this.imgURL != '../../../assets/noimage.png'
    ) {
      console.log("EDITANDO IF: "+this.noticiaSeleccionada);
      if (this.noticiasForm.value.titulo) {
        this.tituloEditando = this.noticiasForm.value.titulo;
      }
      if (this.noticiasForm.value.cuerpo) {
        this.cuerpoEditando = this.noticiasForm.value.cuerpo;
      }
      if (this.imgURL != '../../../assets/noimage.png') {
        this.imgEditando = this.imgURL;
        this.noticiasSVC.guardarFotoEditadaNoticia(
          this.noticiaSeleccionada,
          this.imagenes,
          this.tituloEditando,
          this.cuerpoEditando
        );
      } else {
        console.log("EDITANDO ELSE: "+this.noticiaSeleccionada);
        this.noticiasSVC.editarNoticiaCampo(
          this.noticiaSeleccionada,
          this.imgEditando,
          this.tituloEditando,
          this.cuerpoEditando
        );
      }
    }
    else{
      console.log("EDITANDO ELSE2: "+this.noticiaSeleccionada);
    }
  }
}
