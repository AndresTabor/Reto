import { getAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { collection, doc, Firestore, setDoc } from '@angular/fire/firestore';
import { PlayerLobby } from '../models/playerLobby';
import { LobbyService } from './lobby.service';
import { Lobby } from '../models/lobby.model';

@Injectable({
  providedIn: 'root'
})

export class PlayerService {

  constructor(private store : Firestore, private lobbyService : LobbyService) { }

  joinTolobby(idLobby : string, lobby : Lobby){
    const lobbiesRef = collection(this.store, 'lobbies'); 
    const currentUser = getAuth().currentUser;
    const player = {
      id: currentUser?.uid,
      nickName: currentUser?.displayName,
      photoUrl: currentUser?.photoURL
    } as PlayerLobby;

    !lobby.players.find(p => p.id === currentUser?.uid)? lobby.players.push(player)
    : false
       
    const refLobby = doc(lobbiesRef, idLobby);
    return setDoc(refLobby, lobby)
  }

  leaveTolobby(lobby : Lobby){
    const lobbiesRef = collection(this.store, 'lobbies');
    const refLobby = doc(lobbiesRef, lobby.id); 
    const currentUserId = getAuth().currentUser?.uid;
    const playersUpdated = lobby.players.filter(p => p.id !== currentUserId);
    lobby.players = playersUpdated;
    return setDoc(refLobby, lobby)
  }
}
