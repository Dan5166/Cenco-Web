import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  public  forgotPasswordForm = this.fb.group ({
    email: [ '', [Validators.required, Validators.email]],
    
  });

  emailPass:any;

  constructor(private fb:UntypedFormBuilder, private router:Router, private authSvc:AuthService) { }

  ngOnInit(): void {
  }

  async resetPass(){
    try {
      this.emailPass = this.forgotPasswordForm.value.email;
      await this.authSvc.resetPassword(this.emailPass).then(()=>{

        Swal.fire({
          icon: 'success',
          title: 'Se le envio a su email el link para reseteo',
          confirmButtonText:'Aceptar',
          allowOutsideClick:false
        }).then((result)=>{
          if (result.value) {
            this.router.navigateByUrl('/login');
          }
        })
  
      })      
    } catch (error) {
      console.log(error);
    }


  
  }

}
