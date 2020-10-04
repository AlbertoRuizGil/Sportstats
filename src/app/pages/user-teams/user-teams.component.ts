import { Component, OnInit } from '@angular/core';
import { TeamsService } from '../../services/teams.service';
import { Sport, Team } from '../../inteface/team.interface';
import { AuthService } from 'src/app/services/auth.service';
import { Params, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-teams',
  templateUrl: './user-teams.component.html',
  styleUrls: ['./user-teams.component.scss']
})
export class UserTeamsComponent implements OnInit {

  public teams : Observable<Team[]>;
  private parameters : Params ;

  constructor( public _ts : TeamsService,
               private auth: AuthService,
               private router: Router,
               private activatedRoute: ActivatedRoute) {
    
    this.activatedRoute.params.subscribe(params => {
      this.parameters = params;
    })            
    this.getAllTeams(this.parameters);
    /* this._ts.get_teams()
      .subscribe( (teams: Team[]) => {
        this.teams = teams;
        console.log(this.teams);
        }
      ); */
  }

  ngOnInit(): void {}

  getAllTeams(route : Params){
    this.teams = this._ts.getTeams(route.userId).valueChanges();
  }
  
  exit(){
    this.auth.logout();
    this.router.navigateByUrl('/home');
  }

  createTeam(){
    
  }

    
}
