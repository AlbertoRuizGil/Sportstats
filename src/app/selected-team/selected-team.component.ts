import { Player } from '@/app/shared/inteface/player.interface';
import { Game, Team } from '@/app/shared/inteface/team.interface';
import { AuthService } from '@/app/shared/services/auth.service';
import { PlayerService } from '@/app/shared/services/player.service';
import { TeamService } from '@/app/shared/services/team.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-selected-team',
  templateUrl: './selected-team.component.html',
  styleUrls: ['./selected-team.component.scss'],
})
export class SelectedTeamComponent implements OnInit {

  public userId: string;
  public teamId: string;
  public teamInfo: Team;
  public players: Observable<Player[]>;
  public games: Game[];
  public nextGame: Game = undefined;
  public formGame: FormGroup;
  public showNewGame = false;
  public showStats = false;

  constructor(
    public teamService: TeamService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private playerService: PlayerService
  ) {}

  ngOnInit(): void {
    this.teamId = this.route.snapshot.paramMap.get('teamId');
    this.authService.currentUser$.subscribe((user: firebase.User) => {
      if (user) {
        this.userId = user.uid;
        this.teamService
          .getTeamById(this.userId, this.teamId)
          .valueChanges()
          .subscribe((team: Team) => {
            this.teamInfo = team;
          });
        this.teamService
          .getGames(user.uid, this.teamId)
          .valueChanges()
          .subscribe((games: Game[]) => {
            this.games = games;
            this.needToShowStats();
            this.getNextGame(games);
          });
        this.players = this.playerService
          .getPlayers(user.uid, this.teamId)
          .valueChanges({idField: 'playerId'});
      }
    });
  }

  getNextGame(games: Game[]): void {
    const today: number = new Date().getTime();
    let difference: number = Number.MAX_VALUE;
    games.forEach((game) => {
      if (game.matchDate - today > 0 && game.matchDate - today < difference) {
        this.nextGame = game;
        difference = game.matchDate - today;
      }

    });
  }

  onNewGame(): void {
    this.formGame = new FormGroup({
      rivalTeam: new FormControl('', Validators.required),
      matchDate: new FormControl('', Validators.required),
    });
    this.showNewGame = true;
  }

  onSaveNewGame(): void {
    const chunks = this.formGame.controls.matchDate.value.split('-');
    const matchDateNoFormat = new Date(chunks[0], chunks[1], chunks[2]);
    const matchDateFormat = matchDateNoFormat.getTime();
    const newGame: Game = {
      matchDate: matchDateFormat,
      rivalTeam: this.formGame.controls.rivalTeam.value
    };
    this.teamService.addTeamGame(this.userId, this.teamId, newGame);
    this.showNewGame = false;
  }

  needToShowStats(): void{
    this.games.forEach((game: Game) => {
      if (game.goalsAgainst !== undefined && game.goalsFor !== undefined){
        this.showStats = true;
      }
    });
  }
}
