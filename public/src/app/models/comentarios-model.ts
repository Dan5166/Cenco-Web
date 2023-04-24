export class ComentariosModel {
    id?: string;
    asunto: string;
    comment: string;
    usuarioResponsable: string;
    fechaSubido: string;
    constructor(asunto : string, comment : string, usuarioResponsable : string, fechaSubido : string) {
        this.asunto = asunto;
        this.comment = comment;
        this.usuarioResponsable = usuarioResponsable;
        this.fechaSubido = fechaSubido;
    }
}