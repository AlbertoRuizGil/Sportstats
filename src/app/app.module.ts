import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/*FIREBASE*/
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';

/*Modulos*/
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { HomeComponent } from './pages/home/home.component';
import { TeamsService } from './services/teams.service';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { UserTeamsComponent } from './pages/user-teams/user-teams.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    UserTeamsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [TeamsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
