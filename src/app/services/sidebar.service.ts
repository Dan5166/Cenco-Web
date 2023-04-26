import { Injectable, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SidebarService{
  userRoles = [];
  menu:any[]=[
    {
      titulo:'CCT',
      icono:'fa-solid fa-cloud',
      submenu:[
        {titulo:'Nubes Públicas', url:'nubes-publicas', icono:'fa-solid fa-network-wired'},
        {titulo:'Sobre Nosotros', url:'sobre-nosotros', icono:'fa-solid fa-people-group'},
        {titulo:'Como Navegar en CencoWeb', url:'como-navegar', icono:'fa-solid fa-compass'},
      ]
    },

    {
      titulo:'Catálogo de Servicios',
      icono:'fa-regular fa-rectangle-list',
      submenu:[
        {titulo:'Servicios', url:'servicio', icono:'fa-solid fa-clipboard-list'},
        {titulo:'Ayuda', url:'ayuda-servicios', icono:'fa-solid fa-circle-question'},
      
      ]
    },
    
    {
      titulo:'Utilidades',
      icono:'fa-solid fa-toolbox',
      submenu:[
        {titulo:'Contáctanos', url:'chat', icono:'fa-solid fa-address-book'},
        {titulo:'Comenta tu Experiencia', url:'comentarios', icono:'fa-solid fa-comment-dots'},
      
      ]
    },
    {
      titulo:'Información Específica',
      icono:'fa-solid fa-newspaper',
      submenu:[
        {titulo:'Estrategia Tecnología Cloud', url:'estrategia-tecnologia-cloud', icono:'fa-solid fa-chess-knight'},
        {titulo:'Onboarding', url:'onboarding', icono:'fa-solid fa-ship'},
        {titulo:'Arquitectura y Finanzas', url:'arquitectura-finanzas', icono:'fa-solid fa-coins'},
        {titulo:'Ingeniería-Operaciones Cloud', url:'ingenieria-operaciones', icono:'fa-solid fa-sliders'},
        {titulo:'Seguridad Cloud', url:'seguridad', icono:'fa-solid fa-lock'},
      
      ]
    },
    {
      titulo:'Menú Interno CCT',
      icono:'fa-solid fa-users-between-lines',
      submenu:[
        {titulo:'Learning Path', url:'learning-path', icono:'fa-solid fa-graduation-cap'},
        {titulo:'Reconocimiento a la excelencia', url:'reconocimiento-excelencia', icono:'fa-solid fa-medal'},
        {titulo:'Nomina a un Compañero', url:'nomina-a-alguien', icono:'fa-solid fa-trophy'},
        {titulo:'Dashboards', url:'dashboard', icono:'fa-solid fa-chart-line'},
      ]
    },
    {
      titulo:'Panel de Responsable',
      icono:'fa-solid fa-clipboard-list',
      submenu:[
        {titulo:'Lista de solicitudes', url:'learning-path', icono:'fa-solid fa-graduation-cap'}
      ]
    },
    {
      titulo:'Panel de Admin',
      icono:'fa-solid fa-screwdriver-wrench',
      submenu:[
        {titulo:'CMS', url:'learning-path', icono:'fa-solid fa-graduation-cap'},
        {titulo:'Manejo de roles', url:'manejo-de-roles', icono:'fa-solid fa-key'},
        {titulo:'Base de solicitudes', url:'learning-path', icono:'fa-solid fa-graduation-cap'},
        {titulo:'Web Analytics', url:'learning-path', icono:'fa-solid fa-graduation-cap'},
      ]
    },
  ]

  constructor(private authSvc:AuthService) { }

  async actualizaMenu(){
    const res = await this.authSvc.getCurrentUser();

    if (res) {
        const user = await this.authSvc.getUserDetails(res.uid);


        


        if(!user.roles["admin"]){
          //Obtengo el indice del menu que quiero eliminar
          let index = this.menu.findIndex(x => x.titulo === "Panel de Admin");
          //Elimino el menu

          //------------------------------------------------------Exclusiones de menu
          //Obtengo el indice del menu que quiero eliminar
          index = this.menu.findIndex(x => x.titulo === "Información Específica");
          //Elimino el menu
          this.menu.splice(index, 1);
          //-------------------------------------------------------Fin exclusiones de menu
          this.menu.splice(index, 1);
          if(!user.roles["responsable"]){
            //Obtengo el indice del menu que quiero eliminar
            let index = this.menu.findIndex(x => x.titulo === "Panel de Responsable");
            //Elimino el menu
            this.menu.splice(index, 1);
            if(!user.roles["cct"]){
              //Obtengo el indice del menu que quiero eliminar
              let index = this.menu.findIndex(x => x.titulo === "Menú Interno CCT");
              //Elimino el menu
              this.menu.splice(index, 1);
              
            }
          }
        }
        
    }
  
  
  }

  

}
