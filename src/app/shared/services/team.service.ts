import { Player } from '@/app/shared/inteface/player.interface';
import { FirestorageService } from '@/app/shared/services/firestorage.service';
import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { Game, League, Team } from '../inteface/team.interface';

@Injectable({
  providedIn: 'root',
})
export class TeamService {

  constructor(private firestore: AngularFirestore, private storage: FirestorageService) {}

  getTeamById(userId: string, teamId: string): Observable<Team> {
    return this.firestore
      .collection('users')
      .doc(userId)
      .collection('teams')
      .doc<Team>(teamId)
      .valueChanges();
  }
  getTeams(userId: string, withIds = false): Observable<Team[]> {
    return this.firestore
      .collection('users')
      .doc(userId)
      .collection<Team>('teams')
      .valueChanges(withIds ? {idField: 'teamId'} : {});
  }

  getTeamLeague(userId: string, teamId: string): Observable<League[]> {
    return this.firestore
      .collection('users')
      .doc(userId)
      .collection('teams')
      .doc(teamId)
      .collection<League>('league')
      .valueChanges();
  }

  getGames(userId: string, teamId: string, withIds = false): Observable<Game[]> {
    return this.firestore
      .collection('users')
      .doc(userId)
      .collection('teams')
      .doc(teamId)
      .collection<Game>('games')
      .valueChanges(withIds ? {idField: 'matchId'} : {});
  }

  addTeam(userId: string, team: Team, league: League, players: Player[], games: Game[]): void {
    const teams = this.firestore.collection('users')
    .doc(userId)
    .collection<Team>('teams');

    let newTeamId: string;
    // Getting shield image to store after new team is saved
    const file = team.shield;
    delete team.shield;

    teams.add(team).then((docRef: DocumentReference) => {
      newTeamId = docRef.id;
      this.addTeamLeague(userId, newTeamId, league);
      this.addTeamPlayers(userId, newTeamId, players);
      this.addTeamGames(userId, newTeamId, games);
      if (file) {
        this.storage.uploadFile(`teams/${newTeamId}`, file).subscribe((url: string) => {
          docRef.set({ shieldUrl: url }, { merge: true });
        });
      }
    });
  }

  addTeamLeague(userId: string, teamId: string, league: League): void {
    this.firestore
      .collection('users')
      .doc(userId)
      .collection('teams')
      .doc(teamId)
      .collection('league')
      .add(league);
  }
  addTeamPlayers(userId: string, teamId: string, players: Player[]): void {
    players.forEach((player: Player) => {
      let newPlayerId: string;
      // Getting avatar image to store after new player is saved
      const file = player.playerAvatar;
      delete player.playerAvatar;
      this.firestore
      .collection('users')
      .doc(userId)
      .collection('teams')
      .doc(teamId)
      .collection('players')
      .add(player).then((docRef: DocumentReference) => {
        newPlayerId = docRef.id;
        if (file) {
          this.storage.uploadFile(`teams/${teamId}/players/${newPlayerId}`, file).subscribe((url: string) => {
            docRef.set({ playerAvatarUrl: url }, { merge: true });
          });
        }
      });
    });
  }

  addTeamGames(userId: string, teamId: string, games: Game[]): void {
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

  addTeamGame(userId: string, teamId: string, game: Game): void {
    const games = this.firestore
      .collection('users')
      .doc(userId)
      .collection('teams')
      .doc(teamId)
      .collection<Game>('games');
    if (game.matchId) {
      games.doc(game.matchId).set(game);
    } else {
      games.add(game);
    }
  }
}
