import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { ProductService } from '../../common/product.service';
import { Subscription } from 'rxjs';
import { IProduct } from '../../models/product';
import { AngularFireAction, DatabaseSnapshot } from 'angularfire2/database';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  productList:IProduct[];
  filterdProductList:{}[]
  subscription:Subscription
  constructor(private productS:ProductService) {
     this.subscription = this.productS.GetAll().subscribe(p => {
       this.productList = p;
       this.filterdProductList = p;
       console.log(p)
     });
   }

  ngOnInit() {
  }

  filter(query){
    console.log(query);
    this.filterdProductList = this.productList.filter(a => a.title.toUpperCase().indexOf(query.toUpperCase()) != -1)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
