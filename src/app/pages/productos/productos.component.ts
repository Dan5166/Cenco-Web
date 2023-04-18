import { Component, OnInit } from '@angular/core';
import { Form, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FileItems } from 'src/app/models/file-items';
import { ProductoModel } from 'src/app/models/productos-model';
import { NotificacionesService } from 'src/app/services/notificaciones.service';
import { ProductosService } from 'src/app/services/productos.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  productos: ProductoModel[]=[];
  imagenes:FileItems[]=[];
  imgURL= '../../../assets/noimage.png';
  file:any;

  productosForm=this.fb.group({
    nombre:['', [Validators.required]],
    info:['',[Validators.required]]
  });


  constructor(private router:Router, private fb:UntypedFormBuilder, private productoSvc:ProductosService, private notificacionesSvc:NotificacionesService) { }

  ngOnInit(): void {
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



  editarProducto(producto:ProductoModel, indice:number){
    console.log("Producto a editar: "+producto);
    console.log("Indice: "+indice);
    //obten el id del producto  a editar
    let productoid=producto.id;



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

}
