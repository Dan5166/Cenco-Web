export class ProductoModel{
    id?:string;
    nombreProducto:string;
    imgUrl:string;
    info:string;
    docsPdf:string[];
    docsVideo:string[];
    responsables:string[];

    constructor(nombreProducto:string, imgUrl:string, info:string, docsPdf:string[], docsVideo:string[]){
        this.nombreProducto=nombreProducto;
        this.imgUrl=imgUrl;
        this.info=info;
        this.docsPdf=docsPdf;
        this.docsVideo=docsVideo;
    }

}
