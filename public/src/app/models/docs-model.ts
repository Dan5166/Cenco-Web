export class DocsModel {
    id?: string;
    info: string;
    docsPdf: string[];
    linkVideo: string;
    nombre: string;
    constructor(info : string, docsPdf : string[], linkVideo : string, nombre : string) {
        this.info = info;
        this.docsPdf = docsPdf;
        this.linkVideo = linkVideo;
        this.nombre = nombre;
    }
}