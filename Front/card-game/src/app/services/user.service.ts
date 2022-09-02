import { EventEmitter, Injectable, Output } from "@angular/core";
import { Auth, signOut, GoogleAuthProvider, signInWithPopup  } from "@angular/fire/auth";

@Injectable({
    providedIn: 'root',
})

export class UserService{
    @Output() userLoged : EventEmitter<Boolean> = new EventEmitter();

    constructor(private auth: Auth){}

    logout(){
        return signOut(this.auth);
    }

    loginWithGoogle(){
        return signInWithPopup(this.auth, new GoogleAuthProvider());
    }
}