import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Player, PlayerGame } from '../inteface/player.interface';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(private firestore: AngularFirestore) { }

  getPlayers(userId: string, teamId: string): AngularFirestoreCollection<Player> {
    return this.firestore.collection('users')
      .doc(userId)
      .collection('teams')
      .doc(teamId)
      .collection('players');
  }

  getPlayerInfo(userId: string, teamId: string, playerId: string): AngularFirestoreDocument<Player>{
    return this.firestore.collection('users')
      .doc(userId)
      .collection('teams')
      .doc(teamId)
      .collection('players')
      .doc(playerId);
  }

  getPlayerGames(userId: string, teamId: string, playerId: string): AngularFirestoreCollection<PlayerGame>{
    return this.firestore.collection('users')
      .doc(userId)
      .collection('teams')
      .doc(teamId)
      .collection('players')
      .doc(playerId)
      .collection('games');
  }

  getPlayerGame(userId: string, teamId: string, playerId: string, gameId: string): AngularFirestoreDocument<PlayerGame>{
    return this.firestore.collection('users')
      .doc(userId)
      .collection('teams')
      .doc(teamId)
      .collection('players')
      .doc(playerId)
      .collection('games')
      .doc(gameId);
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
}
