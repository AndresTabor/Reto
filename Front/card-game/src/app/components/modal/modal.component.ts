import { getAuth } from '@angular/fire/auth';
import { Round } from 'src/app/models/round.mode';
import { PlayerService } from 'src/app/services/player.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() prop: any[] = new Array<any>;
  player : Array<string> = new Array<string>();

  constructor(private playerService: PlayerService) { }

  ngOnInit(): void {
    this.player = this.prop.filter(id => id !== getAuth().currentUser?.uid);
  }

  close(){
    this.playerService.showModal.emit(false);
  }
}
