import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { LobbiesComponent } from './lobbies/lobbies.component';
import { BoardComponent } from './board/board.component';
import { CreateBoardComponent } from './create-board/create-board.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    LoginComponent,
    HomeComponent,
    LobbiesComponent,
    BoardComponent,
    CreateBoardComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports:[
    LoginComponent,
    HomeComponent,
    LobbiesComponent,
    BoardComponent,
    CreateBoardComponent
  ]
})
export class PagesModule { }
