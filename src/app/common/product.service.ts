import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { map } from 'rxjs/operators';
import { IProduct } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db:AngularFireDatabase) { }

  Create(product){
    this.db.list("/products").push(product)
  }

  GetAll(){
    return (this.db.list("/products")as AngularFireList<IProduct>).snapshotChanges().pipe(map(action=>{
     return action.map(c => ({ key: c.payload.key, ...c.payload.val() }))
    }));
  }

  Get(productId){
    return this.db.object("/products/"+productId).valueChanges()
  }

  Update(productId, product){
    return this.db.object("/products/"+productId).update(product);
  }

  Delete(productId){
    return this.db.object("/products/"+productId).remove();
  }
}
