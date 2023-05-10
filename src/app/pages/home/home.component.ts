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
    titulo: 'Cargando...',
    cuerpo: '',
    img: '../../../assets/dist/img/cargando.gif',
  }];
  listaCarrusel: SlideModel[] = [];
  primerElementoCarrusel = {
    img: '../../../assets/noimage.png',
    titulo: 'cargando...',
    cuerpo: '',
  };
  noticiasSubscripcion: any;
  carruselSubscripcion: any;

  novedadSeleccionada: number = 0;

  constructor(
    private contactoRapidoService: ContactoRapidoService,
    private noticiasSVC: NoticiaServiceService
  ) {}

  async ngOnInit() {
    let indicadorCarrusel = false;
    let indicadorNoticias = false;
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
        .getNoticias2()
        .subscribe((res) => {
          this.listaNovedades = [];
          res.forEach((element: NoticiaModel) => {
            this.listaNovedades.push({
              ...element,
            });
          });
          if(this.listaNovedades.length > 0){
            this.listaNovedades.forEach(element => {
              //Mostrar fecha en formato dd/mm/yyyy
              
              
              
            });
          }
          indicadorNoticias = true;
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
          this.creaCarrusel();
          indicadorCarrusel = true;
          if(indicadorNoticias && indicadorCarrusel){
            Swal.close();
          }
        });
        
    } catch (error) {
      console.log(error);
    }
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
