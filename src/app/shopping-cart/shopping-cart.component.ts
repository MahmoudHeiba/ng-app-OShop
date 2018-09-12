import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../common/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cart$
  constructor(private shoppingCartservice:ShoppingCartService ) { }

  async ngOnInit() {
    this.cart$ = (await this.shoppingCartservice.getCart())
  }

}
