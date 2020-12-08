import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { Player, PlayerGame } from '../inteface/player.interface';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(private firestore: AngularFirestore) { }

  getPlayers(userId: string, teamId: string, withIds = false): Observable<Player[]> {
    return this.firestore.collection('users')
      .doc(userId)
      .collection('teams')
      .doc(teamId)
      .collection<Player>('players')
      .valueChanges(withIds ? { idField: 'playerId' } : {});
  }

  getPlayerInfo(userId: string, teamId: string, playerId: string): Observable<Player>{
    return this.firestore.collection('users')
      .doc(userId)
      .collection('teams')
      .doc(teamId)
      .collection('players')
      .doc<Player>(playerId)
      .valueChanges();
  }

  getPlayerGames(userId: string, teamId: string, playerId: string): Observable<PlayerGame[]>{
    return this.firestore.collection('users')
      .doc(userId)
      .collection('teams')
      .doc(teamId)
      .collection('players')
      .doc(playerId)
      .collection<PlayerGame>('games')
      .valueChanges();
  }

  getPlayerGame(userId: string, teamId: string, playerId: string, gameId: string): Observable<PlayerGame>{
    return this.firestore.collection('users')
      .doc(userId)
      .collection('teams')
      .doc(teamId)
      .collection('players')
      .doc(playerId)
      .collection('games')
      .doc<PlayerGame>(gameId)
      .valueChanges();
  }

  addPlayerGame(userId: string, teamId: string, playerId: string, playerGame: PlayerGame, gameId: string): void{
    this.firestore.collection('users')
    .doc(userId)
    .collection('teams')
    .doc(teamId)
    .collection('players')
    .doc(playerId)
    .collection('games')
    .doc(gameId)
    .set(playerGame);
  }

  deletePlayerGame(userId: string, teamId: string, playerId: string, gameId: string): void{
    const doc = this.firestore.collection('users')
    .doc(userId)
    .collection('teams')
    .doc(teamId)
    .collection('players')
    .doc(playerId)
    .collection('games')
    .doc(gameId);
    if (doc){
      doc.delete();
    }
  }
}
