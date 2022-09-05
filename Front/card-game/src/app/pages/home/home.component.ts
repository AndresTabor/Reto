import { LobbyService } from 'src/app/services/lobby.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private lobbyService: LobbyService, private router: Router) { }

  ngOnInit(): void {
  }

  createLobby(){
    this.lobbyService.createLobby()
    .then( response => {
      console.log(response); 
      this.router.navigate([`/create-game/${response.id}`]);     
    })
    .catch( error => console.log(error) );    
  }

}
