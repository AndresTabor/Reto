import { Component, OnInit } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-create-board',
  templateUrl: './create-board.component.html',
  styleUrls: ['./create-board.component.css']
})
export class CreateBoardComponent implements OnInit{

  //frmJugadores: FormGroup;
  usersOnline!: Array<User>;
  form!: FormGroup;
  
  constructor(private userService: UserService, private router: Router) {
    this.buildForm();
      
  }

  ngOnInit(): void {
    const currentUserId = getAuth().currentUser?.uid ;  
    //const dataStorage = JSON.parse(localStorage.getItem('users')|| "");
    //this.usersOnline = dataStorage.filter((user: { state: boolean; }) => user.state === true);
    this.userService.getUsers().subscribe(
      users =>  {
        localStorage.setItem('users', JSON.stringify(users));
        const dataStorage = JSON.parse(localStorage.getItem('users')|| "");              
        this.usersOnline = dataStorage.filter((user: { isOnline: boolean; }) => user.isOnline === true);
        this.usersOnline = this.usersOnline.filter(user => user.id !== currentUserId);
      }
    );
  }

  public createBoard(event : Event): void {
    event.preventDefault();
    if (this.form.valid) {
      const playersSelected = this.form.getRawValue();     
      console.log(this.form);
    }
    //gamers.jugadores.push(this.currentUser?.uid);
    //console.log("Submit", gamers);
    console.log("submit");
    //this.router.navigate(['/board']);
  }

  private buildForm() {
    this.form = new FormGroup({
      player: new FormControl('', [Validators.required])
    })

    /*this.form.valueChanges
      .subscribe(value => {
      console.log(value);
    });*/
  }

}
