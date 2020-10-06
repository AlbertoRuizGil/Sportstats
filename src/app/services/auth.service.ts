import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject, Observable } from 'rxjs';

import { User } from '../inteface/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUser: BehaviorSubject<firebase.User> = new BehaviorSubject<firebase.User>(null);
  currentUser$: Observable<firebase.User> = this.currentUser.asObservable();

  constructor(private auth: AngularFireAuth) {
    this.auth.onAuthStateChanged((user: firebase.User) => {
      this.currentUser.next(user);
    });
  }

  tryLogin(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  registerUser(newUser: User, password: string): Promise<firebase.auth.UserCredential> {
    return this.auth.createUserWithEmailAndPassword(newUser.email, password);
  }

  updateUser(newUser: User): Promise<void> {
    if (this.currentUser.getValue()) {
      return this.currentUser.getValue().updateEmail(newUser.email).then(() => {
        return this.currentUser.getValue().updateProfile({ displayName: newUser.name });
      });
    }
    return Promise.reject('Debe iniciar sesión antes de actualizar la información del usuario.');
  }

  logout(): Promise<void> {
    return this.auth.signOut();
  }

}
