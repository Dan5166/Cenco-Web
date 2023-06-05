export class CourseModel {
    id?: string;
    nombre: string;
    descripcion: string;
    imgUrl: string;
    docsPdf: string[];
    docsVideo:string[];
  
    constructor(nombre: string, descripcion: string, imgUrl: string, docsPdf:string[], docsVideo:string[]) {
      this.nombre = nombre;
      this.descripcion = descripcion;
      this.imgUrl = imgUrl;
      this.docsPdf = docsPdf;
      this.docsVideo = docsVideo;
    }
  }