export interface Team {
  name: string;

  sport?: Sport;

  teamId?: string;
}

export enum Sport {
  Basketball = 'baloncesto',
  Football = 'futbol'
}

export interface Game {
  matchId?: string;
  matchDate: number;
  goalsAgainst?: number;
  goalsFor?: number;
  rivalTeam: string;
}

export interface League{
  points: number;
  fieldPercent: number;
  threePercent: number;
  freePercent: number;
}
