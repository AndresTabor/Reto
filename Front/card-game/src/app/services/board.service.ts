import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  @Output() gameStarted : EventEmitter<boolean> = new EventEmitter();
  
  constructor(private store : Firestore, private http: HttpClient) { }

  createGame(body:any) : Observable<any>{
    return this.http.post("http://localhost:8080/juego/crear", body) as Observable<any[]>;        
  }

  startGame(body:any) : Observable<any>{
    return this.http.post("http://localhost:8080/juego/start", body) as Observable<any[]>;
  }

  getBoard(id:any) : Observable<any>{
    return this.http.get(`http://localhost:8080/juego/${id}`) as Observable<any[]>;        
  }

  getDeckPLayer(idPlayer:any, idGame:any) : Observable<any>{
    return this.http.get(`http://localhost:8080/juego/mazo/${idPlayer}/${idGame}`) as Observable<any[]>;        
  }

  startRound(body:any) : Observable<any>{
    return this.http.post("http://localhost:8080/juego/ronda/start", body) as Observable<any[]>;
  }

  
}

