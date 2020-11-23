import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { FormGroup } from '@angular/forms';

import { League, Player, Team } from '../inteface/team.interface';

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

  addTeam(userId: string, team: Team, league: League, players: Player[]): void {
    const doc = this.firestore.collection('users')
    .doc(userId)
    .collection('teams');

    let newTeamId: string;

    doc.add(team).then(docRef => {
      newTeamId = docRef.id;
      this.addTeamLeague(userId, newTeamId, league);
      this.addTeamPlayers(userId, newTeamId, players);
    });
  }

  addTeamLeague(userId: string, teamId: string, league: League){

    this.firestore
      .collection('users')
      .doc(userId)
      .collection('teams')
      .doc(teamId)
      .collection('league')
      .add(league);
  }
  addTeamPlayers(userId: string, teamId: string, players: Player[]){
    players.forEach((player: Player) => {
      this.firestore
      .collection('users')
      .doc(userId)
      .collection('teams')
      .doc(teamId)
      .collection('players')
      .add(player);
    });
  }

  addTeamGames(userId: string, teamId: string, formGames: FormGroup){

  }
}
