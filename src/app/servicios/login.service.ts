import { Injectable } from '@angular/core';

import {AngularFireAuth} from "@angular/fire/compat/auth";

import firebase from 'firebase/compat/app';



@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private loginServicio: AngularFireAuth) { }


  async register(email: string , password:string){

    try{
    return await this.loginServicio.createUserWithEmailAndPassword(email,password);
    }
    catch(error){
    console.log("error en el login: "+ error);
    return null;
    }
   
    }


async login(email: string , password:string){

try{
return await this.loginServicio.signInWithEmailAndPassword(email,password);
}
catch(error){
console.log("error en el login: "+ error);
return null;
}


}


async loginGoogle(email: string , password:string){

  try{
  return await this.loginServicio.signInWithPopup( new firebase.auth.GoogleAuthProvider());
  }
  catch(error){
  console.log("error en el login google: "+ error);
  return null;
  }

  }


  getUserLogged(){
return this.loginServicio.authState;

  }

  logout(){

    this.loginServicio.signOut();
  }




}
