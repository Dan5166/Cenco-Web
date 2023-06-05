import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Form, UntypedFormBuilder, Validators } from '@angular/forms';
import { FileItems } from 'src/app/models/file-items';
import { CertificatesService } from 'src/app/services/certificates.service';
import { CoursesService } from 'src/app/services/courses.service';
import { CourseModel } from 'src/app/models/courses-model';
import * as $ from 'jquery';
import { AuthService } from 'src/app/services/auth.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-lp-certificates',
  templateUrl: './lp-certificates.component.html',
  styleUrls: ['./lp-certificates.component.css']
})

export class LpCertificatesComponent implements OnInit {
  hasRoleAdmni = false;

  indice:string;

  imagenes:FileItems[]=[];
  documento= '../../../assets/noimage.png';
  file:any;

  porcentaje:number=30;

  nombreCurso:string = "";
  info:string = "";
  imgUrl:string = "";
  servicio:any;
  docs:string[] = ["1"];
  videos:string[] = ["https://firebasestorage.googleapis.com/v0/b/cenco-web-prot.appspot.com/o/video%2FvideoEjemplo2.mp4?alt=media&token=635a89cb-5954-41aa-a206-1fa56539ef70", "https://firebasestorage.googleapis.com/v0/b/cenco-web-prot.appspot.com/o/video%2FvideoEjemplo2.mp4?alt=media&token=635a89cb-5954-41aa-a206-1fa56539ef70"]

  pdfArray = [
    'https://firebasestorage.googleapis.com/v0/b/cenco-web-prot.appspot.com/o/docs%2FPDF%2Faws-overview.pdf?alt=media&token=5bb2e3b3-e105-49ca-86d9-698417c97117',
  ];

  doscForm=this.fb.group({
    nombre:['',[Validators.required]],
    info:['']
  });

  linkPDF:string="ola";

  courseSubscription:any;

  constructor(private docsSvc:CertificatesService, private route:ActivatedRoute, private fb:UntypedFormBuilder, private certificatesSVC:CoursesService, private authSVC: AuthService) { 
    this.indice=this.route.snapshot.params['id'];

    this.courseSubscription = this.certificatesSVC.getCursito(this.indice).subscribe(data => {
      this.nombreCurso=data.nombre;
      this.info=data.descripcion;
      this.imgUrl=data.imgUrl;
      this.servicio=data;
      this.docs = data.docsPdf;
      this.videos = data.docsVideo;
    });
  }

  OnInit(): void {
    $('#videoModal').on('hidden.bs.modal', function (e) {
      $(this).find('input[type="file"]').val('');
    });
  }

  async ngOnInit() {
    this.hasRoleAdmni = await this.userRoleIn();
  } 

  ngOnDestroy(){
    this.courseSubscription.unsubscribe();
  }

  eliminarCurso(pdf:string, tipo:number){
    this.docsSvc.eliminarDoc(this.indice, pdf, tipo);
  }
  selectChange($event:any){
    if($event.target.files[0]){
      this.imagenes = [];
      this.file = $event.target.files;
      let reader = new FileReader();
      reader.readAsDataURL($event.target.files[0]);
      reader.onload=(event:any)=>{
        this.documento=event.target.result;
        this.imagenes.push({
          archivo:this.file[0],
        });
      }
    }
    else{
      this.documento;
    }
  }

  registrarDocs(tipo:number){
    let cargaDocs:any={
      info:this.indice,
      linkPDF:["https://firebasestorage.googleapis.com/v0/b/cenco-web-prot.appspot.com/o/docs%2FPDF%2Faws-overview.pdf?alt=media&token=5bb2e3b3-e105-49ca-86d9-698417c97117", "https://firebasestorage.googleapis.com/v0/b/cenco-web-prot.appspot.com/o/docs%2FPDF%2Faws-overview.pdf?alt=media&token=5bb2e3b3-e105-49ca-86d9-698417c97117"],
      linkVideo: "tenemoh video",
      nombre: this.doscForm.value.nombre,
    }

    this.docsSvc.cargarCursosFirebase(this.imagenes, cargaDocs, this.indice, tipo);
    this.porcentaje=this.docsSvc.uploadPercent;
    this.limpiarForm();
    this.actualizarCurso();
  }

  limpiarForm(){
    this.doscForm.reset();
    this.documento="../../../assets/noimage.png";
  }

  actualizarCurso(){
    let pdf:string[] = [];
    let cargaCurso:CourseModel={
      nombre:this.nombreCurso,
      descripcion:this.info,
      imgUrl:this.imgUrl,
      docsPdf:this.docs,
      docsVideo:this.videos,
    }

    this.certificatesSVC.editarCurso(this.indice,cargaCurso);
    this.imagenes = [];
  }

  async userRoleIn(){
    const res = await this.authSVC.getCurrentUser();
    if(res){
      let hasRole = false;
      const user = await this.authSVC.getUserDetails(res.uid);
      if(user.roles['admin']){
        hasRole = true;
      }
      return hasRole;
    }
    else{return false;}
  }

}
