import { PlayerForm } from '@/app/shared/inteface/player.interface';
import { SportStatsValidators } from '@/app/shared/validators/sport-stats.validators';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-player-game',
  templateUrl: './player-game.component.html',
  styleUrls: ['./player-game.component.scss']
})
export class PlayerGameComponent implements OnInit {

  @Input()
  onePlayerForm: PlayerForm;

  constructor() { }

  ngOnInit(): void {
    this.onePlayerForm.form.setValidators([
      SportStatsValidators.minusOrEqual(this.onePlayerForm.form.get('fieldSuccess'), this.onePlayerForm.form.get('fieldAttemp')),
      SportStatsValidators.minusOrEqual(this.onePlayerForm.form.get('freeSuccess'), this.onePlayerForm.form.get('freeAttemp')),
      SportStatsValidators.minusOrEqual(this.onePlayerForm.form.get('threeSuccess'), this.onePlayerForm.form.get('threeAttemp')),
      SportStatsValidators.minusOrEqual(this.onePlayerForm.form.get('passSuccess'), this.onePlayerForm.form.get('passAttemp'))
    ]);
  }

  onCheck(){
    this.onePlayerForm.form.get('didPlay').setValue(!this.onePlayerForm.form.get('didPlay').value);
  }

}
