import { Timestamp } from 'rxjs';

export interface Team {
  sport: Sport;
  name: string;
  idTrainer: string;
}

export enum Sport {
  Basketball = 'baloncesto',
  Football = 'futbol'
}

export interface Game {
  date: Timestamp<Date>;
  goalAgainst: number;
  goalsFor: number;
  rivalTeam: string;
}
