import { getHtmlTagDefinition } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userToken: string;

  constructor(private auth: AngularFireAuth) {
    this.readToken();
   }

  tryLogin(email: string, password: string){
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  saveToken(idToken : string){
    this.userToken = idToken;
    localStorage.setItem('token', idToken);
  }

  readToken(){
    if(localStorage.getItem('token')){
      this.userToken = localStorage.getItem('token');
    } else{
      this.userToken = '';
    }
  }

  isAuthenticated(){
    return this.userToken.length > 2;
  }

  logout(){
    localStorage.removeItem('token');
  }

}
