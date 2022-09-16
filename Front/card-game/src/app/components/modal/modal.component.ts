import { BoardService } from './../../services/board.service';
import { getAuth } from '@angular/fire/auth';
import { PlayerService } from 'src/app/services/player.service';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() prop: any[] = new Array<any>;
  player : Array<string> = new Array<string>();
  weakened: Array<string> = new Array<string>();

  constructor(
    private playerService: PlayerService, 
    private boardService : BoardService,
    private router : Router
    ) { }

  ngOnInit(): void {
    this.player = this.prop.filter(id => id !== getAuth().currentUser?.uid);
  }

  selectPlayer(player: string): void {
    this.weakened.push(player);
  }

  close(){
    if (this.weakened.length >= 1 && this.weakened.length <= 2) {
      const body = {
        "juegoId": this.router.url.split('/').pop()!,
        "jugadoresSeleccionados": this.weakened,
        "jugadorPotenciado": getAuth().currentUser?.uid
      }
      this.boardService.finishRound(body).subscribe(event => console.log(event));      
      this.playerService.showModal.emit(false);
    }else{
      alert("selecciona algun jugador");
    }
    
  }
}
