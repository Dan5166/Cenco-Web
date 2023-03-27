export class NominacionModel{
    id?:string;
    nominado:string;
    info:string;
    usuarioResponsable:string;
    fechaSubido:string;

    constructor(nominado:string, info:string, usuarioResponsable:string, fechaSubido:string){
        this.nominado=nominado;
        this.info=info;
        this.usuarioResponsable=usuarioResponsable;
        this.fechaSubido=fechaSubido;
    }
}