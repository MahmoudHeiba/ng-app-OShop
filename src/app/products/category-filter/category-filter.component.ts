import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from '../../common/category.service';

@Component({
  selector: 'category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.css']
})
export class CategoryFilterComponent implements OnInit {
  categories$
  @Input("category") category
  constructor(private categoryService:CategoryService) {
    this.categories$ = categoryService.getCategories();
   }

  ngOnInit() {
  }
}
