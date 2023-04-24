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
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  hasRoleAdmin = false;
  productos: ProductoModel[]=[];
  imagenes:FileItems[]=[];
  servicioSeleccionado:string="";
  imgURL= '../../../assets/noimage.png';
  file:any;

  productosForm=this.fb.group({
    nombre:['', [Validators.required]],
    info:['',[Validators.required]]
  });

  productosForm2=this.fb.group({
    nombre:['', [Validators.required]],
    info:['',[Validators.required]]
  });

  imgUrlEditando:any;
  nombreEditando:any;
  infoEditando:any;

  constructor(private router:Router, private fb:UntypedFormBuilder, private productoSvc:ProductosService, private notificacionesSvc:NotificacionesService, private authSvc: AuthService) { }

  async ngOnInit() {
    this.productoSvc.getProductos().subscribe(res=>{
      this.productos=[];
      res.forEach((element:ProductoModel)=>{
        this.productos.push({
          ...element
        })
      })
      console.log("Productos Inicales:  ");
      console.log(this.productos)
    });
    this.hasRoleAdmin = await this.userRoleIn();
  }


  eliminar(id:any, productoNombre:string, indice:number){

    Swal.fire({
      icon:'question',
      title:`Desea eliminar el producto ${productoNombre}`,
      showCancelButton:true,
      cancelButtonText:'Cancelar',
      confirmButtonText:'Aceptar',
      confirmButtonColor:'#c82333',
      allowOutsideClick:false
    }).then((result)=>{
      if(result.isConfirmed){
        this.productoSvc.eliminarProducto(id, productoNombre);
        this.registrarNotificacion(1, "Servicio eliminado", productoNombre, "../../../assets/noimage.png", "Admin", "Hoy", "https://www.google.com", "fas fa-star", "float-right text-sm text-danger");
        this.productos.splice(indice, 1);
        console.log("nuevo arreglo: "+this.productos);
      }
    });
  }



  selectChange($event:any){
    if($event.target.files[0]){
      this.imagenes=[];
      console.log("SIIIIII HAY IMAGEN CHAVAL");
      this.file=$event.target.files;
      let reader=new FileReader();
      reader.readAsDataURL($event.target.files[0]);
      reader.onload=($event:any)=>{
        this.imgURL=$event.target.result;
        console.log("LA URL ES: "+this.imgURL);
        this.imagenes.push({
          archivo:this.file[0]
        });
      }
    }



    else{
      console.log("NO HAY IMAGEN CHAVAL");
      this.imgURL;
    }
  }

  registrarProducto(){
    let pdf:string[]=[];
    let cargaProducto:any={
      nombreProducto:this.productosForm.value.nombre,
      info:this.productosForm.value.info,
      docsPdf:pdf,
    }
    
    this.productoSvc.cargarProductosFirebase(this.imagenes, cargaProducto);
    this.registrarNotificacion(1, "Nuevo Servicio Agregado", cargaProducto.info, this.imgURL, "Admin", "Hoy", "https://www.google.com", "fas fa-star", "float-right text-sm text-danger");
    this.limpiarForm();
  }

  registrarNotificacion(order:number, nombreNotificacion:string, info:string, imgUrl:string, usuarioResponsable:string, fechaSubido:string, linkArchivo:string, icono:string, iconoClass:string){
    //Si quiero hacer notificaciones personalizadas debo seguir lo que dice productos.component.ts en registrarProducto()
    let cargaNotificacion:any={
      order,
      nombreNotificacion,
      imgUrl,
      info,
      usuarioResponsable,
      fechaSubido,
      linkArchivo,
      icono,
      iconoClass
    }


    this.notificacionesSvc.guardarNotificacion(cargaNotificacion);
    //this.limpiarForm();
  }

  limpiarForm(){
    this.productosForm.reset();
    this.imgURL= '../../../assets/noimage.png';
  }


  setServicioSeleccionado(nombre:any){
    this.servicioSeleccionado=nombre;
    console.log("Servicio seleccionado: "+this.servicioSeleccionado);
    this.cargarServicioSeleccionado();
  }

  cargarServicioSeleccionado(){
    console.log("Servicios: "+this.productos.find(producto=>producto.id==this.servicioSeleccionado));
    this.imgUrlEditando = this.productos.find(producto=>producto.id==this.servicioSeleccionado)?.imgUrl;
    this.nombreEditando = this.productos.find(producto=>producto.id==this.servicioSeleccionado)?.nombreProducto;
    this.infoEditando = this.productos.find(producto=>producto.id==this.servicioSeleccionado)?.info;

    console.log("imgUrlEditando: "+this.imgUrlEditando);
    console.log("nombreEditando: "+this.nombreEditando);
    console.log("infoEditando: "+this.infoEditando);
  }

  editarProducto(){
    console.log("Producto a editar: "+this.nombreEditando);
    console.log("Indice: "+this.servicioSeleccionado);
    
    if(this.productosForm2.value.nombre || this.productosForm2.value.info || this.imgURL != '../../../assets/noimage.png'){
      console.log("Si hay info cambiada en: "+this.servicioSeleccionado);
      if(this.productosForm2.value.nombre){this.nombreEditando=this.productosForm2.value.nombre;}
      if(this.productosForm2.value.info){this.infoEditando=this.productosForm2.value.info;}
      if(this.imgURL != '../../../assets/noimage.png'){
        this.imgUrlEditando=this.imgURL;
        this.productoSvc.guardarFotoEditada(this.servicioSeleccionado, this.nombreEditando, this.imagenes, this.infoEditando);
      }
      else{
        this.productoSvc.editarProductoCampo(this.servicioSeleccionado, this.nombreEditando, this.imgUrlEditando, this.infoEditando);
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

  async userRoleIn(){
    const res = await this.authSvc.getCurrentUser();
    if(res){
      let hasRole = false;
      const user = await new Promise<any>((resolve, reject) => {
        this.authSvc.getUserDetails(res.uid).pipe(take(1)).subscribe(
            (data) => {
                console.log("OBTENEMOS USUARIO: ");
                if(data.roles['admin']){
                  //Si es admin
                  hasRole = true;
                }
                resolve(data);
            },
            (error) => {
                console.error(error);
                reject(error);
            }
        );
      });
      console.log("HAS ROLE: "+hasRole);
      return hasRole;
    }
    else{return false;}
  }


}
