import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from 'src/app/services/sidebar.service';
import { AuthService } from 'src/app/services/auth.service';

import { faSignOutAlt, faCircleInfo, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faCircleUser } from '@fortawesome/free-regular-svg-icons';



declare var $:any;


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems?:any[];
  usuario:any;
  user:any;
  userImgGoogle:any;
  faSignOutAlt=faSignOutAlt;
  faCircleInfo=faCircleInfo;
  variableIconoAdentro=faCircleInfo;
  faPlus=faPlus;


  constructor(private sideBarServices: SidebarService, private router:Router, private authSvc:AuthService) {
    this.menuItems= this.sideBarServices.menu;
  
   } 
  
  ngOnInit() {
 
    this.obtenerUsuario();
    $('[data-widget="treeview"]').Treeview('init');
   
   }

   async obtenerUsuario(){

    this.usuario = await this.authSvc.getCurrentUser();
    if (this.usuario) {
      if(this.usuario.photoURL){
        this.userImgGoogle= this.usuario.photoURL;  
      }
      else{
        this.userImgGoogle= "../noimage.png";  
      }
      this.user=this.usuario.email;
                 
            
    }

   }
 

  async logout(){
    await this.authSvc.logout(); 
  }

}
