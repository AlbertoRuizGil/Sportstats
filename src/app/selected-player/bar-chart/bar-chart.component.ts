import { PlayerGame } from '@/app/shared/inteface/player.interface';
import { League } from '@/app/shared/inteface/team.interface';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {

  @Input()
  get playerGames(): PlayerGame[] {
    return this._playerGames;
  }

  set playerGames(newPlayerGames: PlayerGame[]) {
    this._playerGames = newPlayerGames;
    this.setPlayerStats();
  }

  @Input()
  league: League;

  playerStats: League;

  private _playerGames: PlayerGame[];

  constructor() { }

  ngOnInit(): void {
    this.setPlayerStats();
  }

  setPlayerStats(): void{
    this.playerStats = {
      points: this.setPointsPerGame(),
      fieldPercent: this.setFieldPer(),
      freePercent: this.setFreePer(),
      threePercent: this.setThreePer()
    };
  }

  setFieldPer(): number{
    let fieldAttemps = 0;
    let fieldSucceed = 0;
    this.playerGames.forEach((playerGame: PlayerGame) => {
      if (playerGame.fieldAttemp !== undefined && playerGame.fieldSuccess !== undefined){
        fieldAttemps += playerGame.fieldAttemp;
        fieldSucceed += playerGame.fieldSuccess;
      }
    });

    return Math.round((fieldSucceed / fieldAttemps) * 100);
  }

  setFreePer(): number{
    let freeAttemps = 0;
    let freeSucceed = 0;
    this.playerGames.forEach((playerGame: PlayerGame) => {
      if (playerGame.freeAttemp !== undefined && playerGame.freeSuccess !== undefined){
        freeAttemps += playerGame.freeAttemp;
        freeSucceed += playerGame.freeSuccess;
      }
    });

    return Math.round((freeSucceed / freeAttemps) * 100);
  }

  setThreePer(): number{
    let threeAttemps = 0;
    let threeSucced = 0;
    this.playerGames.forEach((playerGame: PlayerGame) => {
      if (playerGame.threeAttemp !== undefined && playerGame.threeSuccess !== undefined){
        threeAttemps += playerGame.threeAttemp;
        threeSucced += playerGame.threeSuccess;
      }
    });

    return Math.round((threeSucced / threeAttemps) * 100);
  }

  setPointsPerGame(): number{
    let totalPoints = 0;
    this.playerGames.forEach((playerGame: PlayerGame) => {
      totalPoints += playerGame.points;
    });

    return totalPoints / this.playerGames.length;
  }

}
