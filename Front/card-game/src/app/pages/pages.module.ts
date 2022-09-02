import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ComponentsModule } from '../components/components.module';
import { LobbyComponent } from './lobby/lobby.component';
import { BoardComponent } from './board/board.component';



@NgModule({
  declarations: [
    LoginComponent,
    HomeComponent,
    LobbyComponent,
    BoardComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule
  ],
  exports:[
    LoginComponent,
    HomeComponent,
    LobbyComponent,
    BoardComponent
  ]
})
export class PagesModule { }
