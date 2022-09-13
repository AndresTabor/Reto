
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { LobbyService } from 'src/app/services/lobby.service';
import { PlayerLobby } from 'src/app/models/playerLobby';
import { Lobby } from 'src/app/models/lobby.model';
import { PlayerService } from 'src/app/services/player.service';
import { BoardService } from 'src/app/services/board.service';
import { ConnectService } from 'src/app/services/connect.service';


@Component({
  selector: 'app-create-board',
  templateUrl: './create-board.component.html',
  styleUrls: ['./create-board.component.css']
})
export class CreateBoardComponent implements OnInit, OnDestroy{

  
  usersInLobby = new Array<PlayerLobby>;
  readyToPlay = false;
  lobby!: Lobby;
  showSide:boolean = false;
  eventos = new Array<any>; 
  eventsLoads: number = 0;

  constructor(
    private router: Router,
    private lobbyService: LobbyService,
    private playerService: PlayerService,
    private boardService: BoardService,
    private webSocket : ConnectService,
    
  ) {
    
  }
  

  ngOnInit(): void {
    const idLobby = this.router.url.split('/').pop()!;
    this.lobbyService.getLobby().subscribe(lobby => {               
        localStorage.setItem('lobbies', JSON.stringify(lobby));
        const dataStorage = JSON.parse(localStorage.getItem('lobbies')|| "");
        this.lobby = dataStorage.filter((lobby: { id: string; }) => lobby.id == idLobby).pop();
        this.usersInLobby = this.lobby.players;      
      }
    );
    this.webSocket.connect(idLobby).subscribe({
      next:(message:any)=> {   
        console.log(message); 
        message.type === "cardgame.jugadoragregado" ?  this.eventsLoads += 1 : console.log(""); 
        if(this.eventsLoads == (this.usersInLobby.length)){
          console.log("jugadores Cargados", this.usersInLobby.length , this.eventsLoads);       
          this.boardService.startGame({"juegoId": this.lobby.id}).subscribe(event => 
            console.log(event)
            )
            this.router.navigate([`/board/${this.lobby.id}`]) 
        }         
      },
      error:(error:any)=> console.log(error),
      complete: ()=> console.log("complete")
      
    });                
                      
  }

  ngOnDestroy(): void {
    this.webSocket.closeConnection();
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

  showSideMenu(){
    this.showSide = true;
  }

  crateBoard(){
    console.log("creo Juego");
    let players = {}
    this.usersInLobby.map(p => {
        const obj = {
                  [p.id] : p.nickName
                }
        players = {
          ...players,
          ...obj
        }        
      }  	   	
    )
    const data = {
      "juegoId": this.lobby.id,
      "jugadores": {        
        ...players
      },
      "jugadorPrincipalId": this.lobby.host
    }
    
    this.boardService.createGame(data).subscribe(s=>
      console.log(s)    
    ); 
  }

}
