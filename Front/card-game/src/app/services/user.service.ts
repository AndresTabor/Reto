import { EventEmitter, Injectable, OnInit, Output } from "@angular/core";
import { Auth, signOut, GoogleAuthProvider, signInWithPopup, getAuth, onAuthStateChanged, user  } from "@angular/fire/auth";

@Injectable({
    providedIn: 'root',
})

export class UserService implements OnInit{
    @Output() userLoged : EventEmitter<Boolean> = new EventEmitter();

    constructor(private auth: Auth){}

    ngOnInit(): void {
        
        /*if (user?.uid) {
            this.userLoged.emit(true);
        }*/
        
    }

    logout(){
        return signOut(this.auth);
    }

    loginWithGoogle(){
        return signInWithPopup(this.auth, new GoogleAuthProvider());
    }
}