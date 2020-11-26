import { Player } from '@/app/shared/inteface/player.interface';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Game, League, Team } from '../inteface/team.interface';

@Injectable({
  providedIn: 'root',
})
export class TeamService {

  constructor(private firestore: AngularFirestore) {}

  getTeamById(userId: string, teamId: string): AngularFirestoreDocument<Team> {
    return this.firestore
      .collection('users')
      .doc(userId)
      .collection('teams')
      .doc(teamId);
  }
  getTeams(userId: string): AngularFirestoreCollection<Team> {
    return this.firestore
      .collection('users')
      .doc(userId)
      .collection('teams');
  }

  getGames(userId: string, teamId: string): AngularFirestoreCollection<Game>{
    return this.firestore
      .collection('users')
      .doc(userId)
      .collection('teams')
      .doc(teamId)
      .collection('games');
  }

  addTeam(userId: string, team: Team, league: League, players: Player[], games: Game[]): void {
    const doc = this.firestore.collection('users')
    .doc(userId)
    .collection('teams');

    let newTeamId: string;

    doc.add(team).then(docRef => {
      newTeamId = docRef.id;
      this.addTeamLeague(userId, newTeamId, league);
      this.addTeamPlayers(userId, newTeamId, players);
      this.addTeamGames(userId, newTeamId, games);
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

  addTeamGames(userId: string, teamId: string, games: Game[]){
    games.forEach((game: Game) => {
      this.firestore
      .collection('users')
      .doc(userId)
      .collection('teams')
      .doc(teamId)
      .collection('games')
      .add(game);
    });
  }
}
