import { Component, OnInit } from '@angular/core';
import { getAuth, User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    
  }

  onClick(){
    this.userService.loginWithGoogle()
    .then((response) => { 
      this.userService.addUser(response.user, true); 
      this.router.navigate(['/home']);
      this.userService.userLoged.emit(true);
    })
    .catch((error) =>{ console.log(error) });
  }


}
