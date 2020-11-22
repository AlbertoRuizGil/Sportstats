export interface Team {
  name: string;
}

export enum Sport {
  Basketball = 'baloncesto',
  Football = 'futbol'
}

export interface Game {
  date: number;
  goalsAgainst: number;
  goalsFor: number;
  rivalTeam: string;
}

export interface Player{
  name: string;
  age: number;
  number: number;
}
