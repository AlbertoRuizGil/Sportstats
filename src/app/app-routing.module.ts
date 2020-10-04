import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent} from './pages/register/register.component';
import { UserTeamsComponent } from './pages/user-teams/user-teams.component';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { CreateTeamComponent } from './pages/create-team/create-team.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'userTeams/:userId', component: UserTeamsComponent, canActivate: [ AngularFireAuthGuard ]},
  { path: 'createTeam/:userId', component: CreateTeamComponent, canActivate: [ AngularFireAuthGuard ]},
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
