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

  @Input()
  playerArrayNumber: number;

  @Output()
  deleteBtn: EventEmitter<number> = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {

  }

  deleteBtn_Click(){
    this.deleteBtn.emit(this.playerArrayNumber);
  }
}
