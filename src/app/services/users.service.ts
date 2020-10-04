import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, QueryFn } from '@angular/fire/firestore';
import { User } from '../inteface/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private usersCollection: AngularFirestoreCollection<any>;

  quer : QueryFn;
  
  constructor(private firestore: AngularFirestore) { 
    this.usersCollection = this.firestore.collection('users');
    
    /* .doc('users/teams'); */
    
    /* .collection<any>('users', (ref) =>
      ref.where('id', '==', 'QsseLsmoA3hYGiuD8k8VN4JRkS02' )); */

    
  }

  getUsers() {
    /* return this.usersCollection.valueChanges({idField: 'idTeam'}); */
  }

  addUser(newUser: User, userId : string) : void{
    this.usersCollection.doc(userId).set(newUser)
      .then(resp => console.log(resp))
      .catch(err => console.log(err));
  }
}
