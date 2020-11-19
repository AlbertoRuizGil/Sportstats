import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-info-player',
  templateUrl: './info-player.component.html',
  styleUrls: ['./info-player.component.scss'],
})
export class InfoPlayerComponent implements OnInit {
  @Input()
  form: FormGroup;

  constructor() {}

  ngOnInit(): void {}
}
