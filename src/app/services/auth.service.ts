import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { firstValueFrom } from 'rxjs';
import { GoogleAuthProvider } from "firebase/auth";
import { AngularFirestore } from '@angular/fire/compat/firestore';




@Injectable({
  providedIn: 'root'
})
export class AuthService {



  constructor(public authUser: AngularFireAuth, private firestore: AngularFirestore) {

  }


  async resetPassword(email: string):Promise<void>{
      try {
        
        return await this.authUser.sendPasswordResetEmail(email)

      } catch (error) {
        console.error(error)
      }
  }

  async sendVerificactionEmail():Promise<void>{
    return (await this.authUser.currentUser)?.sendEmailVerification();
  }

 async loginGoogle():Promise<any>{
   try {
   
    return this.authUser.signInWithPopup(new GoogleAuthProvider());

   } catch (error) {
     console.log(error);
   }
 }
  async login(email: string, password: string):Promise<any> {

    try {
      const result = await this.authUser.signInWithEmailAndPassword(email, password);
      return result;

    } catch (error) {
      console.log(error);
    }

  }

  async register(email: string, password: string): Promise<any> {
    try {
      // Comprobar si el correo electrónico ya está en uso
      const signInMethods = await this.authUser.fetchSignInMethodsForEmail(email);
      if (signInMethods.length > 0) {
        throw new Error('Este correo electrónico ya está en uso');
      }
    
      // Crear usuario en Firebase Auth
      const result = await this.authUser.createUserWithEmailAndPassword(email, password);
  
      // Obtener el ID del usuario creado
      const uid = result.user?.uid;
  
      // Asignar un rol o privilegio al usuario
      const roles = ['user', 'admin']; // Agregar los roles que desees
  
      // Crear un objeto con los datos del usuario a guardar en Firestore
      const userData = {
        email: email,
        roles: roles
      };
  
      // Guardar el usuario en la colección 'users' de Firestore
      await this.firestore.collection('users').doc(uid).set(userData);
  
      // Enviar correo de verificación
      this.sendVerificactionEmail();
  
      return result;
    } catch (error) {
      console.log(error);
    }
  }
  

  


  async logout() {

    try {
      await this.authUser.signOut();   
      location.reload();

    } catch (error) {
      console.log(error);
    }

  }


  async getCurrentUser() {

    return await firstValueFrom(this.authUser.authState);

  }

 /*  getCurrentUser(){

    this.authUser.authState.pipe(first()).toPromise()

  } */

}
