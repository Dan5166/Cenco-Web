import { Component } from '@angular/core';
import { NoticiaModel } from 'src/app/models/noticia-model';
import { SlideModel } from 'src/app/models/slide-model';
import { ContactoRapidoService } from 'src/app/services/contacto-rapido.service';
import { NoticiaServiceService } from 'src/app/services/noticia-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  asuntoContacto = '';
  infoContacto = '';
  listaNovedades: NoticiaModel[] = [{
    titulo: 'Novedad Vacía',
    cuerpo: 'Agrega novedades desde el CMS si tienes permisos de administrador.',
    img: '../../../assets/noimage.png'
  }];
  listaCarrusel: SlideModel[] = [];
  primerElementoCarrusel = {
    img: 'https://images.unsplash.com/photo-1561736778-92e52a7769ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    titulo: 'Slider Vacío',
    cuerpo: 'Agrega imágenes al slider desde el CMS si tienes permisos de administrador.',
  };
  noticiasSubscripcion: any;
  carruselSubscripcion: any;

  novedadSeleccionada: number = 0;

  constructor(
    private contactoRapidoService: ContactoRapidoService,
    private noticiasSVC: NoticiaServiceService
  ) {}

  async ngOnInit() {
    try {
      Swal.fire({
        title: 'Cargando contenido...',
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
          this.creaCarrusel();
        });
        
    } catch (error) {
      console.log(error);
    }

    
    Swal.close();
  }

  enviarConsultaRapida() {
    let cargaConsulta: any = {
      asuntoContacto: this.asuntoContacto,
      info: this.infoContacto,
      usuarioResponsable: 'Juanito',
      fechaSubido: 'Hoy',
    };
    this.contactoRapidoService.cargarContactoFirebase(cargaConsulta);
  }

  creaCarrusel() {
    if(this.listaCarrusel){
      this.primerElementoCarrusel = this.listaCarrusel[0];
      console.log("Primer elemento Carrusel:  "+this.listaCarrusel[0]);
      this.listaCarrusel.shift();
    }
    else{console.log("No hay elementos en el carrusel 2");}
    
  }

  setNovedadSeleccionada(index: number) {
    this.novedadSeleccionada = index;
  }

}
