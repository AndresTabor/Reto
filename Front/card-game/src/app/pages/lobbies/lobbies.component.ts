import { Lobby } from './../../models/lobby.model';
import { LobbyService } from 'src/app/services/lobby.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerService } from 'src/app/services/player.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-lobbies',
  templateUrl: './lobbies.component.html',
  styleUrls: ['./lobbies.component.css']
})
export class LobbiesComponent implements OnInit {

  lobbiesList: Array<Lobby> = new Array<Lobby>();
  form!: FormGroup;
  showSide: boolean = false;

  constructor(
    private router: Router,
    private lobbyService: LobbyService,
    private playerService: PlayerService
  ) { this.buildForm(); }

  ngOnInit(): void {
    this.lobbyService.getLobby().subscribe(      
      lobby => {             
        localStorage.setItem('lobbies', JSON.stringify(lobby));
        const dataStorage = JSON.parse(localStorage.getItem('lobbies')|| "");
        this.lobbiesList = dataStorage;      
      })
  }

  joinLobby(event: Event){
    event.preventDefault();
    if (this.form.valid) {
      const lobbyId = this.form.getRawValue().lobby;    
      this.goTolobby(lobbyId);
    }
  }

  private buildForm() {
    this.form = new FormGroup({
      lobby: new FormControl('', [Validators.required])
    })

    /*this.form.valueChanges
      .subscribe(value => {
      console.log(value);
    });*/
  }

  goTolobby(idLobby: string, ){
    this.router.navigate([`create-game/${idLobby}`]);
    const lobbyToJoin = this.lobbiesList.filter(lobby => lobby.id === idLobby).pop()!;
    this.playerService.joinTolobby(idLobby,lobbyToJoin);
  }
}
