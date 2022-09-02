import { Injectable } from "@angular/core";
import { Auth, signOut, GoogleAuthProvider, signInWithPopup  } from "@angular/fire/auth";

@Injectable({
    providedIn: 'root',
})

export class UserService{

    constructor(private auth: Auth){}

    logout(){
        return signOut(this.auth);
    }

    loginWithGoogle(){
        return signInWithPopup(this.auth, new GoogleAuthProvider());
    }
}