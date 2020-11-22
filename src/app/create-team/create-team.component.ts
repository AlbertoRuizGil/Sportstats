import { TeamService } from '@/app/shared/services/team.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Team } from '../shared/inteface/team.interface';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.scss'],
})
export class CreateTeamComponent implements OnInit {
  items = [];

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
      points: new FormControl('', [Validators.min(1) ]),
      fieldPercent: new FormControl('', [Validators.min(1) ]),
      threePercent: new FormControl('', [Validators.min(1) ]),
      freePercent: new FormControl('', [Validators.min(1) ]),
    });
  }

  private buildFormPlayers(): void {
    this.formPlayers = new FormArray([]);
  }

  private buildFormGames(): void {
    this.formGames = new FormArray([]);
  }

  onSaveTeam() {

    if (this.formPlayers.length < 2) { }{
      console.log('No hay jugadores suficientes');
    }

    const newTeam: Team = {
      name: this.formTeam.controls.teamName.value
    };

    const teamId = this.teamService.addTeam(this.user.uid, newTeam);

    console.log(teamId);

    console.log(this.form);
    console.log(this.formTeam);
    console.log(this.formLeague);
    console.log(this.formPlayers);
    console.log(this.formGames);
    /* const teamInfo = this.getTeamValues();
    console.log(teamInfo); */
  }

  private getTeamValues() {
    return [
      this.formTeam.get('teamName').value,
      this.formTeam.get('teamShield').value,
    ];
  }
}
