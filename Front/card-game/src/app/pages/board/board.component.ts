import { BoardService } from './../../services/board.service';
import { Component, OnInit } from '@angular/core';
import { Card } from 'src/app/models/card.model';
import { ConnectService } from 'src/app/services/connect.service';
import { Router } from '@angular/router';
import { getAuth } from '@angular/fire/auth';
import { Player } from 'src/app/models/player.model';
import { Round } from 'src/app/models/round.mode';
import { Board } from 'src/app/models/board.model';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})

export class BoardComponent implements OnInit {
  juegoId: string;
  board!:Board;
  events = new Array<any>;
  player! : Player; 
  activePlayers!: number;
  currentRound!: Round;
  timer:number;

  constructor(
    private boardService: BoardService,private webSocket : ConnectService,
    private router: Router
  ) { 
    this.juegoId = this.router.url.split('/').pop()!;    
    this.timer = 60;
  }

  ngOnInit(): void {
    this.getBoard();
    this.webSocket.connect(this.juegoId).subscribe({
      next:(message:any)=> {  
        console.log(message);      
        message.type == "cardgame.tiempocambiadodeltablero" ? this.timer = message.tiempo :console.log("");
      },
      error:(error:any)=> console.log(error),
      complete: ()=> console.log("complete")
    });    
  }

  
  startGame(){       
    this.boardService.startRound({"juegoId": this.juegoId}).subscribe(event => 
      console.log(event)
      );
  }
    
  getBoard(){
    this.boardService.getBoard(this.juegoId).subscribe(event =>{      
      const board = {
        cardsDeck: event.cartas,
        isEnabled: event.habilitado,
        time: event.tiempo
      } as Board;
      this.board = board;
      this.getRound(event.ronda);
      this.getPlayerData();        
    });           
  }
    
  getRound(rondaEvent:any){
    const round = {
      round: rondaEvent.numero,
      isStarted: rondaEvent.estaIniciada,
      playersInRound: rondaEvent.jugadores,
    } as Round;
    this.currentRound = round;
    this.activePlayers = this.currentRound.playersInRound.length;
  }
    
  getPlayerData() {
    const idPlayer = getAuth().currentUser?.uid;
    const nickName = getAuth().currentUser?.displayName;
    
    this.boardService.getDeckPLayer(idPlayer,this.juegoId).subscribe(deck =>{              
      const player = {
        id: idPlayer,
        nickname: nickName,
        deck: deck.cartas
      } as Player;       
      this.player = player;      
      
    });       
  }
}
  