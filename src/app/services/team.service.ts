import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private teamsCollection: AngularFirestoreCollection<any>;

  constructor(private firestore: AngularFirestore) { }

  getTeams(userId: string) {
    this.teamsCollection = this.firestore.collection('users')
      .doc(userId)
      .collection('teams');
    return this.teamsCollection;
  }

  addTeam() {

  }
}
