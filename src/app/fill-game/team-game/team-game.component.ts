import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-team-game',
  templateUrl: './team-game.component.html',
  styleUrls: ['./team-game.component.scss']
})
export class TeamGameComponent implements OnInit {
  @Input()
  form: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

}
