import { Component, OnInit } from '@angular/core';

import { AuthService } from '../shared/services/auth.service';
import { PlayerService } from '../shared/services/player.service';

@Component({
  selector: 'app-selected-player',
  templateUrl: './selected-player.component.html',
  styleUrls: ['./selected-player.component.scss']
})
export class SelectedPlayerComponent implements OnInit {

  constructor(
    private playerService: PlayerService,
    private authService: AuthService) { }

  ngOnInit(): void {
  }

}
