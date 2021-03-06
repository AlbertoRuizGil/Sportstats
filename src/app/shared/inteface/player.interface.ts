import { FormGroup } from '@angular/forms';

export interface Player{
  playerId?: string;
  playerName: string;
  playerAge: number;
  playerNumber: number;
  playerAvatar?: File;
  playerAvatarUrl?: string;
}

export interface PlayerGame{
  assist: number;
  attackRight?: number;
  attackLeft?: number;
  attackCenter?: number;
  defRebound: number;
  fieldAttemp: number;
  fieldSuccess: number;
  foulsMade: number;
  foulsRec: number;
  freeAttemp: number;
  freeSuccess: number;
  offRebound: number;
  passAttemp: number;
  passSuccess: number;
  points: number;
  steals: number;
  threeAttemp: number;
  threeSuccess: number;
}

export interface PlayerGeneralTable{
  playerInfo: Player;
  playerGeneralStats?: PlayerGeneralStats;
}

export interface PlayerGeneralStats{
  games: number;
  pointsPerGame: number;
  fieldPer: number;
  threePer: number;
  freePer: number;
}

export interface PlayerTable{
  playerInfo: Player;
  playerCompleteStats: PlayerCompleteStats;
}

export interface PlayerCompleteStats{
  games: number;
  pointsPerGame: number;
  fieldPerGame: number;
  fieldPercent: number;
  threePercent: number;
  freePercent: number;
  offRebound: number;
  defRebound: number;
  assists: number;
  steals: number;
  foulsMade: number;
}

export interface PlayerForm{
  playerInfo: Player;
  form: FormGroup;
}

