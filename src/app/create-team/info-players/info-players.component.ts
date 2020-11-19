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

  private newPlayerForm() {
    return new FormGroup({
      playerName: new FormControl('', Validators.required),
    });
  }
}
