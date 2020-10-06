import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

import { Team } from '../../inteface/team.interface';
import { TeamService } from '../../services/team.service';

@Component({
  selector: 'app-user-teams',
  templateUrl: './user-teams.component.html',
  styleUrls: ['./user-teams.component.scss']
})
export class UserTeamsComponent implements OnInit {

  public teams: Observable<Team[]>;

  constructor(
    public teamService: TeamService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user: firebase.User) => {
      if (user) {
        this.teams = this.teamService.getTeams(user.uid).valueChanges();
      }
    });
  }

  exit(): void {
    this.authService.logout().then(() => {
      this.router.navigateByUrl('/home');
    });
  }

  createTeam() {

  }


}
