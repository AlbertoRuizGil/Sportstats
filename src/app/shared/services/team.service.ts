import { Player } from '@/app/shared/inteface/player.interface';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

import { Game, League, Team } from '../inteface/team.interface';

@Injectable({
  providedIn: 'root',
})
export class TeamService {

  constructor(private firestore: AngularFirestore, private storage: AngularFireStorage) {}

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

  getTeamLeague(userId: string, teamId: string): AngularFirestoreCollection<League>{
    return this.firestore
    .collection('users')
    .doc(userId)
    .collection('teams')
    .doc(teamId)
    .collection('league');
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

    if (team.shield) {
      // this.storage.upload(team.)
      // TODO call service to save image in Firebase Storage
      // team.shieldUrl =
      delete team.shield;
    }

    doc.add(team).then(docRef => {
      newTeamId = docRef.id;
      this.addTeamLeague(userId, newTeamId, league);
      this.addTeamPlayers(userId, newTeamId, players);
      this.addTeamGames(userId, newTeamId, games);
    });
  }

  addTeamLeague(userId: string, teamId: string, league: League): void{

    this.firestore
      .collection('users')
      .doc(userId)
      .collection('teams')
      .doc(teamId)
      .collection('league')
      .add(league);
  }
  addTeamPlayers(userId: string, teamId: string, players: Player[]): void{
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

  addTeamGames(userId: string, teamId: string, games: Game[]): void{
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

  addTeamGame(userId: string, teamId: string, game: Game): void{
    if (game.matchId === undefined){
      this.firestore
      .collection('users')
      .doc(userId)
      .collection('teams')
      .doc(teamId)
      .collection('games')
      .add(game);
    }else{
      this.firestore
      .collection('users')
      .doc(userId)
      .collection('teams')
      .doc(teamId)
      .collection('games')
      .doc(game.matchId)
      .set(game);
    }
  }
}
