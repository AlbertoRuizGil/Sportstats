import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-free-throw',
  templateUrl: './free-throw.component.html',
  styleUrls: ['./free-throw.component.scss']
})
export class FreeThrowComponent implements OnInit {

   @Input()
  playerFree: number;

  @Input()
  leagueFree: number;

  public barChartOptions: ChartOptions;
  public barChartLabels: Label[] = ['%TIROS LIBRES'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartData: ChartDataSets[] = [];


  constructor() { }

  ngOnInit(): void {
    this.barChartData = [
      {
        backgroundColor: '#da387d',
        maxBarThickness : 40,
        data: [this.playerFree], label: 'Jugador'
      },
      {
        backgroundColor: 'rgba(59, 85, 111, 1)',
        maxBarThickness : 40,
        data: [this.leagueFree], label: 'Media de la liga'
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
          max: 100
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
