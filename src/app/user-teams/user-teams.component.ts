import { Team } from '@/app/shared/inteface/team.interface';
import { AuthService } from '@/app/shared/services/auth.service';
import { TeamService } from '@/app/shared/services/team.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-teams',
  templateUrl: './user-teams.component.html',
  styleUrls: ['./user-teams.component.scss'],
})
export class UserTeamsComponent implements OnInit {
  public teams: Observable<Team[]>;

  constructor(
    public teamService: TeamService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user: firebase.User) => {
      if (user) {
        this.teams = this.teamService
          .getTeams(user.uid)
          .valueChanges({ idField: 'teamId' });
      }
    });
  }
}
