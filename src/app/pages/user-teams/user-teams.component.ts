import { Component, OnInit } from '@angular/core';
import { TeamsService } from '../../services/teams.service';
import { Team } from '../../inteface/team.interface';

@Component({
  selector: 'app-user-teams',
  templateUrl: './user-teams.component.html',
  styleUrls: ['./user-teams.component.scss']
})
export class UserTeamsComponent implements OnInit {

  teams : Team[];

  constructor( public _ts : TeamsService) {
    this._ts.get_teams()
      .subscribe( (teams: Team[]) => {
        this.teams = teams;
        console.log(this.teams);
        }
      );
  }

  ngOnInit(): void {}

}
