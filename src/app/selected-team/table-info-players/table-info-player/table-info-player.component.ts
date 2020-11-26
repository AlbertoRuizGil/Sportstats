import { Player, PlayerGame } from '@/app/shared/inteface/player.interface';
import { AuthService } from '@/app/shared/services/auth.service';
import { PlayerService } from '@/app/shared/services/player.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-info-player',
  templateUrl: './table-info-player.component.html',
  styleUrls: ['./table-info-player.component.scss']
})
export class TableInfoPlayerComponent implements OnInit {

  @Input()
  player: Player;

  @Input()
  teamId: string;

  playerGames: PlayerGame[];

  games = 0;
  pointsPerGame = 0;
  fieldPer = 0;
  freePer = 0;
  threePer = 0;


   constructor(
    private playerService: PlayerService,

    private authService: AuthService
    ) { }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user: firebase.User) => {
      if (user) {
        this.playerService
        .getPlayerGames(user.uid, this.teamId, this.player.playerId)
        .valueChanges()
        .subscribe( value => {
          this.playerGames = value;
          this.setNumberGames();
          if (this.games != 0){
            this.setGeneralStats();
          }
        });
      }
    });
  }

  setGeneralStats(): void{
    this.setFieldPer();
    this.setFreePer();
    this.setThreePer();
    this.setPointsPerGame();
  }

  setNumberGames(): void{
    this.games = this.playerGames.length;
  }

  setFieldPer(): void{
    let fieldAttemps = 0;
    let fieldSucceed = 0;
    this.playerGames.forEach((playerGame: PlayerGame) => {
      fieldAttemps += playerGame.fieldAttemp;
      fieldSucceed += playerGame.fieldSuccess;
    });

    this.fieldPer = fieldSucceed / fieldAttemps;
  }

  setFreePer(): void{
    let freeAttemps = 0;
    let freeSucceed = 0;
    this.playerGames.forEach((playerGame: PlayerGame) => {
      freeAttemps += playerGame.freeAttemp;
      freeSucceed += playerGame.freeSuccess;
    });

    this.freePer = freeSucceed / freeAttemps;
  }

  setThreePer(): void{
    let threeAttemps = 0;
    let threeSucced = 0;
    this.playerGames.forEach((playerGame: PlayerGame) => {
      threeAttemps += playerGame.threeAttemp;
      threeSucced += playerGame.threeSuccess;
    });

    this.threePer = threeSucced / threeAttemps;
  }

  setPointsPerGame(): void{
    let totalPoints = 0;

    this.playerGames.forEach((playerGame: PlayerGame) => {
      totalPoints += playerGame.points;
    });
    this.pointsPerGame = totalPoints / this.games;
  }

}
