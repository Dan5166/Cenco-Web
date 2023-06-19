import { Component, OnInit } from '@angular/core';
import { ProductoModel } from 'src/app/models/productos-model';
import { AuthService } from 'src/app/services/auth.service';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-panel-responsable',
  templateUrl: './panel-responsable.component.html',
  styleUrls: ['./panel-responsable.component.css']
})
export class PanelResponsableComponent implements OnInit {
  productosSubscripcion:any;
  productos: ProductoModel[]=[];
  productosCopia: ProductoModel[]=[];
  constructor(private productosSVC:ProductosService, private authSvc: AuthService) { }

  async ngOnInit() {
    const res = await this.authSvc.getCurrentUser();


    if (res) {
      let hasRole = false;
      const user = res.uid;


      this.productosSubscripcion = this.productosSVC.getProductos().subscribe(res=>{
        this.productos=[];
        res.forEach((element:ProductoModel)=>{
          if (element.responsables.includes(user)) {
            this.productos.push({ ...element });
          }
        })
  
      });

    } else {
    }

    
    
  }
}
