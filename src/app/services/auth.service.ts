import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

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

  saveUserId(userId : string){
    this.userToken = userId;
    localStorage.setItem('userId', userId);
  }

  readToken(){
    if(localStorage.getItem('token')){
      this.userToken = localStorage.getItem('token');
    } else{
      this.userToken = '';
    }
  }

  registerUser(email: string, password: string){
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  logout(){
    localStorage.removeItem('token');
  }

}
