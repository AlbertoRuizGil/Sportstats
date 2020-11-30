import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-points',
  templateUrl: './points.component.html',
  styleUrls: ['./points.component.scss']
})
export class PointsComponent implements OnInit {

  @Input()
  playerPoints: number;

  @Input()
  leaguePoints: number;

  public barChartOptions: ChartOptions;
  public barChartLabels: Label[] = ['PPP'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartData: ChartDataSets[] = [];


  constructor() { }

  ngOnInit(): void {
    this.barChartData = [
      {
        backgroundColor: ' rgba(218, 56, 125, 01)',
        maxBarThickness: 40,
        data: [this.playerPoints], label: 'Jugador'
      },
      {
        backgroundColor: 'rgba(59, 85, 111, 1)',
        maxBarThickness: 40,
        data: [this.leaguePoints], label: 'Media de la liga'
      }
    ];

    this.barChartOptions = {
    responsive: true,
    legend: {
      labels: {
        fontColor: 'black',
        fontFamily: '"Open Sans", sans-serif',
        fontStyle: 'bold'
      }
    },
    scales : {
      yAxes: [{
        ticks: {
          fontFamily: '"Open Sans", sans-serif',
          fontColor: 'black',
          fontStyle: 'bold',
            stepSize: 10,
            min: 0,
            max: Math.max(this.playerPoints, this.leaguePoints) + 10
        }
      }],
      xAxes: [{
        ticks: {
          fontFamily: '"Open Sans", sans-serif',
          fontColor: 'black',
          fontStyle: 'bold'
        }
      }]
    }};

  }

}
