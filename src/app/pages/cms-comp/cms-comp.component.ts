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
  carruselSubscripcion: any;
  listaNovedades: NoticiaModel[] = [
  ];
  imagenes: FileItems[] = [];
  servicioSeleccionado: string = '';
  imgURL = '../../../assets/noimage.png';
  file: any;
  listaCarrusel: SlideModel[] = [];
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

  constructor(
    private noticiasSVC: NoticiaServiceService,
    private fb: UntypedFormBuilder,
  ) {}

  async ngOnInit() {
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
      this.noticiasSubscripcion = this.noticiasSVC
        .getNoticias()
        .subscribe((res) => {
          this.listaNovedades = [];
          res.forEach((element: NoticiaModel) => {
            this.listaNovedades.push({
              ...element,
            });
          });
        });
        this.carruselSubscripcion = this.noticiasSVC
        .getSlides()
        .subscribe((res) => {
          this.listaCarrusel = [];
          res.forEach((element: SlideModel) => {
            this.listaCarrusel.push({
              ...element,
            });
          });
        });
        
    } catch (error) {
      console.log(error);
    }
    Swal.close();
  }

  eliminar(id: any, noticiaNombre: string, indice: number) {
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

  eliminarSlide(id: any, slideNombre: string, indice: number) {
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

  registrarSlide() {
    let cargaSlide: any = {
      titulo: this.slidesForm.value.titulo,
      cuerpo: this.slidesForm.value.cuerpo,
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

      this.noticiasSVC.cargarSlideFirebase(this.imagenes, cargaSlide);
      this.limpiarForm();
    } catch (error) {
      console.log(error);
    }
  }
}
