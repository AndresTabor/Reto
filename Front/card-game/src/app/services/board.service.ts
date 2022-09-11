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


  getMasterCards(){
    return fetch("https://gateway.marvel.com/v1/public/characters?ts=1&apikey=cad05fd2cf7430cb2747ae76d7d4f0fd&hash=8149ce6956bb034daa7fa41c9d506289&limit=100")        
  }


  createGame(body:any) : Observable<any>{
    return this.http.post("http://localhost:8080/juego/crear", body) as Observable<any[]>;        
  }

  startGame(body:any) : Observable<any>{
    return this.http.post("http://localhost:8080/juego/start", body) as Observable<any[]>;
  }

  startRound(body:any) : Observable<any>{
    return this.http.post("http://localhost:8080/juego/ronda/start", body) as Observable<any[]>;
  }
}

