import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Params } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  private teamsCollection : AngularFirestoreCollection<any>;
  
  constructor(private firestore: AngularFirestore) {  }

  getTeams(userId : string) {
    this.teamsCollection = this.firestore.collection('users')
      .doc(userId)
      .collection('teams');
    return this.teamsCollection;
  }

  addTeam(){
    
  }
}
