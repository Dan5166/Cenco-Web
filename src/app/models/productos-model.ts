export class ProductoModel{
    id?:string;
    nombreProducto:string;
    imgUrl:string;
    info:string;

    constructor(nombreProducto:string, imgUrl:string, info:string){
        this.nombreProducto=nombreProducto;
        this.imgUrl=imgUrl;
        this.info=info;
    }

}
