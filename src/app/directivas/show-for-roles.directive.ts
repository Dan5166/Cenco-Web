import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Subscription, distinctUntilChanged, map, tap } from 'rxjs';

@Directive({
  selector: '[appShowForRoles]',
})
export class ShowForRolesDirective implements OnInit{
  @Input ('appShowForRoles') allowedRoles?: string[];
  rolesUsuario:string[]=[];
  subscription:Subscription | undefined;


  constructor(private authSvc:AuthService, private viewContainerRef:ViewContainerRef,private TemplateRef:TemplateRef<any>) {

  }

  async ngOnInit(): Promise<void> {
    console.log("Entramos a la directiva con roles:   "+this.allowedRoles);
    const user = await this.authSvc.getCurrentUser();
    if(user){

      this.subscription = this.authSvc.getUserDetails(user.uid).pipe(

            map((data) => Boolean(data.roles["admin"] && this.allowedRoles?.includes("admin"))),
            //para que no se añadan muchas veces
            distinctUntilChanged(),
            tap((isAdmin) => isAdmin? this.viewContainerRef.createEmbeddedView(this.TemplateRef):this.viewContainerRef.clear())
      ).subscribe();
      
    }
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}

