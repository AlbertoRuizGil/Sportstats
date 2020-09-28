import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Team } from '../inteface/team.interface';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  private teamsCollection: AngularFirestoreCollection<any>;
  public teams: any[] = [];
  
  constructor(private firestore: AngularFirestore) {  }

  get_teams() {
    this.teamsCollection = this.firestore.collection<Team>('teams');

    return this.teamsCollection.valueChanges({idField: 'idTeam'});
  }
}
