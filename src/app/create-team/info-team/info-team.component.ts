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
  }

  onChange(files: FileList): void {
    if (files && files.length && files.item(0)) {
      this.form.get('teamShield').setValue(files.item(0));
    }
  }
}
