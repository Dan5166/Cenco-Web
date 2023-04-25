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
