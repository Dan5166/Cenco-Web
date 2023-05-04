export class SlideModel {
    id?: string;
    titulo: string;
    cuerpo: string;
    img: string;
    constructor(titulo : string, cuerpo : string, img : string) {
        this.titulo = titulo;
        this.cuerpo = cuerpo;
        this.img = img;
    }
}