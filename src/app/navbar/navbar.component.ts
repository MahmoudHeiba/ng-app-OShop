import { Component, OnInit } from '@angular/core';
import { AuthService } from '../common/auth.service';
import { IAppUser } from '../models/appUser';
import { ShoppingCartService } from '../common/shopping-cart.service';
import { Observable } from 'rxjs';
import { shoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  appUser:IAppUser
  shoppingCart$:Observable<shoppingCart>
  constructor(private auth:AuthService, private shoppingCartService:ShoppingCartService) {
  }


  async ngOnInit() {
    this.auth.AppUser$.subscribe(appuser => this.appUser = appuser ); 
     this.shoppingCart$ = (await this.shoppingCartService.getCart());
  }
  
  logout(){
    this.auth.logout();
  }
}
