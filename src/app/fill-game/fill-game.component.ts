import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Player, PlayerForm } from '../shared/inteface/player.interface';
import { Game } from '../shared/inteface/team.interface';
import { AuthService } from '../shared/services/auth.service';
import { PlayerService } from '../shared/services/player.service';
import { TeamService } from '../shared/services/team.service';

@Component({
  selector: 'app-fill-game',
  templateUrl: './fill-game.component.html',
  styleUrls: ['./fill-game.component.scss']
})
export class FillGameComponent implements OnInit {

  private userId: string;
  teamId: string;
  selectForm: FormGroup;
  tableForm: FormGroup;
  playersForm: PlayerForm[] = [];
  matchId: string = null;
  games: Game[];

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private teamService: TeamService,
    private playerService: PlayerService
  ) { }

  ngOnInit(): void {
    this.buildSelectForm();
    this.buildTableForm();

    this.teamId = this.route.snapshot.paramMap.get('teamId');
    this.authService.currentUser$.subscribe((user: firebase.User) => {
      if (user) {
        this.userId = user.uid;
        this.teamService.getGames(user.uid, this.teamId)
        .valueChanges({idField: 'matchId'})
        .subscribe((gamesReturned: Game[]) => {
          this.games = gamesReturned;
        });
      }
    });

    this.selectForm.get('match').valueChanges.subscribe((value: string) => {
      this.playersForm = [];
      if (value) {
        this.matchId = value;
        this.playerService.getPlayers(this.userId, this.teamId).valueChanges({idField: 'playerId'})
        .subscribe((players: Player[]) => {
          for (const player of players) {
              console.log('fill-game: create player-game', player);
              this.onNewPlayer(player);
            }
          });
      }
    });

  }

  buildSelectForm(): void{
    this.selectForm = new FormGroup({
      match: new FormControl('', Validators.required)
    });
  }

  buildTableForm(): void{
    this.tableForm = new FormGroup({
      goalsFor: new FormControl({ value: '0', disabled: true }, Validators.required),
      goalsAgainst: new FormControl('0', Validators.required)
    });
  }


  private newPlayerForm(): FormGroup{
    return new FormGroup({
      assist: new FormControl(0, Validators.required),
      attackRight: new FormControl(0, Validators.required),
      attackLeft: new FormControl(0, Validators.required),
      attackCenter: new FormControl(0, Validators.required),
      defRebound: new FormControl(0, Validators.required),
      fieldAttemp: new FormControl(0, Validators.required),
      fieldSuccess: new FormControl(0, Validators.required),
      foulsMade: new FormControl(0, Validators.required),
      foulsRec: new FormControl(0, Validators.required),
      freeAttemp: new FormControl(0, Validators.required),
      freeSuccess: new FormControl(0, Validators.required),
      offRebound: new FormControl(0, Validators.required),
      passAttemp: new FormControl(0, Validators.required),
      passSuccess: new FormControl(0, Validators.required),
      points: new FormControl(0, Validators.required),
      steals: new FormControl(0, Validators.required),
      threeAttemp: new FormControl(0, Validators.required),
      threeSuccess: new FormControl(0, Validators.required)
    });
  }

  onNewPlayer(player: Player): void {
    const newplayerForm: PlayerForm = {
      playerInfo: player,
      playerform: this.newPlayerForm()
    };

    this.playersForm.push(newplayerForm);
  }
}
