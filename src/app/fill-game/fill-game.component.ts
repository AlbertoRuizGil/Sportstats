import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Player, PlayerForm, PlayerGame } from '../shared/inteface/player.interface';
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
    private playerService: PlayerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
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

  private newPlayerFormWithInfo(info: PlayerGame): FormGroup{
    return new FormGroup({
      assist: new FormControl(info.assist, Validators.required),
      attackRight: new FormControl(info.attackRight, Validators.required),
      attackLeft: new FormControl(info.attackLeft, Validators.required),
      attackCenter: new FormControl(info.attackCenter, Validators.required),
      defRebound: new FormControl(info.defRebound, Validators.required),
      fieldAttemp: new FormControl(info.fieldAttemp, [Validators.required]),
      fieldSuccess: new FormControl(info.fieldSuccess, Validators.required),
      foulsMade: new FormControl(info.foulsMade, Validators.required),
      foulsRec: new FormControl(info.foulsRec, Validators.required),
      freeAttemp: new FormControl(info.freeAttemp, Validators.required),
      freeSuccess: new FormControl(info.freeSuccess, Validators.required),
      offRebound: new FormControl(info.offRebound, Validators.required),
      passAttemp: new FormControl(info.passAttemp, Validators.required),
      passSuccess: new FormControl(info.passSuccess, Validators.required),
      points: new FormControl({value: info.points, disabled: true}, Validators.required),
      steals: new FormControl(info.steals, Validators.required),
      threeAttemp: new FormControl(info.threeAttemp, Validators.required),
      threeSuccess: new FormControl(info.threeSuccess, Validators.required)
    });
  }


  private newPlayerForm(): FormGroup{
    return new FormGroup({
      assist: new FormControl(0, Validators.required),
      attackRight: new FormControl(0, Validators.required),
      attackLeft: new FormControl(0, Validators.required),
      attackCenter: new FormControl(0, Validators.required),
      defRebound: new FormControl(0, Validators.required),
      fieldSuccess: new FormControl(0, Validators.required),
      fieldAttemp: new FormControl(0, Validators.required),
      foulsMade: new FormControl(0, Validators.required),
      foulsRec: new FormControl(0, Validators.required),
      freeAttemp: new FormControl(0, Validators.required),
      freeSuccess: new FormControl(0, Validators.required),
      offRebound: new FormControl(0, Validators.required),
      passAttemp: new FormControl(0, Validators.required),
      passSuccess: new FormControl(0, Validators.required),
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

  onSaveGame(): void{
    let totalpoints = 0;

    this.playersForm.forEach((playerForm: PlayerForm) => {
      const playerId = playerForm.playerInfo.playerId;
      const newPlayerGame: PlayerGame = {
      assist: playerForm.playerform.controls.assist.value,
      attackRight: playerForm.playerform.controls.attackRight.value,
      attackLeft: playerForm.playerform.controls.attackLeft.value,
      attackCenter: playerForm.playerform.controls.attackCenter.value,
      defRebound: playerForm.playerform.controls.defRebound.value,
      fieldAttemp: playerForm.playerform.controls.fieldAttemp.value,
      fieldSuccess: playerForm.playerform.controls.fieldSuccess.value,
      foulsMade: playerForm.playerform.controls.foulsMade.value,
      foulsRec: playerForm.playerform.controls.foulsRec.value,
      freeAttemp: playerForm.playerform.controls.freeAttemp.value,
      freeSuccess: playerForm.playerform.controls.freeSuccess.value,
      offRebound: playerForm.playerform.controls.offRebound.value,
      passAttemp: playerForm.playerform.controls.passAttemp.value,
      passSuccess: playerForm.playerform.controls.passSuccess.value,
      points: (playerForm.playerform.controls.freeSuccess.value +
        (playerForm.playerform.controls.fieldSuccess.value * 2) +
        (playerForm.playerform.controls.threeSuccess.value * 3)),
      steals: playerForm.playerform.controls.steals.value,
      threeAttemp: playerForm.playerform.controls.threeAttemp.value,
      threeSuccess: playerForm.playerform.controls.threeSuccess.value
    };
      totalpoints += newPlayerGame.points;
      this.playerService.addPlayerGame(this.userId, this.teamId, playerId, newPlayerGame, this.selectForm.controls.match.value);
    });

    const newGame: Game = this.games.find((game: Game) => game.matchId === this.matchId);
    newGame.goalsFor = totalpoints;
    newGame.goalsAgainst = this.tableForm.controls.goalsAgainst.value;

    this.teamService.addTeamGame(this.userId, this.teamId, newGame);

    this.router.navigateByUrl('/team/' + this.teamId);
  }
}
