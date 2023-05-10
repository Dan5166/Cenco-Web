export class SlideModel {
    id?: string;
    titulo: string;
    cuerpo: string;
    img: string;
    orden: number;
    constructor(titulo : string, cuerpo : string, img : string, orden : number) {
        this.titulo = titulo;
        this.cuerpo = cuerpo;
        this.img = img;
        this.orden = orden;
    }
}