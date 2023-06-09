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

  pdfArray = [
    'https://firebasestorage.googleapis.com/v0/b/cenco-web-prot.appspot.com/o/docs%2FPDF%2Faws-overview.pdf?alt=media&token=5bb2e3b3-e105-49ca-86d9-698417c97117',
  ];

  doscForm=this.fb.group({
    nombre:['',[Validators.required]],
    info:['']
  });

  linkPDF:string="ola";
  constructor(private docsSvc:DocsService,private route:ActivatedRoute, private fb:UntypedFormBuilder, private productoSVC:ProductosService, private authSvc: AuthService) { 
    this.indice=this.route.snapshot.params['id'];


    this.productoSVC.getProducto(this.indice).subscribe(data => {
      console.log("DATOS: "+data);
      console.log("DATA NOMBRE:  "+data.nombreProducto);
      this.nombreProducto=data.nombreProducto;
      console.log("DATA INFO:  "+data.info);
      this.info=data.info;
      console.log("DATA IMG:  "+data.imgUrl);
      this.imgUrl=data.imgUrl;
      this.servicio=data;
      this.docs = data.docsPdf;
      console.log("DATA DOCS:  "+this.docs);
      this.videos = data.docsVideo;
    });


  }

  OnInit(): void {
    $('#videoModal').on('hidden.bs.modal', function (e) {
      $(this).find('input[type="file"]').val("");
    });
  }



  async ngOnInit(){
    console.log("ID: "+this.indice);
    this.hasRoleAdmin = await this.userRoleIn();
  }

  selectChange($event:any){
    if($event.target.files[0]){
      this.imagenes=[];
      console.log("SIIIIII HAY IMAGEN CHAVAL");
      this.file=$event.target.files;
      let reader=new FileReader();
      reader.readAsDataURL($event.target.files[0]);
      reader.onload=($event:any)=>{
        this.documento=$event.target.result;
        console.log("LA URL ES: "+this.documento);
        this.imagenes.push({
          archivo:this.file[0]
        });
      }
    }



    else{
      console.log("NO HAY IMAGEN CHAVAL");
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
    console.log("PORCENTAJE: "+this.porcentaje);
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
      docsVideo:this.videos
    }


    this.productoSVC.editarProducto(this.indice,cargaProducto);
    console.log("ACTUALIZADO")
    this.imagenes=[];
  }

  eliminarDoc(pdf:string, tipo:number){
    this.docsSvc.eliminarDoc(this.indice, pdf, tipo);
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
