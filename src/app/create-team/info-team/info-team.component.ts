import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-info-team',
  templateUrl: './info-team.component.html',
  styleUrls: ['./info-team.component.scss'],
})
export class InfoTeamComponent implements OnInit {
  @Input()
  form: FormGroup;

  constructor() {}

  ngOnInit(): void {
    console.log(this.form);
  }
}
