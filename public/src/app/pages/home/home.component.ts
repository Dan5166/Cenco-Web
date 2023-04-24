import { Component } from '@angular/core';
import { ContactoRapidoService } from 'src/app/services/contacto-rapido.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  asuntoContacto = '';
  infoContacto = '';

  constructor(private contactoRapidoService:ContactoRapidoService) { }

  enviarConsultaRapida(){
    let cargaConsulta:any={
      asuntoContacto:this.asuntoContacto, info:this.infoContacto, usuarioResponsable:'Juanito', fechaSubido:'Hoy'
    }
    this.contactoRapidoService.cargarContactoFirebase(cargaConsulta);
  }
}
