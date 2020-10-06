export interface Team {
  sport: Sport;
  name: string;
  idTrainer: string;
}

export enum Sport {
  Basketball = 'baloncesto',
  Football = 'futbol'
}
