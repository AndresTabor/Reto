import { LobbyService } from 'src/app/services/lobby.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lobbies',
  templateUrl: './lobbies.component.html',
  styleUrls: ['./lobbies.component.css']
})
export class LobbiesComponent implements OnInit {

  constructor(
    private router: Router,
    private lobbyService: LobbyService
  ) { }

  ngOnInit(): void {
    
  }

}
