import { Game } from '@/app/shared/inteface/team.interface';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-info-team',
  templateUrl: './table-info-team.component.html',
  styleUrls: ['./table-info-team.component.scss']
})
export class TableInfoTeamComponent implements OnInit {

  @Input() games: Game[];
  public wins = 0;

  public goals = 0;

  public winAverage: number;

  constructor() { }

  ngOnInit(): void {
    this.getTableInfo(this.games);
  }

  getTableInfo(games: Game[]): void {
    games.forEach((game) => {
      if (game.goalsFor > game.goalsAgainst) {
        this.wins++;
      }
      this.goals += game.goalsFor;
    });

    this.winAverage = this.wins / games.length;
  }
}

