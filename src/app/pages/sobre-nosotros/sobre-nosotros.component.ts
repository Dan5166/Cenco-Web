import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-sobre-nosotros',
  templateUrl: './sobre-nosotros.component.html',
  styleUrls: ['./sobre-nosotros.component.css']
})
export class SobreNosotrosComponent implements OnInit {
  async ngOnInit() {
    try {
      Swal.fire({
        title: 'Cargando página sobre nosotros...',
        html: 'Cargando sobre nosotros.',
        didOpen: () => {
          Swal.showLoading();
        },
      }).then((result) => {
        console.log('close');
      });
      
      //how to make a delay in js
      await new Promise((resolve) => setTimeout(resolve, 800));
    } catch (error) {
      console.log(error);
    }
    Swal.close();
  }
}
