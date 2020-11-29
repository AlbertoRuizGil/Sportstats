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
      { data: [this.playerFree], label: 'Jugador' },
      { data: [this.leagueFree], label: 'Media de la liga' }
    ];
  }

}
