import { LobbyService } from 'src/app/services/lobby.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Lobby } from 'src/app/models/lobby.model';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-lobbies',
  templateUrl: './lobbies.component.html',
  styleUrls: ['./lobbies.component.css']
})
export class LobbiesComponent implements OnInit {

  lobbiesList: Array<Lobby> = new Array<Lobby>();

  constructor(
    private router: Router,
    private lobbyService: LobbyService,
    private playerService: PlayerService
  ) { }

  ngOnInit(): void {
    this.lobbyService.getLobby().subscribe(      
      lobby => {             
        localStorage.setItem('lobbies', JSON.stringify(lobby));
        const dataStorage = JSON.parse(localStorage.getItem('lobbies')|| "");
        this.lobbiesList = dataStorage;      
      })
  }

  goTolobby(idLobby: string, ){
    this.router.navigate([`create-game/${idLobby}`]);
    const lobbyToJoin = this.lobbiesList.filter(lobby => lobby.id === idLobby).pop()!;
    this.playerService.joinTolobby(idLobby,lobbyToJoin);
  }
}
