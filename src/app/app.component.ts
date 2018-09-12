import { Component } from '@angular/core';
import { AuthService } from './common/auth.service';
import { Router } from '@angular/router';
import { UserService } from './common/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private userService:UserService, private auth:AuthService, route:Router){
    this.auth.user$.subscribe(user=>{
      if (user) {
        userService.save(user);
        let returnUrl = localStorage.getItem('returnUrl');
        if(returnUrl && returnUrl!= "null")
        {
          route.navigateByUrl(returnUrl);
        }
      }
    })
  }
}
