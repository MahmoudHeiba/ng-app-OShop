import { Injectable } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth"
import * as firebase from "firebase"
import { Observable,of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;
  constructor(private fbAuth:AngularFireAuth, private route:ActivatedRoute, private userService:UserService) { 
    this.user$ = fbAuth.authState;
  }

  login(){
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
    localStorage.setItem('returnUrl',returnUrl);
    this.fbAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout(){
    this.fbAuth.auth.signOut();
  }

  get AppUser$(){
    return this.user$.pipe(
      switchMap(user => {
        if(user)
          return this.userService.get(user.uid);

        return of(null)
      }),
    )
  }
}
