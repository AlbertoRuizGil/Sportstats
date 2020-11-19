import { TeamService } from '@/app/shared/services/team.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.scss'],
})
export class CreateTeamComponent implements OnInit {
  items = [];
  form: FormGroup;
  formTeam: FormGroup;
  formLeague: FormGroup;
  formPlayers: FormArray;
  formGames: FormArray;

  constructor(private teamService: TeamService, private router: Router) {}

  ngOnInit(): void {
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
      teamName: new FormControl('', Validators.required),
      teamShield: new FormControl(),
    });
  }

  private buildFormPlayers(): void {
    this.formPlayers = new FormArray([]);
  }

  private buildFormGames(): void {
    this.formGames = new FormArray([]);
  }

  onSaveTeam() {
    const teamInfo = this.getTeamValues();
    console.log(teamInfo);

    /*this.teamService
      .saveTeam(teamInfo, playersInfo, leagueInfo)
      .subscribe((success: boolean) => {
        if (success) {
          this.router.navigate();
        }
      });*/
  }

  private getTeamValues() {
    return [
      this.formTeam.get('teamName').value,
      this.formTeam.get('teamShield').value,
    ];
  }
}
