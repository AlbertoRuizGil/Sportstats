import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Player } from '../shared/inteface/player.interface';
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

  teamId: string;
  selectForm: FormGroup;
  playersForm: FormArray;
  games: Game[];

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private teamService: TeamService,
    private playerService: PlayerService
  ) { }

  ngOnInit(): void {
    this.buildSelectForm();
    this.buildPlayerForm();

    this.teamId = this.route.snapshot.paramMap.get('teamId');
    this.authService.currentUser$.subscribe((user: firebase.User) => {
      if (user) {
        this.teamService.getGames(user.uid, this.teamId)
        .valueChanges({idField: 'matchId'})
        .subscribe((gamesReturned: Game[]) => {
          this.games = gamesReturned;
        });

        this.playerService.getPlayers(user.uid, this.teamId).valueChanges({idField: 'playerId'})
        .subscribe((players: Player[]) => {

        });
      }
    });

  }

  buildSelectForm(): void{
    this.selectForm = new FormGroup({
      match: new FormControl('', Validators.required)
    });
  }

  buildPlayerForm(): void{
    this.playersForm = new FormArray([]);
  }

  private newPlayerForm(): FormGroup{
    return new FormGroup({
      assists: new FormControl(0, Validators.required),
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

  onNewPlayer(): void {
    this.playersForm.controls.push(this.newPlayerForm());
  }



  onChangeSelect(): void{
    console.log('Select');
  }

}
