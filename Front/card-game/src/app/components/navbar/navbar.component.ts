import { Component, OnInit, Input } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLogged = false;

  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    getAuth()
        .onAuthStateChanged(user=>{
            debugger
            if (user?.uid){                
              this.userService.userLoged.emit(true);
            }
        });
    this.userService.userLoged.subscribe( event => this.isLogged = event.valueOf() );
  }

  logout(){    
    this.userService.logout()
    .then(() => { 
      this.router.navigate(['/']);
      this.userService.userLoged.emit(false);
    })
    .catch((error) =>{ 
      console.log(error) 
    }) 
  }

}
