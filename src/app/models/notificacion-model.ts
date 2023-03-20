export class NotificacionModel{
    id?:string;
    order:number;
    nombreNotificacion:string;
    imgUrl:string;
    info:string;
    usuarioResponsable:string;
    fechaSubido:string;
    linkArchivo:string;
    icono:string;
    iconoClass:string;


    constructor(order:number,nombreNotificacion:string, imgUrl:string, info:string, usuarioResponsable:string, fechaSubido:string, linkArchivo:string, icono:string, iconoClass:string){
        this.order=order;
        this.nombreNotificacion=nombreNotificacion;
        this.imgUrl=imgUrl;
        this.info=info;
        this.usuarioResponsable=usuarioResponsable;
        this.fechaSubido=fechaSubido;
        this.linkArchivo=linkArchivo;
        this.icono=icono;
        this.iconoClass=iconoClass;
    }

}
