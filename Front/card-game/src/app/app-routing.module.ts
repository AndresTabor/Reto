import { LobbyComponent } from './pages/lobby/lobby.component';
import { LoginComponent } from './pages/login/login.component';


import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';


const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: '',
    component: LoginComponent
  }
  ,
  {
    path: 'lobby',
    component: LobbyComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
