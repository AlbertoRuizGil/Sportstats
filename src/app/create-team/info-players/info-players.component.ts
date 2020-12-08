import { SportStatsValidators } from '@/app/shared/validators/sport-stats.validators';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-info-players',
  templateUrl: './info-players.component.html',
  styleUrls: ['./info-players.component.scss'],
})
export class InfoPlayersComponent implements OnInit {
  @Input()
  form: FormArray;

  private minPlayers = 5;
  private maxPlayers = 10;

  constructor() {}

  ngOnInit(): void {}

  onNewPlayer() {
    this.form.setValidators(SportStatsValidators.range(this.minPlayers, this.maxPlayers));
    this.form.push(this.newPlayerForm());
  }

  private newPlayerForm(): FormGroup {
    return new FormGroup({
      playerName: new FormControl('', Validators.required),
      playerAge: new FormControl('', [Validators.required, Validators.min(3)]),
      playerNumber: new FormControl('', Validators.required),
      playerAvatar: new FormControl()
    });
  }

  deleteBtnHandler(value: FormGroup) {
    this.form.removeAt(this.form.controls.indexOf(value));
  }
}
