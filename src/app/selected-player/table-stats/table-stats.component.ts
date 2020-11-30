import { Player, PlayerCompleteStats, PlayerGame, PlayerTable } from '@/app/shared/inteface/player.interface';
import { AuthService } from '@/app/shared/services/auth.service';
import { PlayerService } from '@/app/shared/services/player.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-table-stats',
  templateUrl: './table-stats.component.html',
  styleUrls: ['./table-stats.component.scss']
})
export class TableStatsComponent implements OnInit {

  teamId: string;
  playerId: string;
  playerTable: PlayerTable;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private playerService: PlayerService
    ) { }

  ngOnInit(): void {
    this.teamId = this.route.snapshot.paramMap.get('teamId');
    this.playerId = this.route.snapshot.paramMap.get('playerId');
    this.authService.currentUser$.subscribe((user: firebase.User) => {
      if (user) {
        this.playerService
        .getPlayerInfo(user.uid, this.teamId, this.playerId)
        .valueChanges()
        .subscribe((playerInfo: Player) => {
          this.playerService
          .getPlayerGames(user.uid, this.teamId, this.playerId)
          .valueChanges()
          .subscribe((playerGames) => {
            this.playerTable = this.setPlayersTable(playerInfo, playerGames);
        });
        });
      }
    });
  }

  setPlayersTable(player: Player, playerGames: PlayerGame[]): PlayerTable{
    let newplayerTable: PlayerTable;

    newplayerTable = {
      playerInfo: player,
      playerCompleteStats: this.setPlayerStats(playerGames)
    };

    return newplayerTable;
  }

  setPlayerStats(playerGames: PlayerGame[]): PlayerCompleteStats{
    let playerCompleteStats: PlayerCompleteStats;

    playerCompleteStats = {
      games: this.setNumberGames(playerGames),
      pointsPerGame: this.setPointsPerGame(playerGames),
      fieldPerGame: this.setFieldPerGame(playerGames),
      fieldPercent: this.setFieldPercent(playerGames),
      threePercent: this.setThreePercent(playerGames),
      freePercent: this.setFreePercent(playerGames),
      offRebound: this.setOReboundPerGame(playerGames),
      defRebound: this.setDReboundPerGame(playerGames),
      assists: this.setAssistsPerGame(playerGames),
      steals: this.setStealsPerGame(playerGames),
      foulsMade: this.setFoulsPerGame(playerGames)
    };

    return playerCompleteStats;
  }

  setNumberGames(playerGames: PlayerGame[]): number{
    return playerGames.length;
  }

  setPointsPerGame(playerGames: PlayerGame[]): number{
    let totalPoints = 0;

    playerGames.forEach((playerGame: PlayerGame) => {
      totalPoints += playerGame.points;
    });

    return totalPoints / playerGames.length;
  }

  setFieldPerGame(playerGames: PlayerGame[]): number{
    let totalField = 0;

    playerGames.forEach((playerGame: PlayerGame) => {
      totalField += playerGame.fieldSuccess;
    });

    return totalField / playerGames.length;
  }

  setFieldPercent(playerGames: PlayerGame[]): number{
    let fieldAttemps = 0;
    let fieldSucceed = 0;
    playerGames.forEach((playerGame: PlayerGame) => {
      if (playerGame.fieldAttemp !== undefined && playerGame.fieldSuccess !== undefined){
        fieldAttemps += playerGame.fieldAttemp;
        fieldSucceed += playerGame.fieldSuccess;
      }
    });

    return (fieldSucceed / fieldAttemps) * 100;
  }

  setFreePercent(playerGames: PlayerGame[]): number{
    let freeAttemps = 0;
    let freeSucceed = 0;
    playerGames.forEach((playerGame: PlayerGame) => {
      if (playerGame.freeAttemp !== undefined && playerGame.freeSuccess !== undefined){
        freeAttemps += playerGame.freeAttemp;
        freeSucceed += playerGame.freeSuccess;
      }
    });

    return (freeSucceed / freeAttemps) * 100;
  }

  setThreePercent(playerGames: PlayerGame[]): number{
    let threeAttemps = 0;
    let threeSucced = 0;
    playerGames.forEach((playerGame: PlayerGame) => {
      if (playerGame.threeAttemp !== undefined && playerGame.threeSuccess !== undefined){
        threeAttemps += playerGame.threeAttemp;
        threeSucced += playerGame.threeSuccess;
      }
    });

    return (threeSucced / threeAttemps) * 100;
  }

  setOReboundPerGame(playerGames: PlayerGame[]): number{
    let totalORebounds = 0;

    playerGames.forEach((playerGame: PlayerGame) => {
      totalORebounds += playerGame.offRebound;
    });

    return totalORebounds / playerGames.length;
  }

  setDReboundPerGame(playerGames: PlayerGame[]): number{
    let totalDRebounds = 0;

    playerGames.forEach((playerGame: PlayerGame) => {
      totalDRebounds += playerGame.defRebound;
    });

    return totalDRebounds / playerGames.length;
  }

  setAssistsPerGame(playerGames: PlayerGame[]): number{
    let totalAssists = 0;

    playerGames.forEach((playerGame: PlayerGame) => {
      totalAssists += playerGame.assist;
    });

    return totalAssists / playerGames.length;
  }

  setStealsPerGame(playerGames: PlayerGame[]): number{
    let totalSteals = 0;

    playerGames.forEach((playerGame: PlayerGame) => {
      totalSteals += playerGame.steals;
    });

    return totalSteals / playerGames.length;
  }

  setFoulsPerGame(playerGames: PlayerGame[]): number{
    let totalFouls = 0;

    playerGames.forEach((playerGame: PlayerGame) => {
      totalFouls += playerGame.foulsMade;
    });

    return totalFouls / playerGames.length;
  }

}
