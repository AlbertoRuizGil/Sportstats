import { Player, PlayerGame, PlayerGeneralStats, PlayerGeneralTable } from '@/app/shared/inteface/player.interface';
import { AuthService } from '@/app/shared/services/auth.service';
import { PlayerService } from '@/app/shared/services/player.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-table-info-players',
  templateUrl: './table-info-players.component.html',
  styleUrls: ['./table-info-players.component.scss']
})
export class TableInfoPlayersComponent implements OnInit {

  public teamId: string;
  public players: Player[];

  public playersGeneralTable: PlayerGeneralTable[] = [];

  constructor(
    private playerService: PlayerService,
    private route: ActivatedRoute,

    private authService: AuthService
    ) { }

  ngOnInit(): void {
    this.teamId = this.route.snapshot.paramMap.get('teamId');
    this.authService.currentUser$.subscribe((user: firebase.User) => {
      if (user) {
        this.playerService
          .getPlayers(user.uid, this.teamId)
          .valueChanges({idField: 'playerId'})
          .subscribe(value => {
            this.players = value;
            this.players.forEach((player: Player) => {
              this.playerService
              .getPlayerGames(user.uid, this.teamId, player.playerId)
              .valueChanges()
              .subscribe((playerGames: PlayerGame[]) => {
                this.playersGeneralTable.push(this.createPlayerGeneralTable(player, playerGames));
              });
            });
          });
      }
    });
  }

  createPlayerGeneralTable(player: Player, playerGames: PlayerGame[]): PlayerGeneralTable{
    let playerGeneralTable: PlayerGeneralTable;

    playerGeneralTable = {
      playerInfo: player,
      playerGeneralStats: this.setGeneralStats(playerGames)
    };

    return playerGeneralTable;
  }
  setGeneralStats(playerGames: PlayerGame[]): PlayerGeneralStats{
    let playerGeneralStats: PlayerGeneralStats;

    playerGeneralStats = {
      games: this.setNumberGames(playerGames),
      freePer: this.setFreePer(playerGames),
      threePer: this.setThreePer(playerGames),
      fieldPer: this.setFieldPer(playerGames),
      pointsPerGame: this.setPointsPerGame(playerGames)
    };

    return playerGeneralStats;
  }

  setNumberGames(playerGames: PlayerGame[]): number{
    return playerGames.length;
  }

  setFieldPer(playerGames: PlayerGame[]): number{
    let fieldAttemps = 0;
    let fieldSucceed = 0;
    playerGames.forEach((playerGame: PlayerGame) => {
      if (playerGame.fieldAttemp !== undefined && playerGame.fieldSuccess !== undefined){
        fieldAttemps += playerGame.fieldAttemp;
        fieldSucceed += playerGame.fieldSuccess;
      }
    });

    return fieldSucceed / fieldAttemps;
  }

  setFreePer(playerGames: PlayerGame[]): number{
    let freeAttemps = 0;
    let freeSucceed = 0;
    playerGames.forEach((playerGame: PlayerGame) => {
      if (playerGame.freeAttemp !== undefined && playerGame.freeSuccess !== undefined){
        freeAttemps += playerGame.freeAttemp;
        freeSucceed += playerGame.freeSuccess;
      }
    });

    return freeSucceed / freeAttemps;
  }

  setThreePer(playerGames: PlayerGame[]): number{
    let threeAttemps = 0;
    let threeSucced = 0;
    playerGames.forEach((playerGame: PlayerGame) => {
      if (playerGame.threeAttemp !== undefined && playerGame.threeSuccess !== undefined){
        threeAttemps += playerGame.threeAttemp;
        threeSucced += playerGame.threeSuccess;
      }
    });

    return threeSucced / threeAttemps;
  }

  setPointsPerGame(playerGames: PlayerGame[]): number{
    let totalPoints = 0;

    playerGames.forEach((playerGame: PlayerGame) => {
      totalPoints += playerGame.points;
    });

    return totalPoints / playerGames.length;
  }
}
