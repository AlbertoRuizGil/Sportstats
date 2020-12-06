import { PlayerGame } from '@/app/shared/inteface/player.interface';
import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartType, RadialChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-polar-chart',
  templateUrl: './polar-chart.component.html',
  styleUrls: ['./polar-chart.component.scss']
})
export class PolarChartComponent implements OnInit {

  @Input()
  playerGames: PlayerGame[];

  private attack: number;
  private defense: number;
  private passes: number;

  constructor() { }

  public radarChartOptions: RadialChartOptions = {
    responsive: true,
    legend: {
      labels: {
        fontColor: 'black',
        fontFamily: '"Open Sans", sans-serif',
        fontStyle: 'bold'
      }
    },
    scale: {
      pointLabels: {
        fontColor: 'black',
        fontFamily: '"Open Sans", sans-serif',
        fontStyle: 'bold'
      },
      ticks: {
        suggestedMax: 100,
        stepSize: 10,

      }
    }
  };
  public radarChartLabels: Label[] = ['ATAQUE', 'DEFENSA', 'PASE'];

  public radarChartData: ChartDataSets[] = [];
  public radarChartType: ChartType = 'radar';

  ngOnInit(): void {
    console.log( this.playerGames );
    this.setData();
    console.log( this.attack, this.defense, this.passes );
    this.radarChartData = [
    { data: [this.attack, this.defense, this.passes], label: 'Jugador' },
  ];
  }

  setData(): void{
    this.setAttack();
    this.setDefense();
    this.setPasses();
  }

  setAttack(): void {
    let totalFreeAttemps = 0;
    let totalFreeSuccess = 0;
    let totalThreeAttemps = 0;
    let totalThreeSuccess = 0;
    let totalFieldAttemps = 0;
    let totalFieldSuccess = 0;
    let totalFree = 0;
    let totalField = 0;
    let totalThree = 0;

    this.playerGames.forEach((playerGame: PlayerGame) => {
      totalFreeAttemps += playerGame.freeAttemp;
      totalFreeSuccess += playerGame.freeSuccess;
      totalThreeAttemps += playerGame.threeAttemp;
      totalThreeSuccess += playerGame.threeSuccess;
      totalFieldAttemps += playerGame.fieldAttemp;
      totalFieldSuccess += playerGame.fieldSuccess;
    });

    totalThree = totalThreeSuccess / totalThreeAttemps;
    totalFree = totalFreeSuccess / totalFreeAttemps;
    totalField = totalFieldSuccess / totalFieldAttemps;

    this.attack = ((totalThree + totalFree + totalField) / 3) * 100;
  }

  setPasses(): void {
    let totalPassAttemps = 0;
    let totalPassSuccess = 0;

    this.playerGames.forEach((playerGame: PlayerGame) => {
      totalPassAttemps += playerGame.passAttemp;
      totalPassSuccess += playerGame.passSuccess;
    });

    this.passes = (totalPassSuccess / totalPassAttemps) * 100;
  }

  setDefense(): void {
    let totalOffRebounds = 0;
    let totalDefRebounds = 0;
    let deffReboundsPercent = 0;
    let totalSteals = 0;
    let totalFoulsMade = 0;

    this.playerGames.forEach((playerGame: PlayerGame) => {
      totalOffRebounds += playerGame.offRebound;
      totalDefRebounds += playerGame.defRebound;
      totalSteals += playerGame.steals;
      totalFoulsMade += playerGame.foulsMade;
    });

    deffReboundsPercent = totalDefRebounds / (totalDefRebounds + totalOffRebounds);
    totalSteals = (totalSteals / this.playerGames.length) * 0.05;
    totalFoulsMade = (totalFoulsMade / this.playerGames.length) * 0.03;

    this.defense = (deffReboundsPercent + totalSteals - totalFoulsMade) * 100;

    if (this.defense > 100){
      this.defense = 100;
    }
    if (this.defense < 0){
      this.defense = 0;
    }
  }


}
