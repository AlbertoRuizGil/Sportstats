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

  private maxPlayers = 10;

  constructor() {}

  ngOnInit(): void {}

  onNewPlayer() {
    if (this.form.length < this.maxPlayers){
      this.form.controls.push(this.newPlayerForm());
    }
  }

  private newPlayerForm(): FormGroup {
    return new FormGroup({
      playerName: new FormControl('', Validators.required),
      playerAge: new FormControl('', [Validators.required, Validators.min(3)]),
      playerNumber: new FormControl('', Validators.required),
      playerAvatar: new FormControl('')
    });
  }

  deleteBtnHandler(value: FormGroup) {
    this.form.controls.splice(this.form.controls.indexOf(value), 1);
  }
}
