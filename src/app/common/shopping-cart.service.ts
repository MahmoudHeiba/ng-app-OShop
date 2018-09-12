import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { take, map } from 'rxjs/operators';
import { promise } from 'protractor';
import { Observable } from 'rxjs';
import { shoppingCart } from '../models/shopping-cart';
import { shoppingCartItem } from '../models/shopping-cart-item';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db:AngularFireDatabase ) { }

  private createCart(){
    return this.db.list("/shopping-carts/").push(
      {createdDate:Date.now()}
    )
  }

  private getItem(cartId, productId){
    return this.db.object("/shopping-carts/"+ cartId +"/items/"+ productId)//.valueChanges();
  }

  private async getOrCreateCartId (){
    let cartId = localStorage.getItem("cartId");
    if(cartId) return cartId;

    let cart = await this.createCart();
    localStorage.setItem("cartId",cart.key);
    return cart.key
  }

  addToCart(product){
    this.updateCartItem(product, 1);
  }

  removeFromCart(product){
    this.updateCartItem(product, -1);
  }

  private async updateCartItem(product, change){
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key);
    
    item$.snapshotChanges().pipe(take(1)).subscribe(item =>{
        item$.update({
          product:product,
          quantity:  (item.payload.val())? (item.payload.val() as {product,quantity} ).quantity + change : 1 
        })
    })
  }

  async getCart():Promise<Observable<shoppingCart>>{
    let cartId = await this.getOrCreateCartId();
    return (this.db.object("/shopping-carts/"+ cartId).valueChanges() as Observable<shoppingCart>).pipe(
      map(a=>{
        return new shoppingCart(a.items);
      })
    ) ;
  }

}
