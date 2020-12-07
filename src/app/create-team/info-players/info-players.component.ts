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

  constructor() {}

  ngOnInit(): void {}

  onNewPlayer() {
    this.form.controls.push(this.newPlayerForm());
    console.log(this.form);
  }

  private newPlayerForm(): FormGroup {
    return new FormGroup({
      playerName: new FormControl('', [Validators.required, Validators.min(3)]),
      playerAge: new FormControl('', [Validators.required, Validators.min(3)]),
      playerNumber: new FormControl('', [Validators.required, Validators.min(3)]),
    });
  }

  deleteBtnHandler(value: FormGroup) {
    this.form.controls.splice(this.form.controls.indexOf(value), 1);
  }
}
