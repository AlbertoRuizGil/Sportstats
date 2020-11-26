import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Game } from '../shared/inteface/team.interface';
import { AuthService } from '../shared/services/auth.service';
import { TeamService } from '../shared/services/team.service';

@Component({
  selector: 'app-fill-game',
  templateUrl: './fill-game.component.html',
  styleUrls: ['./fill-game.component.scss']
})
export class FillGameComponent implements OnInit {

  teamId: string;

  form: FormGroup;
  games: Game[];

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private teamService: TeamService
  ) { }

  ngOnInit(): void {


    this.teamId = this.route.snapshot.paramMap.get('teamId');
    this.authService.currentUser$.subscribe((user: firebase.User) => {
      if (user) {
        this.teamService.getGames(user.uid, this.teamId)
        .valueChanges({idField: 'matchId'})
        .subscribe((gamesReturned: Game[]) => {
          this.games = gamesReturned;
        });
      }
    });

  }

  buildSelectForm(){
    this.form = new FormGroup({
      match: new FormControl('', Validators.required)
    });
  }

  onChangeSelect(){
    console.log('Select');
  }

}
