import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

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
  ]

}
