import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private teamsCollection: AngularFirestoreCollection<any>;

  private teamInfo: Observable<any>;

  private teamGames: AngularFirestoreCollection<any>;

  constructor(private firestore: AngularFirestore) { }

  getTeams(userId: string) {
    this.teamsCollection = this.firestore.collection('users')
      .doc(userId)
      .collection('teams');
    return this.teamsCollection;
  }

  getGames(userId: string, teamId: string){
    this.teamGames = this.firestore.collection('users')
      .doc(userId)
      .collection('teams')
      .doc(teamId)
      .collection('games');
    return this.teamGames;
  }

  addTeam() {

  }
}
