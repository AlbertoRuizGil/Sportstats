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

  constructor() {}

  ngOnInit(): void {}

  deleteBtnClick() {
    this.deleteBtn.emit();
  }
}
