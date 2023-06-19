import { Component, OnInit } from '@angular/core';
import { Form, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { FileItems } from 'src/app/models/file-items';
import { ProductoModel } from 'src/app/models/productos-model';
import { AuthService } from 'src/app/services/auth.service';
import { NotificacionesService } from 'src/app/services/notificaciones.service';
import { ProductosService } from 'src/app/services/productos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
})
export class ProductosComponent implements OnInit {
  hasRoleAdmin = false;
  productos: ProductoModel[] = [];
  imagenes: FileItems[] = [];
  servicioSeleccionado: string = '';
  imgURL = '../../../assets/noimage.png';
  file: any;
  productSubscripcion: any;

  productosForm = this.fb.group({
    nombre: ['', [Validators.required]],
    info: ['', [Validators.required]],
  });

  productosForm2 = this.fb.group({
    nombre: ['', [Validators.required]],
    info: ['', [Validators.required]],
  });

  imgUrlEditando: any;
  nombreEditando: any;
  infoEditando: any;

  constructor(
    private router: Router,
    private fb: UntypedFormBuilder,
    private productoSvc: ProductosService,
    private notificacionesSvc: NotificacionesService,
    private authSvc: AuthService
  ) {}

  async ngOnInit() {
    try {
      Swal.fire({
        title: 'Cargando productos...',
        html: 'Cargando los productos.',
        didOpen: () => {
          Swal.showLoading();
        },
      }).then((result) => {
        console.log('close');
      });
      this.productSubscripcion = this.productoSvc
        .getProductos()
        .subscribe((res) => {
          this.productos = [];
          res.forEach((element: ProductoModel) => {
            this.productos.push({
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

  ngOnDestroy() {
    this.productSubscripcion.unsubscribe();
  }

  eliminar(id: any, productoNombre: string, indice: number) {
    Swal.fire({
      icon: 'question',
      title: `Desea eliminar el producto ${productoNombre}`,
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#c82333',
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          Swal.fire({
            title: 'Cargando productos...',
            html: 'Cargando los productos.',
            didOpen: () => {
              Swal.showLoading();
            },
          }).then((result) => {
            console.log('close');
          });
          this.productoSvc.eliminarProducto(id, productoNombre);
          this.registrarNotificacion(
            1,
            'Servicio eliminado',
            productoNombre,
            '../../../assets/noimage.png',
            'Admin',
            'Hoy',
            'https://www.google.com',
            'fas fa-star',
            'float-right text-sm text-danger'
          );
          this.productos.splice(indice, 1);
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

  registrarProducto() {
    let pdf: string[] = [];
    let cargaProducto: any = {
      nombreProducto: this.productosForm.value.nombre,
      info: this.productosForm.value.info,
      docsPdf: pdf,
      responsables:[""]
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

      this.productoSvc.cargarProductosFirebase(this.imagenes, cargaProducto);
      this.registrarNotificacion(
        1,
        'Nuevo Servicio Agregado',
        cargaProducto.info,
        this.imgURL,
        'Admin',
        'Hoy',
        'https://www.google.com',
        'fas fa-star',
        'float-right text-sm text-danger'
      );
      this.limpiarForm();
    } catch (error) {
      console.log(error);
    }
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
    this.productosForm.reset();
    this.imgURL = '../../../assets/noimage.png';
  }

  setServicioSeleccionado(nombre: any) {
    this.servicioSeleccionado = nombre;
    this.cargarServicioSeleccionado();
  }

  cargarServicioSeleccionado() {
    this.imgUrlEditando = this.productos.find(
      (producto) => producto.id == this.servicioSeleccionado
    )?.imgUrl;
    this.nombreEditando = this.productos.find(
      (producto) => producto.id == this.servicioSeleccionado
    )?.nombreProducto;
    this.infoEditando = this.productos.find(
      (producto) => producto.id == this.servicioSeleccionado
    )?.info;
  }

  editarProducto() {
    if (
      this.productosForm2.value.nombre ||
      this.productosForm2.value.info ||
      this.imgURL != '../../../assets/noimage.png'
    ) {
      if (this.productosForm2.value.nombre) {
        this.nombreEditando = this.productosForm2.value.nombre;
      }
      if (this.productosForm2.value.info) {
        this.infoEditando = this.productosForm2.value.info;
      }
      if (this.imgURL != '../../../assets/noimage.png') {
        this.imgUrlEditando = this.imgURL;
        this.productoSvc.guardarFotoEditada(
          this.servicioSeleccionado,
          this.nombreEditando,
          this.imagenes,
          this.infoEditando
        );
      } else {
        this.productoSvc.editarProductoCampo(
          this.servicioSeleccionado,
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
