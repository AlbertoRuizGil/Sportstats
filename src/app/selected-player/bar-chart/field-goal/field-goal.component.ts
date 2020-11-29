import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-field-goal',
  templateUrl: './field-goal.component.html',
  styleUrls: ['./field-goal.component.scss']
})
export class FieldGoalComponent implements OnInit {

  @Input()
  playerField: number;

  @Input()
  leagueField: number;

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
      { data: [this.playerField], label: 'Jugador' },
      { data: [this.leagueField], label: 'Media de la liga' }
    ];
  }

}
