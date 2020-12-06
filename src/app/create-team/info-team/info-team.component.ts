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

  private readonly defaultShieldUrl = '/assets/img/genericShield.jpg';
  shieldUrl = this.defaultShieldUrl;


  constructor() {}

  ngOnInit(): void {
  }

  onChange(files: FileList): void {
    if (files && files.length && files.item(0)) {
      const file = files.item(0);
      const fr = new FileReader();
      fr.onload = (e: ProgressEvent) => {
        this.shieldUrl = (e.target as FileReader).result.toString();
      };
      fr.readAsDataURL(file);
      this.form.get('teamShield').setValue(file);
    } else {
      this.shieldUrl = this.defaultShieldUrl;
      this.form.get('teamShield').reset();
    }
  }
}
