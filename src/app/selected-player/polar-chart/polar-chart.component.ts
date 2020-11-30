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

  public radarChartData: ChartDataSets[] = [
    { data: [65, 59, 60], label: 'Jugador' },
  ];
  public radarChartType: ChartType = 'radar';

  ngOnInit(): void {


  }



}
