import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ProductosComponent } from './productos/productos.component';
import { PagesComponent } from './pages.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ClientesComponent } from './clientes/clientes.component';
import { ReactiveFormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';
import { GalleriaModule } from 'primeng/galleria';
import { ProductService } from '../services/product.service';
import { PhotoService } from '../services/photo.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ChatComponent } from './chat/chat.component';
import { SobreNosotrosComponent } from './sobre-nosotros/sobre-nosotros.component';
import { EstructuraCctComponent } from './estructura-cct/estructura-cct.component';
import { ContactanosComponent } from './contactanos/contactanos.component';
import { CmsComponent } from './cms/cms.component';
import { HomeComponent } from './home/home.component';
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
import { AgradecimientoReconocimientoComponent } from './agradecimiento-reconocimiento/agradecimiento-reconocimiento.component';
import { NominaAAlguienComponent } from './nomina-a-alguien/nomina-a-alguien.component';
import { ContactoRapidoService } from '../services/contacto-rapido.service';
import { ServicioComponent } from './servicio/servicio.component';
import { DocsComponent } from './docs/docs.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import { BrowserModule } from '@angular/platform-browser';
import { ServicioEspService } from '../services/servicio-esp.service';



@NgModule({
  declarations: [
    DashboardComponent,
    UsuariosComponent,
    ProductosComponent,
    PagesComponent,
    ClientesComponent,
    ChatComponent,
    SobreNosotrosComponent,
    EstructuraCctComponent,
    ContactanosComponent,
    CmsComponent,
    HomeComponent,
    NubesPublicasComponent,
    AyudaServiciosComponent,
    ComentariosComponent,
    EstrategiaCloudComponent,
    OnboardingComponent,
    ArquitecturaFinanzasComponent,
    IngenieriaOperacionesComponent,
    SeguridadComponent,
    ComoNavegarComponent,
    MenuCctComponent,
    LearningPathComponent,
    ReconocimientoExcelenciaComponent,
    AgradecimientoReconocimientoComponent,
    NominaAAlguienComponent,
    ServicioComponent,
    DocsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ReactiveFormsModule,
    NgbModule,
    CarouselModule,
    ButtonModule,
    ImageModule,
    GalleriaModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    NgxExtendedPdfViewerModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    BrowserModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,

  ],
  exports: [
    DashboardComponent,
    UsuariosComponent,
    ProductosComponent,
    
  ],
  providers:[
    PhotoService, ProductService, ContactoRapidoService, ServicioEspService
  ]
})
export class PagesModule { }
