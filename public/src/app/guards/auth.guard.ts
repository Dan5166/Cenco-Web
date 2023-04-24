import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  protected router: Router;



  constructor(protected usuaioSvc:AuthService, router: Router){
    this.router = router;
  }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
): Promise<boolean | UrlTree> {
  const res = await this.usuaioSvc.getCurrentUser();
  if (res) {
    let isAdmin = false;
    const user = await this.usuaioSvc.getUserDetails(res.uid).subscribe(data => {
      //imprime los roles del usuario
      
      console.log("ROL ADMIN: "+data.roles["admin"]);
      console.log("ROL EDITOR: "+data.roles["editor"]);
      console.log("ROL RESPONSABLE: "+data.roles["responsable"]);
      console.log("ROL CCT: "+data.roles["cct"]);
      console.log("ROL USER: "+data.roles["user"]);
      console.log("UID: "+res.uid);
      console.log("DATOS: "+data);
      console.log("DATA EMAIL:  "+data.email);
    });
    const isLogged = res ? true : false;
    if (!isLogged) {
      this.router.navigateByUrl('/login');
      return false;
    } else {
      return true;
    }
    
  } else {
    this.router.navigateByUrl('/login');
    return false;
  }
}

  
}
