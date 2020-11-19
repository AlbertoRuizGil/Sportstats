import { NgModule } from '@angular/core';
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { RouterModule, Routes } from '@angular/router';

import { CreateTeamComponent } from './create-team/create-team.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SelectedTeamComponent } from './selected-team/selected-team.component';
import { UserTeamsComponent } from './user-teams/user-teams.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToItems = () => redirectLoggedInTo(['userTeams']);

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    ...canActivate(redirectLoggedInToItems),
  },
  {
    path: 'login',
    component: LoginComponent,
    ...canActivate(redirectLoggedInToItems),
  },
  {
    path: 'register',
    component: RegisterComponent,
    ...canActivate(redirectLoggedInToItems),
  },
  {
    path: 'userTeams',
    component: UserTeamsComponent,
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'createTeam',
    component: CreateTeamComponent,
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'team/:teamId',
    component: SelectedTeamComponent,
    ...canActivate(redirectUnauthorizedToLogin),
  },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
