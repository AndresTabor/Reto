import { PlayerLobby } from 'src/app/models/playerLobby';
import { addDoc } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Auth, User, getAuth } from "@angular/fire/auth";
import { HttpClient } from '@angular/common/http';
import { Lobby } from '../models/lobby.model';

@Injectable({
    providedIn: 'root',
})

export class LobbyService {

    constructor(private auth: Auth, private store : Firestore){}

    createLobby(){
        const currentUser = getAuth().currentUser;
        const nickName = currentUser?.displayName; 
        const idUser = currentUser?.uid;
        const photo = currentUser?.photoURL;

        const creator = {
            id: idUser,
            nickName: nickName,
            photoUrl: photo
        } as PlayerLobby 

        const players = new Array<PlayerLobby>;
        players.push(creator);     
        const lobbiesRef = collection(this.store, 'lobbies');
        const cifra1 = Math.floor(Math.random() *10);
        const cifra2 = Math.floor(Math.random() *10);
        const nameRoom = `Room ${cifra1}${cifra2}`
        return addDoc(lobbiesRef, {name : nameRoom, players: players, host:idUser});
    }

    getLobby() : Observable<Lobby[]>{
        const lobbiesRef = collection(this.store, 'lobbies');                      
        return collectionData(lobbiesRef,{ idField: 'id' }) as Observable<Lobby[]>;
    }

    
    
}