import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-info-league',
  templateUrl: './info-league.component.html',
  styleUrls: ['./info-league.component.scss']
})
export class InfoLeagueComponent implements OnInit {

  @Input()
  form: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

}
