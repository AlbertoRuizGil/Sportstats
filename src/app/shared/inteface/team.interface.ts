export interface Team {
  name: string;
}

export enum Sport {
  Basketball = 'baloncesto',
  Football = 'futbol'
}

export interface Game {
  matchDate: number;
  goalsAgainst?: number;
  goalsFor?: number;
  rivalTeam: string;
}

export interface Player{
  playerName: string;
  playerAge: number;
  playerNumber: number;
}

export interface League{
  points: number;
  fieldPercent: number;
  threePercent: number;
  freePercent: number;
}
