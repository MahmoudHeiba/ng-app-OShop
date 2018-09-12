import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../common/product.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { IProduct } from '../models/product';
import { ShoppingCartService } from '../common/shopping-cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  productsFiltered
  products: IProduct[]=[]
  category
  cart 
  subscription:Subscription
  constructor(
    private productservice:ProductService, 
    private routerActive:ActivatedRoute, 
    private shoppingCart:ShoppingCartService
  ) {  
    this.productservice.GetAll().pipe(
      switchMap( a => {
        this.products = a;
        return this.routerActive.queryParamMap;
    })).subscribe(q=>{
      this.category = q.get("category");
      this.productsFiltered = (this.category)? this.products.filter(a=>a.category === this.category):this.products
    })
   }

  async ngOnInit() {
    this.subscription = (await this.shoppingCart.getCart()).subscribe(cart => {
      console.log(cart)
      this.cart = cart;
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
