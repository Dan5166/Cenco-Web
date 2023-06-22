import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, firstValueFrom, map, of, switchMap } from 'rxjs';
import {
  GoogleAuthProvider,
  OAuthProvider,
  getAuth,
  Auth,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signInWithCredential,
} from 'firebase/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserModel } from '../models/user-model';
import { user } from '@angular/fire/auth';

const provider = new OAuthProvider('oidc.portal-web-cct');



@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    public authUser: AngularFireAuth,
    private firestore: AngularFirestore,
  ) {
  }


  async resetPassword(email: string): Promise<void> {
    try {
      return await this.authUser.sendPasswordResetEmail(email);
    } catch (error) {}
  }

  async sendVerificactionEmail(): Promise<void> {
    return (await this.authUser.currentUser)?.sendEmailVerification();
  }

  async loginGoogle(): Promise<any> {
    try {
      return this.authUser
        .signInWithPopup(new GoogleAuthProvider())
        .finally(() => {
          this.authUser.authState
            .pipe(
              switchMap((user) => {
                if (user) {
                  const uid = user.uid;
                  const email = user.email;
                  const roles = {
                    // Aquí puedes agregar cualquier rol que quieras asignar al usuario
                    admin: false,
                    editor: false,
                    responsable: false,
                    cct: false,
                    user: true,
                  };

                  // Verificar si el documento ya existe en la colección "users"
                  return this.firestore
                    .collection('users')
                    .doc(uid)
                    .get()
                    .pipe(
                      switchMap((doc) => {
                        if (doc.exists) {
                          // Si el documento ya existe, no se hace nada
                          return of(uid);
                        } else {
                          // Si el documento no existe, se agrega a la colección "users"
                          return this.firestore
                            .collection('users')
                            .doc(uid)
                            .set(
                              {
                                email: email,
                                roles: roles,
                              },
                              { merge: true }
                            )
                            .then(() => uid);
                        }
                      })
                    );
                } else {
                  return of(null);
                }
              })
            )
            .subscribe((uid) => {});
        });
    } catch (error) {}
  }

  auth = getAuth();
  async loginMicrosoft(): Promise<any> {
    getRedirectResult(this.auth)
  .then((result) => {
    // User is signed in.
    // IdP data available in result.additionalUserInfo.profile.

    // Get the OAuth access token and ID Token
    const credential = OAuthProvider.credentialFromResult(result);
    const accessToken = credential.accessToken;
    const idToken = credential.idToken;
  })
  .catch((error) => {
    // Handle error.
  });
  }

  async login(email: string, password: string): Promise<any> {
    try {
      const result = await this.authUser.signInWithEmailAndPassword(
        email,
        password
      );
      return result;
    } catch (error) {}
  }

  async register(email: string, password: string): Promise<any> {
    try {
      // Comprobar si el correo electrónico ya está en uso
      const signInMethods = await this.authUser.fetchSignInMethodsForEmail(
        email
      );
      if (signInMethods.length > 0) {
        throw new Error('Este correo electrónico ya está en uso');
      }

      // Crear usuario en Firebase Auth
      const result = await this.authUser.createUserWithEmailAndPassword(
        email,
        password
      );

      // Obtener el ID del usuario creado
      const uid = result.user?.uid;

      // Asignar un rol o privilegio al usuario
      const roles = {
        // Aquí puedes agregar cualquier rol que quieras asignar al usuario
        admin: false,
        editor: false,
        responsable: false,
        cct: false,
        user: true,
      };

      // Crear un objeto con los datos del usuario a guardar en Firestore
      const userData = {
        email: email,
        roles: roles,
      };

      // Guardar el usuario en la colección 'users' de Firestore
      await this.firestore.collection('users').doc(uid).set(userData);

      // Enviar correo de verificación
      this.sendVerificactionEmail();

      return result;
    } catch (error) {}
  }

  async logout() {
    let usuarioVer = await this.getCurrentUser().then((user) => {
      if (user) {
        console.log('-------logout: ' + user.email);
      }
      else{
        console.log('-------NO ESTAS LOGUEADO: ');
      }
    });
    
    try {
      await this.authUser.signOut();
      location.reload();
    } catch (error) {}
  }

  async getCurrentUser() {
    return await firstValueFrom(this.authUser.authState);
  }

  async getUserDetails(id: string): Promise<UserModel> {
    const docRef = this.firestore.collection('users').doc(id);
    const doc = await firstValueFrom(docRef.get());

    if (doc) {
      const userData = doc.data() as UserModel;
      return userData;
    } else {
      throw new Error('El documento no existe');
    }
  }
}
