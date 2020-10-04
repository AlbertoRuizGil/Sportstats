export interface Team {
  sport: Sport,
  name: string,
  id_trainer: string
}

export enum Sport{
  Basketball = "baloncesto",
  Football = "futbol"
} ;