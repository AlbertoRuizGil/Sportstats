import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, QueryFn } from '@angular/fire/firestore';

import { User } from '../inteface/user.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersCollection: AngularFirestoreCollection<any>;

  quer: QueryFn;

  constructor(private firestore: AngularFirestore, private authService: AuthService) {
    this.usersCollection = this.firestore.collection('users');

    /* .doc('users/teams'); */

    /* .collection<any>('users', (ref) =>
      ref.where('id', '==', 'QsseLsmoA3hYGiuD8k8VN4JRkS02' )); */


  }

  getUsers() {
    /* return this.usersCollection.valueChanges({idField: 'idTeam'}); */
  }

  addUser(newUser: User, password: string): Promise<void> {
    return this.authService.registerUser(newUser, password).then((credential: firebase.auth.UserCredential) => {
      return this.usersCollection.doc(credential.user.uid).set(newUser);
    }).then(() => {
      return this.authService.updateUser(newUser);
    });
  }
}
