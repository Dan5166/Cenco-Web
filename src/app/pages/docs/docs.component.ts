import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Form, UntypedFormBuilder, Validators } from '@angular/forms';
import { FileItems } from 'src/app/models/file-items';
import { DocsService } from 'src/app/services/docs.service';
import { ProductosService } from 'src/app/services/productos.service';
import { ProductoModel } from 'src/app/models/productos-model';
import * as $ from 'jquery';
import { AuthService } from 'src/app/services/auth.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.css']
})
export class DocsComponent implements OnInit{
  hasRoleAdmin = false;

  indice:string;
  
  imagenes:FileItems[]=[];
  documento= '../../../assets/noimage.png';
  file:any;

  porcentaje:number=30;

  nombreProducto:string = "";
  info:string = "";
  imgUrl:string = "";
  servicio:any;
  docs:string[] = ["1"];
  videos:string[] = ["https://firebasestorage.googleapis.com/v0/b/cenco-web-prot.appspot.com/o/video%2FvideoEjemplo2.mp4?alt=media&token=635a89cb-5954-41aa-a206-1fa56539ef70", "https://firebasestorage.googleapis.com/v0/b/cenco-web-prot.appspot.com/o/video%2FvideoEjemplo2.mp4?alt=media&token=635a89cb-5954-41aa-a206-1fa56539ef70"];
  responsables:string[] = ["1"];
  pdfArray = [
    'https://firebasestorage.googleapis.com/v0/b/cenco-web-prot.appspot.com/o/docs%2FPDF%2Faws-overview.pdf?alt=media&token=5bb2e3b3-e105-49ca-86d9-698417c97117',
  ];

  doscForm=this.fb.group({
    nombre:['',[Validators.required]],
    info:['']
  });

  linkPDF:string="ola";

  productoSubscripcion:any;

  constructor(private docsSvc:DocsService,private route:ActivatedRoute, private fb:UntypedFormBuilder, private productoSVC:ProductosService, private authSvc: AuthService) { 
    this.indice=this.route.snapshot.params['id'];


    this.productoSubscripcion = this.productoSVC.getProducto(this.indice).subscribe(data => {
      this.nombreProducto=data.nombreProducto;
      this.info=data.info;
      this.imgUrl=data.imgUrl;
      this.servicio=data;
      this.docs = data.docsPdf;
      this.videos = data.docsVideo;
      this.responsables = data.responsables;
    });


  }

  OnInit(): void {
    $('#videoModal').on('hidden.bs.modal', function (e) {
      $(this).find('input[type="file"]').val("");
    });
  }



  async ngOnInit(){
    this.hasRoleAdmin = await this.userRoleIn();
  }

  ngOnDestroy() {
    this.productoSubscripcion.unsubscribe();
  }

  selectChange($event:any){
    if($event.target.files[0]){
      this.imagenes=[];
      this.file=$event.target.files;
      let reader=new FileReader();
      reader.readAsDataURL($event.target.files[0]);
      reader.onload=($event:any)=>{
        this.documento=$event.target.result;
        this.imagenes.push({
          archivo:this.file[0]
        });
      }
    }



    else{
      this.documento;
    }
  }


  registrarDocs(tipo:number){
    let cargaDocs:any={
      info : this.indice,
      linkPDF: ["https://firebasestorage.googleapis.com/v0/b/cenco-web-prot.appspot.com/o/docs%2FPDF%2Faws-overview.pdf?alt=media&token=5bb2e3b3-e105-49ca-86d9-698417c97117", "https://firebasestorage.googleapis.com/v0/b/cenco-web-prot.appspot.com/o/docs%2FPDF%2Faws-overview.pdf?alt=media&token=5bb2e3b3-e105-49ca-86d9-698417c97117"],
      linkVideo : "Link del Video Chaval",
      nombre : this.doscForm.value.nombre
    }
    

    this.docsSvc.cargarProductosFirebase(this.imagenes, cargaDocs, this.indice, tipo);
    this.porcentaje=this.docsSvc.uploadPercent;
    this.limpiarForm();
    this.actualizarServicio();
  }

  limpiarForm(){
    this.doscForm.reset();
    this.documento= '../../../assets/noimage.png';
  }

  actualizarServicio(){
    let pdf:string[]=[];
    let cargaProducto:ProductoModel={
      nombreProducto:this.nombreProducto,
      imgUrl:this.imgUrl,
      info:this.info,
      docsPdf:this.docs,
      docsVideo:this.videos,
      responsables:this.responsables
    }


    this.productoSVC.editarProducto(this.indice,cargaProducto);
    this.imagenes=[];
  }

  eliminarDoc(pdf:string, tipo:number){
    this.docsSvc.eliminarDoc(this.indice, pdf, tipo);
  }
 
  async userRoleIn(){
    const res = await this.authSvc.getCurrentUser();
    if(res){
      let hasRole = false;
      const user = await this.authSvc.getUserDetails(res.uid);
      if(user.roles['admin']){
        hasRole = true;
      }
      return hasRole;
    }
    else{return false;}
  }


}
