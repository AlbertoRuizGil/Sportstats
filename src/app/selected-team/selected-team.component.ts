import { Game, Player, Team } from '@/app/shared/inteface/team.interface';
import { AuthService } from '@/app/shared/services/auth.service';
import { PlayerService } from '@/app/shared/services/player.service';
import { TeamService } from '@/app/shared/services/team.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-selected-team',
  templateUrl: './selected-team.component.html',
  styleUrls: ['./selected-team.component.scss'],
})
export class SelectedTeamComponent implements OnInit {
  public teamInfo: Team;
  public players: Observable<Player[]>;
  public nextGame: Game = undefined;

  public wins = 0;

  public goals = 0;

  public winAverage: number;

  constructor(
    public teamService: TeamService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,

    private playerService: PlayerService
  ) {}

  ngOnInit(): void {
    const teamId = this.route.snapshot.paramMap.get('teamId');
    this.authService.currentUser$.subscribe((user: firebase.User) => {
      if (user) {
        this.teamService
          .getTeamById(user.uid, teamId)
          .valueChanges()
          .subscribe((team: Team) => {
            this.teamInfo = team;
          });
        this.teamService
          .getGames(user.uid, teamId)
          .valueChanges()
          .subscribe((games: Game[]) => {
            this.getNextGame(games);
            this.getTableInfo(games);
          });
        this.players = this.playerService
          .getPlayers(user.uid, teamId)
          .valueChanges();
      }
    });
  }

  getNextGame(games: Game[]): void {
    const today: number = new Date().getTime();
    let difference: number = Number.MAX_VALUE;
    games.forEach((game) => {
      if (game.date - today > 0 && game.date - today < difference) {
        this.nextGame = game;
        difference = game.date - today;
      }
    });
  }

  getTableInfo(games: Game[]) {
    games.forEach((game) => {
      if (game.goalsFor > game.goalsAgainst) {
        this.wins++;
      }
      this.goals += game.goalsFor;
    });

    this.winAverage = this.wins / games.length;
  }
}
