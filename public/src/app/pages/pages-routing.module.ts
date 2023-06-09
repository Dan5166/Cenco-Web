import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ProductosComponent } from './productos/productos.component';
import { ChatComponent } from './chat/chat.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from '../guards/auth.guard';
import { SobreNosotrosComponent } from './sobre-nosotros/sobre-nosotros.component';
import { NubesPublicasComponent } from './nubes-publicas/nubes-publicas.component';
import { AyudaServiciosComponent } from './ayuda-servicios/ayuda-servicios.component';
import { ComentariosComponent } from './comentarios/comentarios.component';
import { EstrategiaCloudComponent } from './estrategia-cloud/estrategia-cloud.component';
import { OnboardingComponent } from './onboarding/onboarding.component';
import { ArquitecturaFinanzasComponent } from './arquitectura-finanzas/arquitectura-finanzas.component';
import { IngenieriaOperacionesComponent } from './ingenieria-operaciones/ingenieria-operaciones.component';
import { SeguridadComponent } from './seguridad/seguridad.component';
import { ComoNavegarComponent } from './como-navegar/como-navegar.component';
import { MenuCctComponent } from './menu-cct/menu-cct.component';
import { LearningPathComponent } from './learning-path/learning-path.component';
import { ReconocimientoExcelenciaComponent } from './reconocimiento-excelencia/reconocimiento-excelencia.component';
import { NominaAAlguienComponent } from './nomina-a-alguien/nomina-a-alguien.component';
import { AgradecimientoReconocimientoComponent } from './agradecimiento-reconocimiento/agradecimiento-reconocimiento.component';
import { ServicioComponent } from './servicio/servicio.component';
import { DocsComponent } from './docs/docs.component';
import { AdminGuard } from '../guards/admin.guard';


const routes:Routes=[
  {path:'home', component:PagesComponent, canActivate:[AuthGuard],
  children:[
    {path:'', component:HomeComponent, data:{titulo:'Home'}, canActivate:[AuthGuard]}, 

    {path:'nubes-publicas', component:NubesPublicasComponent, data:{titulo:'Nubes Públicas'}, canActivate:[AuthGuard]},
    {path:'sobre-nosotros', component:SobreNosotrosComponent, data:{titulo:'Sobre Nosotros'}, canActivate:[AuthGuard]},

    {path:'servicio', component:ProductosComponent, data:{titulo:'Servicios'}, canActivate:[AuthGuard]},
    {path:'ayuda-servicios', component:AyudaServiciosComponent, data:{titulo:'Ayuda'}, canActivate:[AuthGuard]},

    {path:'chat', component:ChatComponent,data:{titulo:'Abre tu caso de contacto'}, canActivate:[AuthGuard]},
    {path:'comentarios', component:ComentariosComponent,data:{titulo:'Comentarios'}, canActivate:[AuthGuard]},
    
    {path:'estrategia-tecnologia-cloud', component:EstrategiaCloudComponent, data:{titulo:'Estrategia Tecnología Cloud'}, canActivate:[AuthGuard]},
    {path:'onboarding', component:OnboardingComponent, data:{titulo:'Onboarding'}, canActivate:[AuthGuard]},
    {path:'arquitectura-finanzas', component:ArquitecturaFinanzasComponent, data:{titulo:'Arquitectura y Finanzas'}, canActivate:[AuthGuard]},
    {path:'ingenieria-operaciones', component:IngenieriaOperacionesComponent, data:{titulo:'Ingeniería-Operaciones Cloud'}, canActivate:[AuthGuard]},
    {path:'seguridad', component:SeguridadComponent, data:{titulo:'Seguridad Cloud'}, canActivate:[AuthGuard]},
    {path:'como-navegar', component:ComoNavegarComponent, data:{titulo:'¿Cómo Navegar?'}, canActivate:[AuthGuard]},
    {path:'menu-cct', component:MenuCctComponent, data:{titulo:'Menu Interno CCT'}, canActivate:[AuthGuard]},
    {path:'learning-path', component:LearningPathComponent, data:{titulo:'¡Aprendamos Juntos!'}, canActivate:[AdminGuard]},
    {path:'reconocimiento-excelencia', component:ReconocimientoExcelenciaComponent, data:{titulo:'Reconozcamos nuestros esfuerzos'}, canActivate:[AdminGuard]},
    {path:'agradecimiento-reconocimiento', component:AgradecimientoReconocimientoComponent, data:{titulo:'Agradecimiento y Reconocimiento'}, canActivate:[AdminGuard]},
    {path:'nomina-a-alguien', component:NominaAAlguienComponent, data:{titulo:'Nomina a un compañero del CCT'}, canActivate:[AdminGuard]},
    {path:'dashboard', component:DashboardComponent, data:{titulo:'Dashboard'}, canActivate:[AdminGuard]},
    {path:'servicio/:id', component:ServicioComponent, data:{titulo:'Servicio'}, canActivate:[AuthGuard]},
    {path:'servicio/:id/docs', component:DocsComponent, data:{titulo:'Documentación'} , canActivate:[AuthGuard]},
    
]}];


@NgModule({
 
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule],
  providers:[AuthGuard]
})
export class PagesRoutingModule { }
