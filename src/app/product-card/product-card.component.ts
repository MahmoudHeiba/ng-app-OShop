import { Component, OnInit, Input } from '@angular/core';
import { IProduct } from '../models/product';
import { ShoppingCartService } from '../common/shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input("product") product:IProduct
  @Input("show-action")showAction:boolean = true;
  @Input("shopping-cart") shoppingCart
  constructor(private cartService:ShoppingCartService) { }

  ngOnInit() {
  }

  addToCart(){
    this.cartService.addToCart(this.product);
  }

}
