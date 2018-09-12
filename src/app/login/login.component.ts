import { Component, OnInit } from '@angular/core';
import { AuthService } from '../common/auth.service';
import { switchMap } from 'rxjs/operators';
import { UserService } from '../common/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth:AuthService) { }

  ngOnInit() {
  }

  login(){
    this.auth.login();
  }

}
