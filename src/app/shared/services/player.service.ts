import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private playersCollection: AngularFirestoreCollection<any>;

  private player: AngularFirestoreDocument<any>;

  constructor(private firestore: AngularFirestore) { }

  getPlayers(userId: string, teamId: string) {
    this.playersCollection = this.firestore.collection('users')
      .doc(userId)
      .collection('teams')
      .doc(teamId)
      .collection('players');
    return this.playersCollection;
  }

  getPlayerById(userId: string, teamId: string, playerId: string){
    this.player = this.firestore.collection('users')
      .doc(userId)
      .collection('teams')
      .doc(teamId)
      .collection('games')
      .doc(playerId);
    return this.player;
  }

  addTeam() {

  }
}
