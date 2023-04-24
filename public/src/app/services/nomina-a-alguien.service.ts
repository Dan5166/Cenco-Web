import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import Swal from 'sweetalert2';
import { NominacionModel } from '../models/nominacion-model';

@Injectable({
  providedIn: 'root'
})
export class NominaAAlguienService {

  constructor(private db:AngularFirestore) { }

  cargarContactoFirebase(nomina:NominacionModel){
    this.guardarNomina({nominado:nomina.nominado, info:nomina.info, usuarioResponsable:nomina.usuarioResponsable, fechaSubido:nomina.fechaSubido});
  }

  async guardarNomina(nominacion:{nominado:string, info:string, usuarioResponsable:string, fechaSubido:string}):Promise<any>{
    try{
      
      return await this.db.collection('nominaciones').add(nominacion);

    }catch(error){
      console.log("NO FUNCIONA------------------------------------");
      





      console.log(error);
    }
  }
}
