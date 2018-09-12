import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../common/category.service';
import { take } from 'rxjs/operators';
import { ProductService } from '../../common/product.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categoreies$;
  id;
  product = {};
  constructor(private categoryService:CategoryService, private productS:ProductService, private router:Router, private activerouter:ActivatedRoute) {   
    this.categoreies$ = this.categoryService.getCategories();
    this.id = this.activerouter.snapshot.paramMap.get("id");
    if (this.id) {
      productS.Get(this.id).pipe(take(1)).subscribe(p=> this.product=p)
    }
  }

  ngOnInit() {
  }

  Save(){
    if (this.id) {
      this.productS.Update(this.id,this.product)
    }else {
      this.productS.Create(this.product);
    }

    this.router.navigate(['admin/products'])
  }

  Delete(){
    if (confirm("are you sure")) {
      this.productS.Delete(this.id);
      this.router.navigate(['admin/products'])
    }
  }

}
