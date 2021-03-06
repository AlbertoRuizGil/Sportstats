import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-info-game',
  templateUrl: './info-game.component.html',
  styleUrls: ['./info-game.component.scss'],
})
export class InfoGameComponent implements OnInit {
  @Input()
  form: FormGroup;

  @Input()
  showDelete = false;

  @Output()
  deleteBtn: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}
  ngOnInit(): void {}

  deleteBtnClick() {
    this.deleteBtn.emit();
  }
}
