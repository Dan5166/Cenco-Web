export class NoticiaModel {
    id?: string;
    titulo: string;
    cuerpo: string;
    img: string;
    fecha?: Date;
    constructor(titulo : string, cuerpo : string, img : string, fecha?: Date) {
        this.titulo = titulo;
        this.cuerpo = cuerpo;
        this.img = img;
        this.fecha = fecha || new Date();
    }
}