import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SendEmailComponent } from './send-email/send-email.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const routes:Routes =[
  {path:'login', component: LoginComponent},
  {path:'register', component: RegisterComponent},
  {path:'verificacion-email', component: SendEmailComponent},
  {path:'forgot-password', component: ForgotPasswordComponent},
]


@NgModule({
 
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AuthRoutingModule { }
