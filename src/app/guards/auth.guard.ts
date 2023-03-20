import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {



  constructor(private usuaioSvc:AuthService, private router: Router){}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):Promise<boolean | UrlTree> {

      const user = await this.usuaioSvc.getCurrentUser();
      const isLogged = user? true:false;
      if (!isLogged) {
        this.router.navigateByUrl('/login')
        return false;
      }else{
        return true;
      } 
  }
  
}
