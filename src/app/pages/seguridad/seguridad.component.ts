import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ComponenteHTMLObjectModel } from 'src/app/models/componente-html-object-model';
import { ComponenteHTMLModel } from 'src/app/models/componente-model';
import { FileItems } from 'src/app/models/file-items';
import { NoticiaServiceService } from 'src/app/services/noticia-service.service';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-seguridad',
  templateUrl: './seguridad.component.html',
  styleUrls: ['./seguridad.component.css'],
})
export class SeguridadComponent implements OnInit {
  selectedForm: string = 'form1';
  listaParrafos = [{ titulo: '', cuerpo: '', elementos: [] }];
  listaParrafosRespaldo = [];
  listaParrafosRespaldo2 = [];
  listaComponentesStr = [];
  listaElementosModificados = new Set<string>();

  listaCompPrueba = [
    {
      titulo: 'Comp 1',
      cuerpo: 'Cuerpo del componente 1...',
      elementos: [
        {
          tipo: 'ul',
          elementos: [
            'Elemento 1...',
            'Elemento 2...',
            'Elemento 3...',
            'Elemento 4...',
          ],
        },
        {
          tipo: 'img',
          elementos: [
            '../../../assets/noimage.png',
            "width='10%' height='auto'",
          ],
        },
      ],
    },
  ];

  listaCompHTMLRec: ComponenteHTMLObjectModel[] = [{
    titulo: '',
    cuerpo: '',
    elementos: [{tipo: '', elementos: ['']}]
  }];

  form1Data = {
    name: '',
    email: '',
  };

  form2Data = {
    phone: '',
    address: '',
  };

  contenidoForm = this.fb.group({
    titulo: ['', [Validators.required]],
    cuerpo: ['', [Validators.required]],
  });

  listaForm = this.fb.group({
    elemento1: ['', [Validators.required]],
    elemento2: ['', [Validators.required]],
    elemento3: ['', [Validators.required]],
    elemento4: ['', [Validators.required]],
  });

  imgURL = '../../../assets/dist/img/bg_blue_gradient.webp';
  file: any;
  imagenes: FileItems[] = [];

  componenteSeleccionado: number = 0;
  idComponenteSeleccionado: string = '';

  tamanoImagenes = [
    { nombre: 'Pequeño', ancho: 25 },
    { nombre: 'Mediano', ancho: 50 },
    { nombre: 'Grande', ancho: 100 },
  ];

  selectedTamano = this.tamanoImagenes[2];
  componentesSubscripcion: any;

  constructor(
    private fb: FormBuilder,
    private noticiasSVC: NoticiaServiceService
  ) {}

  ngOnInit(): void {
    let indicadorComponentes = false;
    try {
      Swal.fire({
        title: 'Cargando...',
        html: 'Cargando contenido dinámico de la página.',
        didOpen: () => {
          Swal.showLoading();
        },
      }).then((result) => {
        console.log('close');
      });

      this.componentesSubscripcion = this.noticiasSVC
        .getComponentesHTML()
        .subscribe((res) => {
          this.listaCompHTMLRec = [];
          res.forEach((element: ComponenteHTMLObjectModel) => {
            this.listaCompHTMLRec.push({
              ...element,
            });
          });
          indicadorComponentes = true;
          if (indicadorComponentes) {
            console.log('COMPONENTE TRUE: ');
            this.transformarContenidoAHtml();
            Swal.close();
          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  transformarContenidoAHtml() {    
    this.listaComponentesStr = [];
    if(this.listaCompHTMLRec.length>0){
    }
    console.log('SE TRANSFORMA TODO A HTML');
    this.listaCompHTMLRec.forEach((element, index) => {
      const idRes:string = element.id;
      const elementoHTMLRes:string =
        '<h1>' +
        element.titulo.replace(/\n/g, '<br>') +
        '</h1>' +
        '<p>' +
        element.cuerpo.replace(/\n/g, '<br>') +
        '</p>' +
        element.elementos
          .map((elemento, index) => {
            if (elemento.tipo == 'ul') {
              return (
                '<ul>' +
                elemento.elementos
                  .map((elemento, index) => {
                    return '<li>' + elemento.replace(/\n/g, '<br>') + '</li>';
                  })
                  .join('') +
                '</ul><br>'
              );
            } else if (elemento.tipo == 'img') {
              return (
                "<img src='" +
                elemento.elementos[0] +
                "' " +
                elemento.elementos[1] +
                " alt='Imagen''>" +
                '<br>'
              );
            } else {
              return '';
            }
          })
          .join('');
          //crea un diccionario con el id y el elemento html
          const nuevoDiccionario = {id:idRes,elementoHTML:elementoHTMLRes};
          this.listaComponentesStr.push(nuevoDiccionario);
    });
    
  }



  agregarParrafo() {
    if (this.selectedForm == 'form1') {
      this.listaCompHTMLRec.push({
        titulo: this.contenidoForm.value.titulo,
        cuerpo: this.contenidoForm.value.cuerpo,
        elementos: [
          {
            tipo: 'ul',
            elementos: [
              this.listaForm.value.elemento1,
              this.listaForm.value.elemento2,
              this.listaForm.value.elemento3,
              this.listaForm.value.elemento4,
            ],
          },
        ],
      });
    } else if (this.selectedForm == 'form2') {
      this.listaCompHTMLRec.push({
        titulo: this.contenidoForm.value.titulo,
        cuerpo: this.contenidoForm.value.cuerpo,
        elementos: [
          {
            tipo: 'img',
            elementos: [
              this.imgURL,
              "width='" + this.selectedTamano.ancho + "%' height='auto'",
            ],
          },
        ],
      });
    }
  }

  seleccionarComponente(indice: number) {
    this.componenteSeleccionado = indice;
    this.idComponenteSeleccionado = this.listaCompHTMLRec[indice].id;
    console.log('COMPONENTE SELECCIONADO: ' + this.componenteSeleccionado);
    console.log('ID COMPONENTE SELECCIONADO: ' + this.idComponenteSeleccionado);
  }

  editarOrdenComponentes() {
    
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

  submitForm1() {
    this.agregarParrafo();
    let cargaComponente: any = {
      titulo: this.contenidoForm.value.titulo,
      cuerpo: this.contenidoForm.value.cuerpo,
      elementos: [{ tipo: '', elementos: [''] }],
    };

    try {
      Swal.fire({
        title: 'Subiendo archivo...',
        html: 'Cargando archivo.',
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      this.noticiasSVC
        .cargarComponenteHTMLFirebase(cargaComponente)
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: 'El componente se subió correctamente',
            confirmButtonText: 'Aceptar',
            allowOutsideClick: false,
          }).then((result) => {
            if (result.value) {
              $('#agregarElementoModal').modal('hide');
            }
          });
        });
    } catch (error) {
      console.log(error);
    }
  }
  submitForm2(tipoForm: number) {
    if (tipoForm == 0) {
      this.listaCompHTMLRec[this.componenteSeleccionado].elementos.push({
        tipo: 'ul',
        elementos: [
          this.listaForm.value.elemento1,
          this.listaForm.value.elemento2,
          this.listaForm.value.elemento3,
          this.listaForm.value.elemento4,
        ],
      });
      this.noticiasSVC.agregarComponenteinterior(
        this.listaCompHTMLRec[this.componenteSeleccionado].id,
        this.listaCompHTMLRec[this.componenteSeleccionado].elementos[
          this.listaCompHTMLRec[this.componenteSeleccionado].elementos.length - 1]
      );
      this.transformarContenidoAHtml();
    } else if (tipoForm == 1) {
      this.listaCompHTMLRec[this.componenteSeleccionado].elementos.push({
        tipo: 'img',
        elementos: [
          this.imgURL,
          "width='" + this.selectedTamano.ancho + "%' height='auto'",
        ],
      });
      this.noticiasSVC.agregarComponenteinterior(
        this.listaCompHTMLRec[this.componenteSeleccionado].id,
        this.listaCompHTMLRec[this.componenteSeleccionado].elementos[
          this.listaCompHTMLRec[this.componenteSeleccionado].elementos.length - 1]
      );
      this.transformarContenidoAHtml();
    }
  }

  onDrop(event: CdkDragDrop<any>) {
    moveItemInArray(
      this.listaParrafosRespaldo[this.componenteSeleccionado].elementos,
      event.previousIndex,
      event.currentIndex
    );
    // Intercambia los elementos en la lista
    // REVISO INDICE DEL QUE ESTABA ANTES
    let idElementoDeplazado =
      this.listaParrafosRespaldo[this.componenteSeleccionado].elementos[
        event.currentIndex
      ].id;
    if (event.previousIndex < event.currentIndex) {
      // SI EL INDICE DEL QUE ESTABA ANTES ES MENOR AL INDICE DEL QUE ESTA AHORA
      // SE DEBE DECREMENTAR EL INDICE DE LOS ELEMENTOS QUE ESTAN ENTRE EL INDICE DEL QUE ESTABA ANTES Y EL INDICE DEL QUE ESTA AHORA
      for (let i = event.previousIndex; i < event.currentIndex; i++) {
        let elemento =
          this.listaParrafosRespaldo[this.componenteSeleccionado].elementos[i];
        elemento.orden = elemento.orden - 1;
        this.listaElementosModificados.add(elemento.id);
      }
    } else {
      // SI EL INDICE DEL QUE ESTABA ANTES ES MAYOR AL INDICE DEL QUE ESTA AHORA
      // SE DEBE INCREMENTAR EL INDICE DE LOS ELEMENTOS QUE ESTAN ENTRE EL INDICE DEL QUE ESTABA ANTES Y EL INDICE DEL QUE ESTA AHORA
      for (let i = event.currentIndex; i <= event.previousIndex; i++) {
        let elemento =
          this.listaParrafosRespaldo[this.componenteSeleccionado].elementos[i];
        elemento.orden = elemento.orden + 1;
        this.listaElementosModificados.add(elemento.id);
      }
    }
    //cambia el indice del elemento que se movio
    this.listaParrafosRespaldo[this.componenteSeleccionado].elementos[
      event.currentIndex
    ].orden = event.currentIndex;
    this.listaElementosModificados.add(
      this.listaParrafosRespaldo[this.componenteSeleccionado].elementos[
        event.currentIndex
      ].id
    );
  }



  onDropParrafo(event: CdkDragDrop<any>) {
    moveItemInArray(
      this.listaParrafosRespaldo2,
      event.previousIndex,
      event.currentIndex
    );
    // Intercambia los elementos en la lista
    // REVISO INDICE DEL QUE ESTABA ANTES
    let idElementoDeplazado =
      this.listaParrafosRespaldo;
    if (event.previousIndex < event.currentIndex) {
      // SI EL INDICE DEL QUE ESTABA ANTES ES MENOR AL INDICE DEL QUE ESTA AHORA
      // SE DEBE DECREMENTAR EL INDICE DE LOS ELEMENTOS QUE ESTAN ENTRE EL INDICE DEL QUE ESTABA ANTES Y EL INDICE DEL QUE ESTA AHORA
      for (let i = event.previousIndex; i < event.currentIndex; i++) {
        let elemento =
          this.listaParrafosRespaldo[this.componenteSeleccionado].elementos[i];
        elemento.orden = elemento.orden - 1;
        this.listaElementosModificados.add(elemento.id);
      }
    } else {
      // SI EL INDICE DEL QUE ESTABA ANTES ES MAYOR AL INDICE DEL QUE ESTA AHORA
      // SE DEBE INCREMENTAR EL INDICE DE LOS ELEMENTOS QUE ESTAN ENTRE EL INDICE DEL QUE ESTABA ANTES Y EL INDICE DEL QUE ESTA AHORA
      for (let i = event.currentIndex; i <= event.previousIndex; i++) {
        let elemento =
          this.listaParrafosRespaldo[this.componenteSeleccionado].elementos[i];
        elemento.orden = elemento.orden + 1;
        this.listaElementosModificados.add(elemento.id);
      }
    }
    //cambia el indice del elemento que se movio
    this.listaParrafosRespaldo[this.componenteSeleccionado].elementos[
      event.currentIndex
    ].orden = event.currentIndex;
    this.listaElementosModificados.add(
      this.listaParrafosRespaldo[this.componenteSeleccionado].elementos[
        event.currentIndex
      ].id
    );
  }




  seleccionarYEliminar(indice: number) {
    this.seleccionarComponente(indice);
    this.eliminar(indice);
  }

  eliminar(indice:number) {
    let id = this.idComponenteSeleccionado;
    let titulo = this.listaCompHTMLRec[indice].titulo;
    if(this.listaCompHTMLRec.length > 1){
      Swal.fire({
        icon: 'question',
        title: `Desea eliminar el párrafo? ${titulo}`,
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#c82333',
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          try {
            Swal.fire({
              title: 'Eliminando contenido...',
              html: 'Cargando contenido.',
              didOpen: () => {
                Swal.showLoading();
              },
            }).then((result) => {
              console.log('close');
            });
            this.noticiasSVC.eliminarComponenteHTMLObject(id, titulo);
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
        text: 'No puedes dejarnos sin contenido!',
        footer: '<a href="">Por que tengo este error?</a>'
      })
    }
    
  }


}
