import { IProduct } from "./product";

export class shoppingCartItem{
    constructor(public product:IProduct, public quantity:number){}

    get totalPrice(){
        return this.product.price * this.quantity
    }
}