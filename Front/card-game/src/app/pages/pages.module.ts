import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ComponentsModule } from '../components/components.module';
import { LobbyComponent } from './lobby/lobby.component';



@NgModule({
  declarations: [
    LoginComponent,
    HomeComponent,
    LobbyComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule
  ],
  exports:[
    LoginComponent,
    HomeComponent,
    LobbyComponent,
  ]
})
export class PagesModule { }
