import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class ConnectService {

  private socket!: WebSocketSubject<unknown>;

  constructor(
    
  ) { }

  connect(gameId: string){
    this.socket = webSocket(`ws://localhost:8081/retrieve/${gameId}`);
    return this.socket;
  }

  closeConnection(){
    this.socket.unsubscribe();
  }
}
