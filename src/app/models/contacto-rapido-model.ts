export class ContactoRapidoModel{
    id?:string;
    asuntoContacto:string;
    info:string;
    usuarioResponsable:string;
    fechaSubido:string;


    constructor(asuntoContacto:string, info:string, usuarioResponsable:string, fechaSubido:string){
        this.asuntoContacto=asuntoContacto;
        this.info=info;
        this.usuarioResponsable=usuarioResponsable;
        this.fechaSubido=fechaSubido;
    }

}