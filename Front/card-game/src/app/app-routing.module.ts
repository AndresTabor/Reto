import { BoardComponent } from './pages/board/board.component';
import { LobbyComponent } from './pages/lobby/lobby.component';
import { LoginComponent } from './pages/login/login.component';


import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    ...canActivate(() => redirectUnauthorizedTo(['/']))
  },
  {
    path: '',
    component: LoginComponent ,
    ...canActivate(() => redirectLoggedInTo(['/home']))
  },
  {
    path: 'lobby',
    component: LobbyComponent,
    ...canActivate(() => redirectUnauthorizedTo(['/']))
  },
  {
    path: 'board',
    component: BoardComponent,
    ...canActivate(() => redirectUnauthorizedTo(['/']))
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {  
}
