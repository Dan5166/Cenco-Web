import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { UserModel } from '../models/user-model';
import { Observable, map, switchMap, take } from 'rxjs';
import { User } from 'firebase/auth';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ManejoUsuariosService {
  private productosCollection: AngularFirestoreCollection<UserModel>;
  constructor(private db: AngularFirestore, private authSvc: AuthService) {
    this.productosCollection = db.collection<UserModel>('users');
  }

  getusuario(id: string): Observable<UserModel> {
    return this.db
      .collection('user')
      .doc(id)
      .valueChanges() as Observable<UserModel>;
  }

  getUsuarios(): Observable<UserModel[]> {
    return this.productosCollection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as UserModel;
          data.id = a.payload.doc.id;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }

  async cambiarRol(rol: string, id?: string) {
    //recibir el array de pdfs
    let listaRoles = {};

    const res = id;

    if (res) {
      const user = await this.authSvc.getUserDetails(res);
      if (user && user.roles) {
        let admin = user.roles.admin;
        let responsable = user.roles.responsable;
        let cct = user.roles.cct;
        if (rol == 'admin') {
          if (user.roles.admin) {
            admin = false;
          } else {
            admin = true;
          }
        }

        if (rol == 'responsable') {
          if (user.roles.responsable) {
            responsable = false;
          } else {
            responsable = true;
          }
        }

        if (rol == 'cct') {
          if (user.roles.cct) {
            cct = false;
          } else {
            cct = true;
          }
        }

        listaRoles = {
          admin: admin,
          responsable: responsable,
          cct: cct,
        };

        const usuarioRef = this.db.collection<UserModel>('users').doc(id);
        this.db
          .collection<UserModel>('users')
          .doc(id)
          .get()
          .pipe(
            take(1),
            switchMap((doc) => {
              let data = doc.data();
              return usuarioRef.update({ roles: listaRoles });
            })
          )
          .subscribe({
            next: () => {},
            error: (error) => {},
          });
      } else {
        // Si no es un administrador, redirigir al inicio de sesión
        alert('Acceso denegado');
        return false;
      }
    }
    return false;
  }
}
