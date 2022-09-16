import { BoardService } from './../../services/board.service';
import { Component, OnInit } from '@angular/core';
import { ConnectService } from 'src/app/services/connect.service';
import { Router } from '@angular/router';
import { getAuth } from '@angular/fire/auth';
import { Player } from 'src/app/models/player.model';
import { Round } from 'src/app/models/round.mode';
import { Board } from 'src/app/models/board.model';
import { PlayerService } from 'src/app/services/player.service';
import { CardBoard } from 'src/app/models/cardsBoards.model';
import { Winner } from 'src/app/models/winner.model';



@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})

export class BoardComponent implements OnInit {
  juegoId!: string;
  board:Board | undefined;
  events = new Array<any>;
  player : Player  = {
    id: '',
    nickname: '',
    deck: []
  } ; 
  activePlayers!: number;
  currentRound!: Round;
  timer!:number;
  boardDeck:Array<CardBoard> = new Array<CardBoard>;
  winner!: Winner;
  isHosting: boolean = false;
  jugadorSeleccionado: string = "";
  showModal:boolean = false;

  constructor(
    private boardService: BoardService,private webSocket : ConnectService,
    private router: Router,
    private playerService: PlayerService
  ) { 
    this.juegoId = this.router.url.split('/').pop()!;    
    this.timer = 60;
    localStorage.getItem('host') == getAuth().currentUser?.uid ? this.isHosting = true : false;
  }

  ngOnInit(): void {
    console.log("board montado");
    this.getBoard();
    this.webSocket.connect(this.juegoId).subscribe({
      next:(message:any)=> {          
        console.log(message);         
        message.type == "cardgame.rondainiciada" ? this.board!.isEnabled = true : console.log("");     
        message.type == "cardgame.tiempocambiadodeltablero" ? this.timer = message.tiempo :this.getBoard();
        message.type == "cardgame.rondafinalizada" ? this.board!.isEnabled = false : console.log("");  
        message.type == "cardgame.rondafinalizada" ? console.log(this.boardDeck) : console.log("");        
        message.type == "cardgame.rondacreada" ? this.timer = message.tiempo :console.log("");
        if (message.type === 'cardgame.tiempocambiadodeltablero') {
          this.timer = message.tiempo
          if (message.tiempo == 1 && this.currentRound.round >= 3 && this.jugadorSeleccionado == this.player.id) {
            this.showModal = true;
          }
        }
        if (message.type === 'cardgame.JugadorSeleccionado') {
          this.jugadorSeleccionado = message.jugadorId;
        }
      },
      error:(error:any)=> console.log(error),
      complete: ()=> console.log("complete")
    });  
    this.playerService.showModal.subscribe(event => this.showModal = event.valueOf());
  }

  
  startGame(){   
    this.boardService.startRound({"juegoId": this.juegoId}).subscribe(event => 
      console.log(event)
    );
  }
    
  getBoard(){
    this.boardService.getBoard(this.juegoId).subscribe(event =>{
      let cards = new Map<string, Set<CardBoard>>; 
      this.boardDeck = Object.keys(event.tablero.cartas).flatMap(key =>{
        const value = event.tablero.cartas[key];
        cards.set(key, value);    
        return value;      
      });
      const board = {
        cardsDeck: cards,
        isEnabled: event.tablero.habilitado,
        time: event.tiempo
      }  as Board;
      
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

  putCardInBoard(idCard:string){
    const body = {
      "jugadorId": this.player.id,
      "cartaId": idCard,
      "juegoId": this.juegoId      
    }
    this.playerService.putCard(body).subscribe(card =>{ console.log(card); });
    
  }
}
  