import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-info-games',
  templateUrl: './info-games.component.html',
  styleUrls: ['./info-games.component.scss']
})
export class InfoGamesComponent implements OnInit {

  @Input()
  form: FormArray;

  constructor() { }

  ngOnInit(): void {
  }

  onNewGame(): void {
    this.form.controls.push(this.newGameForm());
  }

  private newGameForm(): FormGroup{
    return new FormGroup({
      rivalTeam: new FormControl('', Validators.required),
      matchDate: new FormControl('', Validators.required),
    });
  }

  deleteBtnHandler(value: FormGroup): void{
    this.form.controls.splice(this.form.controls.indexOf(value), 1);
  }

}
