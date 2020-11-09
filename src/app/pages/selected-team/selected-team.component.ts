import { Game } from '@/app/inteface/team.interface';
import { AuthService } from '@/app/services/auth.service';
import { TeamService } from '@/app/services/team.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-selected-team',
  templateUrl: './selected-team.component.html',
  styleUrls: ['./selected-team.component.scss']
})
export class SelectedTeamComponent implements OnInit {

  public games: Observable<Game[]>;

  public nextGame: Game;

  constructor(public teamService: TeamService,
              private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    const teamId = this.route.snapshot.paramMap.get('teamId');
    this.authService.currentUser$.subscribe((user: firebase.User) => {
      if (user) {
        this.games = this.teamService.getGames(user.uid, teamId).valueChanges();
        this.checkNextGame();
      }
    });

  }

  checkNextGame(){
    const today: Date =  new Date();
    this.games.subscribe( game => this.nextGame = game[0]);
  }


}
