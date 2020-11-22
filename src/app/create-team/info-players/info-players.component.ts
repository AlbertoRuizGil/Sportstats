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
  }

  private newPlayerForm(): FormGroup {
    return new FormGroup({
      playerName: new FormControl('', Validators.required),
      playerAge: new FormControl('', Validators.required),
      playerNumber: new FormControl('', Validators.required),
    });
  }

  deleteBtnHandler(value: number){
    this.form.controls.splice(value, 1);
  }
}
