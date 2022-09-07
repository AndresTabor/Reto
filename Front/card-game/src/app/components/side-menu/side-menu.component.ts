import { Component, OnInit } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { FormGroup } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {

  close:boolean = true;
  usersOnline!: Array<User>;
  form!: FormGroup;
  
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    const currentUserId = getAuth().currentUser?.uid ;
    this.userService.getUsers().subscribe(
      users =>  {
        localStorage.setItem('users', JSON.stringify(users));
        const dataStorage = JSON.parse(localStorage.getItem('users')|| "");            
        this.usersOnline = dataStorage.filter((user: { isOnline: boolean; }) => user.isOnline === true);
        this.usersOnline = this.usersOnline.filter(user => user.id !== currentUserId);
      }
    );
  }

  closeSideBard(){
    this.close = false;
  }

}
