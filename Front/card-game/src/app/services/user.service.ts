import { Observable } from 'rxjs';
import { EventEmitter, Injectable, Output } from "@angular/core";
import { Firestore, collection, collectionData, doc, deleteDoc, setDoc } from '@angular/fire/firestore';
import { Auth, signOut, GoogleAuthProvider, signInWithPopup, User  } from "@angular/fire/auth";

@Injectable({
    providedIn: 'root',
})

export class UserService {
    @Output() userLoged : EventEmitter<Boolean> = new EventEmitter();

    constructor(private auth: Auth, private store : Firestore){}

    //Auth methods
    logout(){
        return signOut(this.auth);
    }

    loginWithGoogle(){
        return signInWithPopup(this.auth, new GoogleAuthProvider());
    }

    //Players methods
    addUser(user : User, stateOn : boolean){
        const newUser = {
            id: user.uid,
            name: user.displayName,
            email: user.email,
            photoUrl: user.photoURL,
            isOnline: stateOn,
        } 
        const usersRef = collection(this.store, 'users');
        const refUser = doc(usersRef, user.uid);
        return setDoc(refUser, newUser)
    }

    getUsers(): Observable<User[]>{
        const usersRef = collection(this.store, 'users');                
        return collectionData(usersRef,{ idField: 'id' }) as Observable<User[]>;
    }

    deleteUser(user : User){
        const userRef = doc(this.store, `users/${user.uid}`);
        return deleteDoc(userRef);
    }

    
}