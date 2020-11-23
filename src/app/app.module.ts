import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateTeamComponent } from './create-team/create-team.component';
import { InfoLeagueComponent } from './create-team/info-league/info-league.component';
import { InfoPlayerComponent } from './create-team/info-players/info-player/info-player.component';
import { InfoPlayersComponent } from './create-team/info-players/info-players.component';
import { InfoTeamComponent } from './create-team/info-team/info-team.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SelectedTeamComponent } from './selected-team/selected-team.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { UserTeamsComponent } from './user-teams/user-teams.component';
import { InfoGamesComponent } from './create-team/info-games/info-games.component';
import { TableInfoTeamComponent } from './selected-team/table-info-team/table-info-team.component';
import { InfoGameComponent } from './create-team/info-games/info-game/info-game.component';
import { SelectedPlayerComponent } from './selected-player/selected-player.component';
import { FillGameComponent } from './fill-game/fill-game.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    UserTeamsComponent,
    CreateTeamComponent,
    NavbarComponent,
    FooterComponent,
    SelectedTeamComponent,
    InfoTeamComponent,
    InfoPlayersComponent,
    InfoPlayerComponent,
    InfoLeagueComponent,
    InfoGamesComponent,
    TableInfoTeamComponent,
    InfoGameComponent,
    SelectedPlayerComponent,
    FillGameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
