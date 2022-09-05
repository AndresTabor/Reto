
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { LobbyService } from 'src/app/services/lobby.service';
import { PlayerLobby } from 'src/app/models/playerLobby';
import { Lobby } from 'src/app/models/lobby.model';
import { PlayerService } from 'src/app/services/player.service';


@Component({
  selector: 'app-create-board',
  templateUrl: './create-board.component.html',
  styleUrls: ['./create-board.component.css']
})
export class CreateBoardComponent implements OnInit{

  usersInLobby = new Array<PlayerLobby>;
  usersOnline!: Array<User>;
  form!: FormGroup;
  lobby!: Lobby;
  
  constructor(
    private router: Router,
    private lobbyService: LobbyService,
    private playerService: PlayerService
    
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    const idLobby = this.router.url.split('/').pop()!;
    this.lobbyService.getLobby().subscribe(      
      lobby => {               
        localStorage.setItem('lobbies', JSON.stringify(lobby));
        const dataStorage = JSON.parse(localStorage.getItem('lobbies')|| "");
        this.lobby = dataStorage.filter((lobby: { id: string; }) => lobby.id == idLobby).pop();
        this.usersInLobby = this.lobby.players; 
        console.log(this.usersInLobby);       
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

  leaveLobby(){
    this.playerService.leaveTolobby(this.lobby)
    .then((response) => { 
      this.router.navigate(['/lobbies']);
    })
    .catch((error) =>  console.log(error));    
  }

  inviteThisLoby(){
    const content = this.lobby.id;
    navigator.clipboard.writeText(content)
      .then(() => {
      alert("id del lobby copiado");
    })
      .catch(err => {
      console.log('Something went wrong', err);
    })
  }

}
