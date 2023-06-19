export class ComponenteHTMLObjectModel {
    id?: string;
    titulo: string;
    cuerpo: string;
    fecha?: Date;
    elementos: [{tipo: string, elementos: string[]}];
    constructor(titulo : string, cuerpo : string, elementos : [{tipo: string, elementos: string[]}], fecha?: Date) {
        this.titulo = titulo;
        this.cuerpo = cuerpo;
        this.elementos = elementos;
        this.fecha = fecha || new Date();
    }
}