import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NopageFoundComponent } from './nopage-found/nopage-found.component';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { PagesRoutingModule } from './pages/pages-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


const routes:Routes=[

  {path:'', redirectTo:'/login', pathMatch:'full'},
  {path:'**', component:NopageFoundComponent}

]

@NgModule({

  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    AuthRoutingModule,
    FontAwesomeModule
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
