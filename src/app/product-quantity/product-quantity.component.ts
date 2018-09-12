import { Component, OnInit, Input } from '@angular/core';
import { IProduct } from '../models/product';
import { ShoppingCartService } from '../common/shopping-cart.service';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent implements OnInit {
  @Input("product") product:IProduct
  @Input("shopping-cart") shoppingCart
  constructor(private cartService:ShoppingCartService) { }

  ngOnInit() {
  }

  addToCart(){
    this.cartService.addToCart(this.product);
  }

  removeFromCart(){
    this.cartService.removeFromCart(this.product);
  }

}
