import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user-model';
import { ManejoUsuariosService } from 'src/app/services/manejo-usuarios.service';

@Component({
  selector: 'app-manejo-de-roles',
  templateUrl: './manejo-de-roles.component.html',
  styleUrls: ['./manejo-de-roles.component.css'],
})
export class ManejoDeRolesComponent implements OnInit{
  userSubscripcion:any;
  usuarios: UserModel[]=[];

  constructor(private userSvc:ManejoUsuariosService) {}

  async ngOnInit() {
    this.userSubscripcion = this.userSvc.getUsuarios().subscribe(res=>{
      this.usuarios=[];
      res.forEach((element:UserModel)=>{
        this.usuarios.push({
          ...element
        })
      })

    });

  }

  public async cambiarRol(rol:string, id?:string) {
    const olaalo = await this.userSvc.cambiarRol(rol, id);
  }
}
