import { PlayerForm } from '@/app/shared/inteface/player.interface';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-player-game',
  templateUrl: './player-game.component.html',
  styleUrls: ['./player-game.component.scss']
})
export class PlayerGameComponent implements OnInit {

  @Input()
  onePlayerForm: PlayerForm;
  didPlay = true;

  constructor() { }

  ngOnInit(): void {
  }

}
