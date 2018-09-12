import { shoppingCartItem } from "./shopping-cart-item";
import { IProduct } from "./product";

export class shoppingCart{
    items:shoppingCartItem[]=[]
   
    constructor(public itemsMap:shoppingCartItem[]){
        for (const key in itemsMap) {
            let item = itemsMap[key];
            this.items.push(new shoppingCartItem(item.product, item.quantity)) 
        }
    }

    get totalItemCount(){
        let count = 0;
        for (const key in this.items) {
          count += this.items[key].quantity;
        }
        return count;
    }

    get totalPrice(){
        let sum =0;
        for (const key in this.items) 
            sum += this.items[key].totalPrice;
        return sum
    }

    
  getQuantity(product:IProduct){
    let item = this.itemsMap[product.key];
    return item? item.quantity : 0 ;
  }
}