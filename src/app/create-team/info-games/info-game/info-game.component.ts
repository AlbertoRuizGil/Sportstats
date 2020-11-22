import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-info-game',
  templateUrl: './info-game.component.html',
  styleUrls: ['./info-game.component.scss']
})
export class InfoGameComponent implements OnInit {

  @Input()
  form: FormGroup;

  @Input()
  gameNumber: number;

  @Output()
  deleteBtn: EventEmitter<number> = new EventEmitter<number>();


  constructor() { }

  ngOnInit(): void {
  }

  deleteBtn_Click(){
    this.deleteBtn.emit(this.gameNumber);
  }

}
