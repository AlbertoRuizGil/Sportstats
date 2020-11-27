import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-player-game',
  templateUrl: './player-game.component.html',
  styleUrls: ['./player-game.component.scss']
})
export class PlayerGameComponent implements OnInit {

  @Input()
  form: FormGroup;
  didPlay = true;

  constructor() { }

  ngOnInit(): void {
  }

}
