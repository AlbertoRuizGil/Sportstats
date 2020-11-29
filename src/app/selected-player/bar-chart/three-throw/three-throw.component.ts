import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-three-throw',
  templateUrl: './three-throw.component.html',
  styleUrls: ['./three-throw.component.scss']
})
export class ThreeThrowComponent implements OnInit {

  @Input()
  playerThree: number;

  @Input()
  leagueThree: number;

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = ['PPP'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartData: ChartDataSets[] = [];


  constructor() { }

  ngOnInit(): void {
    this.barChartData = [
      { data: [this.playerThree], label: 'Jugador' },
      { data: [this.leagueThree], label: 'Media de la liga' }
    ];
  }

}
