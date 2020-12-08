import { PlayerGame } from '@/app/shared/inteface/player.interface';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-court-stats',
  templateUrl: './court-stats.component.html',
  styleUrls: ['./court-stats.component.scss']
})
export class CourtStatsComponent implements OnInit {

  @Input()
  get playerGames(): PlayerGame[]{
    return this._playerGames;
  }

  set playerGames(newPlayerGames: PlayerGame[]){
    this._playerGames = newPlayerGames;
  }
  private _playerGames: PlayerGame[];

  attackLeft = 0;
  attackRight = 0;
  attackCenter = 0;

  constructor() { }

  ngOnInit(): void {
    this.setPercents();
  }

  setPercents(): void{
    this.setLeftPercent();
    this.setRightPercent();
    this.setCenterPercent();
  }

  setRightPercent(): void{
    let totalRightAttacks = 0;
    this.playerGames.forEach((playerGame: PlayerGame) => {
      totalRightAttacks += playerGame.attackRight;
    });

    this.attackRight = this.getTotalAttacks() ? (totalRightAttacks / this.getTotalAttacks()) * 100 : 0;
  }

  setLeftPercent(): void{
    let totalLeftAttacks = 0;
    this.playerGames.forEach((playerGame: PlayerGame) => {
      totalLeftAttacks += playerGame.attackLeft;
    });

    this.attackLeft = this.getTotalAttacks() ? (totalLeftAttacks / this.getTotalAttacks()) * 100 : 0;
  }

  setCenterPercent(): void{
    let totalCenterAttacks = 0;
    this.playerGames.forEach((playerGame: PlayerGame) => {
      totalCenterAttacks += playerGame.attackCenter;
    });

    this.attackCenter = this.getTotalAttacks() ? (totalCenterAttacks / this.getTotalAttacks()) * 100 : 0;

  }

  getTotalAttacks(): number{
    let totalAttacks = 0;
    this.playerGames.forEach((playerGame: PlayerGame) => {
      totalAttacks += playerGame.attackCenter + playerGame.attackLeft + playerGame.attackRight;
    });

    return totalAttacks;
  }

}
