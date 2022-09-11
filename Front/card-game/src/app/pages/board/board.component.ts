import { BoardService } from './../../services/board.service';
import { Component, OnInit } from '@angular/core';
import { Card } from 'src/app/models/card.model';
import { ConnectService } from 'src/app/services/connect.service';
import { Router } from '@angular/router';
import { getAuth } from '@angular/fire/auth';
import { Player } from 'src/app/models/player.model';
import { Round } from 'src/app/models/round.mode';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  juegoId: string;
  events = new Array<any>;
  deck = new Array<any>();
  player : Player; 
  activePlayers!: number;
  roundEvent!: any;
  currentRound!: any;
  timer:number;

  constructor(
    private boardService: BoardService,private webSocket : ConnectService,
    private router: Router
  ) { 
    this.events = JSON.parse(localStorage.getItem('events')!);
    this.player =  this.getPlayerData();
    this.juegoId = this.router.url.split('/').pop()!;
    this.timer = 60;
  }

  ngOnInit(): void {
    this.webSocket.connect(this.juegoId).subscribe({
      next:(message:any)=> {  
        console.log(message);      
        message.type == "cardgame.rondacreada" ? this.getRound(message) :console.log("");
        message.type == "cardgame.tiempocambiadodeltablero" ? this.timer = message.tiempo :console.log("");
      },
      error:(error:any)=> console.log(error),
      complete: ()=> console.log("complete")
    });
    this.activePlayers = this.events.filter(event => event.type == "cardgame.jugadoragregado").length;        
  }

  getPlayerData (): Player {
    const idPlayer = getAuth().currentUser?.uid;
    const event = this.events.filter(event => event.type == "cardgame.jugadoragregado");
    const playerEvent = event.find(e => e.identity.uuid == idPlayer);
    
     const player = {
      id: playerEvent.identity.uuid,
      nickname: playerEvent.alias,
      deck: playerEvent.mazo.catas
    } as Player;
    
    this.deck = player.deck        
    return player;
  }

  startGame(){
    console.log("start game");    
    this.boardService.startGame({"juegoId": this.juegoId}).subscribe(event => 
      console.log(event)
    );
    this.boardService.startRound({"juegoId": this.juegoId}).subscribe(event => 
      console.log(event)
    );
  }

  getRound(eventRound:any){
    const round = {
      round: eventRound.ronda.numero,
      time: eventRound.tiempo,
      isStarted: eventRound.ronda.estaIniciada,
      playersInRound: eventRound.ronda.jugadores,
    } as Round;
    this.currentRound = round;
  }
}
