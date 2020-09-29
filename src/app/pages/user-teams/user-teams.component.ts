import { Component, OnInit } from '@angular/core';
import { TeamsService } from '../../services/teams.service';
import { Team } from '../../inteface/team.interface';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-teams',
  templateUrl: './user-teams.component.html',
  styleUrls: ['./user-teams.component.scss']
})
export class UserTeamsComponent implements OnInit {

  teams : Team[];

  constructor( public _ts : TeamsService,
               private auth: AuthService,
               private router: Router) {
    this._ts.get_teams()
      .subscribe( (teams: Team[]) => {
        this.teams = teams;
        console.log(this.teams);
        }
      );
  }

  ngOnInit(): void {}

  exit(){
    this.auth.logout();
    this.router.navigateByUrl('/home');
  }

}
