import { Player } from '@/app/shared/inteface/player.interface';
import { TeamService } from '@/app/shared/services/team.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Game, League, Sport, Team } from '../shared/inteface/team.interface';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.scss'],
})
export class CreateTeamComponent implements OnInit {
  haveEnoughPlayers = true;
  private user: firebase.User;
  form: FormGroup;
  formTeam: FormGroup;
  formLeague: FormGroup;
  formPlayers: FormArray;
  formGames: FormArray;

  constructor(private teamService: TeamService, private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((currentUser: firebase.User) => {
      if (currentUser) {
        this.user = currentUser;
      }
    });
    this.buildFormTeam();
    this.buildFormLeague();
    this.buildFormPlayers();
    this.buildFormGames();
    this.buildForm();
  }

  private buildForm(): void {
    this.form = new FormGroup({
      formTeam: this.formTeam,
      formLeague: this.formLeague,
      formPlayers: this.formPlayers,
      formGames: this.formGames,
    });
  }

  private buildFormTeam(): void {
    this.formTeam = new FormGroup({
      teamName: new FormControl('', Validators.required),
      teamShield: new FormControl(),
    });
  }

  private buildFormLeague(): void {
    this.formLeague = new FormGroup({
      points: new FormControl(0, [Validators.min(1) ]),
      fieldPercent: new FormControl(0, [Validators.min(1), Validators.max(100) ]),
      threePercent: new FormControl(0, [Validators.min(1), Validators.max(100) ]),
      freePercent: new FormControl(0, [Validators.min(1), Validators.max(100) ]),
    });
  }

  private buildFormPlayers(): void {
    this.formPlayers = new FormArray([]);
  }

  private buildFormGames(): void {
    this.formGames = new FormArray([]);
  }

  onSaveTeam() {
    console.log('onSaveTeam');

    if (this.formPlayers.length < 5) {
      console.log(this.formPlayers.length);
      this.haveEnoughPlayers = false;
      return;
    }

    const newTeam: Team = {
      name: this.formTeam.controls.teamName.value,
      shield: this.formTeam.controls.teamShield.value,
      sport: Sport.Basketball
    };

    const newLeague: League = {
      points: this.formLeague.controls.points.value,
      fieldPercent: this.formLeague.controls.fieldPercent.value,
      threePercent: this.formLeague.controls.threePercent.value,
      freePercent: this.formLeague.controls.freePercent.value
    };

    const newPlayers: Player[] = [];
    this.formPlayers.controls.forEach((formPlayer: FormGroup) => {
      const newPlayer: Player = {
      playerName: formPlayer.controls.playerName.value,
      playerAge: formPlayer.controls.playerAge.value,
      playerNumber: formPlayer.controls.playerNumber.value
      };
      newPlayers.push(newPlayer);
    });

    const newGames: Game[] = [];
    this.formGames.controls.forEach((formGame: FormGroup) => {
      const chunks = formGame.controls.matchDate.value.split('-');
      const matchDateNoFormat = new Date(chunks[0], chunks[1], chunks[2]);
      const matchDateFormat = matchDateNoFormat.getTime();
      const newGame: Game = {
        matchDate: matchDateFormat,
        rivalTeam: formGame.controls.rivalTeam.value
      };
      newGames.push(newGame);
    });

    const teamId = this.teamService.addTeam(this.user.uid, newTeam, newLeague, newPlayers, newGames);
    this.router.navigateByUrl('/userTeams' );

  }

  private getTeamValues() {
    return [
      this.formTeam.get('teamName').value,
      this.formTeam.get('teamShield').value,
    ];
  }
}
