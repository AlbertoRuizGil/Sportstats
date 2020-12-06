import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Player, PlayerGame } from '../shared/inteface/player.interface';
import { League } from '../shared/inteface/team.interface';
import { AuthService } from '../shared/services/auth.service';
import { PlayerService } from '../shared/services/player.service';
import { TeamService } from '../shared/services/team.service';

@Component({
  selector: 'app-selected-player',
  templateUrl: './selected-player.component.html',
  styleUrls: ['./selected-player.component.scss']
})
export class SelectedPlayerComponent implements OnInit {

  teamId: string;

  playerId: string;
  player: Player;

  playerGames: PlayerGame[] = [];
  league: League;

  constructor(
    private teamService: TeamService,
    private playerService: PlayerService,
    private authService: AuthService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.teamId = this.route.snapshot.paramMap.get('teamId');
    this.playerId = this.route.snapshot.paramMap.get('playerId');
    this.authService.currentUser$.subscribe((user: firebase.User) => {
      if (user) {
        this.playerService
        .getPlayerInfo(user.uid, this.teamId, this.playerId)
        .valueChanges()
        .subscribe((playerInfo) => {
          this.player = playerInfo;
        });
        this.playerService
        .getPlayerGames(user.uid, this.teamId, this.playerId)
        .valueChanges()
        .subscribe((games: PlayerGame[]) => {
          games.forEach( (game: PlayerGame) => {
            this.playerGames = [...this.playerGames, game];
          });
        });

        this.teamService
        .getTeamLeague(user.uid, this.teamId)
        .valueChanges()
        .subscribe((leagues: League[]) => {
          this.league = leagues[0];
        });
      }
    });
  }

}
