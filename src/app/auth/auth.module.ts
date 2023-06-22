import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SendEmailComponent } from './send-email/send-email.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';



@NgModule({
  declarations: [LoginComponent, RegisterComponent, SendEmailComponent, ForgotPasswordComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [LoginComponent, RegisterComponent],
})
export class AuthModule { }
