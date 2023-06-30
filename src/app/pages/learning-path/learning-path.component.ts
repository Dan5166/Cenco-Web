import { Component, OnInit } from '@angular/core';
import { Form, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { FileItems } from 'src/app/models/file-items';
import { CourseModel } from 'src/app/models/courses-model';
import { AuthService } from 'src/app/services/auth.service';
import { NotificacionesService } from 'src/app/services/notificaciones.service';
import { CoursesService } from 'src/app/services/courses.service';
import Swal from 'sweetalert2';
  
@Component({
  selector: 'app-learning-path',
  templateUrl: './learning-path.component.html',
  styleUrls: ['./learning-path.component.css']
})
export class LearningPathComponent {
  hasRoleAdmin = false;
  cursos: CourseModel[] = [];
  imagenes: FileItems[] = [];
  cursoSeleccionado: string = '';
  imgURL = '../../../assets/noimage.png';
  file : any;
  courseSubscription: any;

  cursosForm = this.fb.group({
    nombre: ['', [Validators.required]],
    info: ['', [Validators.required]],
  });

  cursosForm2 = this.fb.group({
    nombre: ['', [Validators.required]],
    info: ['', [Validators.required]],
  });

  imgUrlEditando: any;
  nombreEditando: any;
  infoEditando: any;

  constructor(
    private router: Router,
    private fb: UntypedFormBuilder,
    private courseSvc: CoursesService,
    private notificacionesSvc: NotificacionesService,
    private authSvc: AuthService
  ) {}

  async ngOnInit() {
    try {
      Swal.fire({
        title: 'Cargando cursos...',
        html: 'Cargando los cursos.',
        didOpen: () => {
          Swal.showLoading();
        },
      }).then((result) => {
        console.log('close');
      });
      this.courseSubscription = this.courseSvc
        .getCourses()
        .subscribe((res) => { 
          this.cursos = [];
          res.forEach((element: CourseModel) => {
            this.cursos.push({
              ...element,
            });
          });
        });
        this.hasRoleAdmin = await this.userRoleIn();
    } catch (error) {
      console.log(error);
    }
    Swal.close();
  }
  
  ngOnDestroy(): void {
    this.courseSubscription.unsubscribe();
  }

  eliminar(id:any, nombre: string, indice:number){
    Swal.fire({
      title: `Desea eliminar el curso ${nombre}`,
      icon: 'question',
      showConfirmButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#c82333',
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        try{
          Swal.fire({
            title: 'Cargando cursos...',
            html: 'Cargando los cursos.',
            didOpen: () => {
              Swal.showLoading();
            },
          }).then((result) => {
            console.log('close');
          });
          this.courseSvc.eliminarCurso(id, nombre);
          this.registrarNotificacion(
            1,
            'Curso eliminado',
            nombre,
            '../../../assets/noimage.png',
            'Admin',
            'Hoy',
            'https://www.google.com',
            'fas fa-star',
            'float-right text-sm text-danger'
          );
          this.cursos.splice(indice, 1);
        } catch(error){
          console.log(error);
        }
        Swal.close();
      }
    });
  }
  registrarNotificacion(
    order: number,
    nombreNotificacion: string,
    info: string,
    imgUrl: string,
    usuarioResponsable: string,
    fechaSubido: string,
    linkArchivo: string,
    icono: string,
    iconoClass: string
  ) {
    //Si quiero hacer notificaciones personalizadas debo seguir lo que dice productos.component.ts en registrarProducto()
    let cargaNotificacion: any = {
      order,
      nombreNotificacion,
      imgUrl,
      info,
      usuarioResponsable,
      fechaSubido,
      linkArchivo,
      icono,
      iconoClass,
    };

    this.notificacionesSvc.guardarNotificacion(cargaNotificacion);
    //this.limpiarForm();
  }
  limpiarForm() {
    this.cursosForm.reset();
    this.imgURL = '../../../assets/noimage.png';
  }

  setCursoSeleccionado(nombre: any) {
    this.cursoSeleccionado = nombre;
    this.cargarCursoSeleccionado();
  }

  cargarCursoSeleccionado() {
    this.imgUrlEditando = this.cursos.find(
      (cursito) => cursito.id == this.cursoSeleccionado
    )?.imgUrl;
    this.nombreEditando = this.cursos.find(
      (cursito) => cursito.id == this.cursoSeleccionado
    )?.nombre;
    this.infoEditando = this.cursos.find(
      (cursito) => cursito.id == this.cursoSeleccionado
    )?.descripcion;
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
  editarCurso() {
    if (
      this.cursosForm2.value.nombre ||
      this.cursosForm2.value.info ||
      this.imgURL != '../../../assets/noimage.png'
    ) {
      if (this.cursosForm2.value.nombre) {
        this.nombreEditando = this.cursosForm2.value.nombre;
      }
      if (this.cursosForm2.value.info) {
        this.infoEditando = this.cursosForm2.value.info;
      }
      if (this.imgURL != '../../../assets/noimage.png') {
        this.imgUrlEditando = this.imgURL;
        this.courseSvc.guardarFotoEditada(
          this.cursoSeleccionado,
          this.nombreEditando,
          this.imagenes,
          this.infoEditando
        );
      } else {
        this.courseSvc.editarCursoCampo(
          this.cursoSeleccionado,
          this.nombreEditando,
          this.imgUrlEditando,
          this.infoEditando
        );
      }
    }
    //obten el id del producto  a editar

    //crea un nuevo producto
    /*
    let productoNuevo:ProductoModel={
      nombreProducto:this.productosForm.value.nombre,
      info:this.productosForm.value.info,
      imgUrl:producto.imgUrl
    }


    //si el id no es nulo, edita el producto
    if (productoid!=null){
      this.productoSvc.editarProducto(productoid, productoNuevo);
    }
    */
  }
  async userRoleIn() {
    const res = await this.authSvc.getCurrentUser();
    if (res) {
      let hasRole = false;
      const user = await this.authSvc.getUserDetails(res.uid);
      if (user.roles['admin']) {
        hasRole = true;
      }
      return hasRole;
    } else {
      return false;
    }
  }

}
