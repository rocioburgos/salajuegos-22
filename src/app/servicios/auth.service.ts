import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth  } from '@angular/fire/compat/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth
    ) {}
 

    public async registerUser(email:string, clave:string):Promise<any>{
           const resultado= await this.afAuth.createUserWithEmailAndPassword(email, clave);
           return resultado;
    }


    public async loginUser(email:string, clave:string):Promise<any>{
      const resultado =  this.afAuth.signInWithEmailAndPassword(email, clave);
 
     return  resultado;
    }


    public async LogOut(){
      localStorage.removeItem('usuario_juegos');
      this.afAuth.signOut();
      //actualizar el firebase
    }


    getCurrentUserFirebase(): Observable<any>{
        return this.afAuth.authState;
    }


    getCurrentUserLS(): any{
      const userJson = localStorage.getItem('usuario_juegos');  
       if(userJson != null  ){
       return JSON.parse(userJson); 
       }else{
         return null;
       } 
    
}}