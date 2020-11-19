import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  private teamsCollection: AngularFirestoreCollection<any>;

  private teamGames: AngularFirestoreCollection<any>;

  constructor(private firestore: AngularFirestore) {}

  getTeamById(userId: string, teamId: string) {
    return this.firestore
      .collection('users')
      .doc(userId)
      .collection('teams')
      .doc(teamId);
  }
  getTeams(userId: string) {
    this.teamsCollection = this.firestore
      .collection('users')
      .doc(userId)
      .collection('teams');
    return this.teamsCollection;
  }

  getGames(userId: string, teamId: string) {
    this.teamGames = this.firestore
      .collection('users')
      .doc(userId)
      .collection('teams')
      .doc(teamId)
      .collection('games');
    return this.teamGames;
  }

  addTeam() {}
}
