import { CreateBoardComponent } from './pages/create-board/create-board.component';
import { BoardComponent } from './pages/board/board.component';
import { LobbiesComponent } from './pages/lobbies/lobbies.component';
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
    path: 'lobbies',
    component: LobbiesComponent,
    ...canActivate(() => redirectUnauthorizedTo(['/']))
  },
  {
    path: 'board/:id',
    component: BoardComponent,
    ...canActivate(() => redirectUnauthorizedTo(['/']))
  },
  {
    path: 'create-game/:id',
    component: CreateBoardComponent,
    ...canActivate(() => redirectUnauthorizedTo(['/']))
  }
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {  
}
