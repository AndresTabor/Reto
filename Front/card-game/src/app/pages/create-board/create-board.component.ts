import { Player } from './../../models/player.model';
import { Component, OnInit } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { LobbyService } from 'src/app/services/lobby.service';
import { UserService } from 'src/app/services/user.service';
import { PlayerLobby } from 'src/app/models/playerLobby';


@Component({
  selector: 'app-create-board',
  templateUrl: './create-board.component.html',
  styleUrls: ['./create-board.component.css']
})
export class CreateBoardComponent implements OnInit{

  usersInLobby = new Array<PlayerLobby>;
  usersOnline!: Array<User>;
  form!: FormGroup;
  lobby: any;
  
  constructor(
    private userService: UserService, 
    private router: Router,
    private lobbyService: LobbyService
    
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    const currentUserId = getAuth().currentUser?.uid ; 
    const idLobby =  this.router.url.split('/').pop()!;
    this.lobbyService.getLobby().subscribe(      
      lobby => {
        console.log(lobby);        
        localStorage.setItem('lobbies', JSON.stringify(lobby));
        const dataStorage = JSON.parse(localStorage.getItem('lobbies')|| "");
        this.lobby = dataStorage.filter((lobby: { id: string; }) => lobby.id == idLobby).pop();
        this.usersInLobby = this.lobby.players;
        //this.lobby.players.map((player: PlayerLobby) => this.usersInLobby.push(player));  
      })                   
  }

  public createBoard(event : Event): void {
    event.preventDefault();
    if (this.form.valid) {
      const playersSelected = this.form.getRawValue();     
      console.log(this.form);
    }
  }

  private buildForm() {
    this.form = new FormGroup({
      player: new FormControl('', [Validators.required])
    })

    /*this.form.valueChanges
      .subscribe(value => {
      console.log(value);
    });*/
  }

}
