import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from './auth.guard';

@Injectable({
        providedIn: 'root'
  })
    export class AdminGuard extends AuthGuard {
    
        constructor(protected override usuaioSvc:AuthService, protected override router: Router){
            super(usuaioSvc, router);
        }

        
        override async canActivate(
            route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot
        ): Promise<boolean | UrlTree> {
            const res = await this.usuaioSvc.getCurrentUser();

if (res) {

    const user = await new Promise<any>((resolve, reject) => {
        this.usuaioSvc.getUserDetails(res.uid).subscribe(
            (data) => {
                resolve(data);
            },
            (error) => {
                console.error(error);
                reject(error);
            }
        );
    });

    if (user && user.roles && user.roles.admin) {
        // Si es un administrador, permitir el acceso
        return true;
    } else {
        // Si no es un administrador, redirigir al inicio de sesión
        alert("Acceso denegado")
        return false;
    }
}

return false;

        }
        



    }


