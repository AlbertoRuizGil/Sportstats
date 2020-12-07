import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-info-player',
  templateUrl: './info-player.component.html',
  styleUrls: ['./info-player.component.scss'],
})
export class InfoPlayerComponent implements OnInit {
  @Input()
  form: FormGroup;

  @Output()
  deleteBtn: EventEmitter<void> = new EventEmitter<void>();

  private readonly defaultPlayerUrl = '/assets/img/avatar-generico.png';
  playerUrl = this.defaultPlayerUrl;

  constructor() {}

  ngOnInit(): void {}

  deleteBtnClick() {
    this.deleteBtn.emit();
  }

  onChange(files: FileList): void {
    if (files && files.length && files.item(0)) {
      const file = files.item(0);
      const fr = new FileReader();
      fr.onload = (e: ProgressEvent) => {
        this.playerUrl = (e.target as FileReader).result.toString();
      };
      fr.readAsDataURL(file);
      this.form.get('playerAvatar').setValue(file);
    } else {
      this.playerUrl = this.defaultPlayerUrl;
      this.form.get('playerAvatar').reset();
    }
  }
}
