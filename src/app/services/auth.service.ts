import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { firstValueFrom } from 'rxjs';
import { GoogleAuthProvider } from "firebase/auth";



@Injectable({
  providedIn: 'root'
})
export class AuthService {



  constructor(public authUser: AngularFireAuth) {

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

  async register(email: string, password: string):Promise<any> {

    try {

      const result = await this.authUser.createUserWithEmailAndPassword(email, password);
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
