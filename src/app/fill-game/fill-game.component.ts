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
  games: Game[];

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private teamService: TeamService,
    private playerService: PlayerService,
    private router: Router
  ) { }

  get isValid() {
    let valid = true;
    for (const playerForm of this.playersForm) {
      valid = valid && playerForm.form.valid;
    }
    return valid;
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.buildSelectForm();
    this.buildTableForm();

    this.teamId = this.route.snapshot.paramMap.get('teamId');
    this.authService.currentUser$.subscribe((user: firebase.User) => {
      if (user) {
        this.userId = user.uid;
        this.teamService.getGames(user.uid, this.teamId, true)
        .subscribe((gamesReturned: Game[]) => {
          this.games = gamesReturned;
        });
      }
    });

    this.selectForm.get('match').valueChanges.subscribe((value: string) => {
      this.playersForm = [];
      if (value) {
        this.playerService.getPlayers(this.userId, this.teamId, true)
        .subscribe((players: Player[]) => {
          for (const player of players) {
            this.playerService.getPlayerGame(this.userId, this.teamId, player.playerId, value)
              .subscribe((playerGame: PlayerGame) => {
                this.newPlayerForm(player, playerGame);
              }
            );
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
      goalsAgainst: new FormControl(0, [Validators.required, Validators.min(0)])
    });
  }

  private newPlayerForm(player: Player, playerGame: PlayerGame): void {
    const newPlayerForm: PlayerForm = {
      playerInfo: player,
      form: playerGame ? this.newPlayerFormWithInfo(playerGame) : this.newForm()
    };

    this.playersForm.push(newPlayerForm);
  }

  private newForm(): FormGroup{
    return new FormGroup({
      assist: new FormControl(0, [Validators.required, Validators.min(0)]),
      attackRight: new FormControl(0, [Validators.required, Validators.min(0)]),
      attackLeft: new FormControl(0, [Validators.required, Validators.min(0)]),
      attackCenter: new FormControl(0, [Validators.required, Validators.min(0)]),
      defRebound: new FormControl(0, [Validators.required, Validators.min(0)]),
      didPlay: new FormControl(true, Validators.required),
      fieldSuccess: new FormControl(0, [Validators.required, Validators.min(0)]),
      fieldAttemp: new FormControl(0, [Validators.required, Validators.min(0)]),
      foulsMade: new FormControl(0, [Validators.required, Validators.min(0)]),
      foulsRec: new FormControl(0, [Validators.required, Validators.min(0)]),
      freeAttemp: new FormControl(0, [Validators.required, Validators.min(0)]),
      freeSuccess: new FormControl(0, [Validators.required, Validators.min(0)]),
      offRebound: new FormControl(0, [Validators.required, Validators.min(0)]),
      passAttemp: new FormControl(0, [Validators.required, Validators.min(0)]),
      passSuccess: new FormControl(0, [Validators.required, Validators.min(0)]),
      steals: new FormControl(0, [Validators.required, Validators.min(0)]),
      threeAttemp: new FormControl(0, [Validators.required, Validators.min(0)]),
      threeSuccess: new FormControl(0, [Validators.required, Validators.min(0)])
    });
  }

  private newPlayerFormWithInfo(info: PlayerGame): FormGroup{
    return new FormGroup({
      assist: new FormControl(info.assist, [Validators.required, Validators.min(0)]),
      attackRight: new FormControl(info.attackRight, [Validators.required, Validators.min(0)]),
      attackLeft: new FormControl(info.attackLeft, [Validators.required, Validators.min(0)]),
      attackCenter: new FormControl(info.attackCenter, [Validators.required, Validators.min(0)]),
      defRebound: new FormControl(info.defRebound, [Validators.required, Validators.min(0)]),
      didPlay: new FormControl(true, Validators.required),
      fieldAttemp: new FormControl(info.fieldAttemp, [Validators.required, Validators.min(0)]),
      fieldSuccess: new FormControl(info.fieldSuccess, [Validators.required, Validators.min(0)]),
      foulsMade: new FormControl(info.foulsMade, [Validators.required, Validators.min(0)]),
      foulsRec: new FormControl(info.foulsRec, [Validators.required, Validators.min(0)]),
      freeAttemp: new FormControl(info.freeAttemp, [Validators.required, Validators.min(0)]),
      freeSuccess: new FormControl(info.freeSuccess, [Validators.required, Validators.min(0)]),
      offRebound: new FormControl(info.offRebound, [Validators.required, Validators.min(0)]),
      passAttemp: new FormControl(info.passAttemp, [Validators.required, Validators.min(0)]),
      passSuccess: new FormControl(info.passSuccess, [Validators.required, Validators.min(0)]),
      points: new FormControl({value: info.points, disabled: true}, [Validators.required, Validators.min(0)]),
      steals: new FormControl(info.steals, [Validators.required, Validators.min(0)]),
      threeAttemp: new FormControl(info.threeAttemp, [Validators.required, Validators.min(0)]),
      threeSuccess: new FormControl(info.threeSuccess, [Validators.required, Validators.min(0)])
    });
  }

  onSaveGame(): void{

    let totalpoints = 0;

    this.playersForm
      .forEach((playerForm: PlayerForm) => {
        const playerId = playerForm.playerInfo.playerId;
        if (playerForm.form.controls.didPlay.value) {
          const newPlayerGame: PlayerGame = {
            assist: playerForm.form.controls.assist.value,
            attackRight: playerForm.form.controls.attackRight.value,
            attackLeft: playerForm.form.controls.attackLeft.value,
            attackCenter: playerForm.form.controls.attackCenter.value,
            defRebound: playerForm.form.controls.defRebound.value,
            fieldAttemp: playerForm.form.controls.fieldAttemp.value,
            fieldSuccess: playerForm.form.controls.fieldSuccess.value,
            foulsMade: playerForm.form.controls.foulsMade.value,
            foulsRec: playerForm.form.controls.foulsRec.value,
            freeAttemp: playerForm.form.controls.freeAttemp.value,
            freeSuccess: playerForm.form.controls.freeSuccess.value,
            offRebound: playerForm.form.controls.offRebound.value,
            passAttemp: playerForm.form.controls.passAttemp.value,
            passSuccess: playerForm.form.controls.passSuccess.value,
            points: (playerForm.form.controls.freeSuccess.value +
              (playerForm.form.controls.fieldSuccess.value * 2) +
              (playerForm.form.controls.threeSuccess.value * 3)),
            steals: playerForm.form.controls.steals.value,
            threeAttemp: playerForm.form.controls.threeAttemp.value,
            threeSuccess: playerForm.form.controls.threeSuccess.value
          };
          totalpoints += newPlayerGame.points;
          this.playerService.addPlayerGame(this.userId, this.teamId, playerId, newPlayerGame, this.selectForm.controls.match.value);
        } else {
          this.playerService.deletePlayerGame(this.userId, this.teamId, playerId, this.selectForm.controls.match.value);
        }
      }
    );

    const newGame: Game = this.games.find((game: Game) => game.matchId === this.selectForm.controls.match.value);
    newGame.goalsFor = totalpoints;
    newGame.goalsAgainst = this.tableForm.controls.goalsAgainst.value;

    this.teamService.addTeamGame(this.userId, this.teamId, newGame);

    this.router.navigateByUrl('/team/' + this.teamId);
  }
}
