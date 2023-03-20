import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.css']
})
export class SendEmailComponent implements OnInit {

  user$: Observable<any> = this.authSvc.authUser.user

  constructor(private authSvc: AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  onSendEmail(){
  Swal.fire({
    icon: 'success',
    title: 'Se te volvio a enviar la verificación',
    confirmButtonText:'Aceptar',
    allowOutsideClick:false
  }).then((result) => {
    if(result.value){
      this.authSvc.sendVerificactionEmail();
      this.router.navigateByUrl('/login');
    }
  })
  }
}
