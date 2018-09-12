import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {

  constructor(private auth:AuthService, private userService:UserService) { }

  canActivate(){
    return this.auth.user$.pipe(
      switchMap(user => {
        return this.userService.get(user.uid)
      }),
      map(x=>{
       return x.isAdmin
      })
    )
  }
}
