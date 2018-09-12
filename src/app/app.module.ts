import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'
import { NgbModule, NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FormsModule, NgForm } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { environment } from '../environments/environment';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './common/auth.service';
import { AuthGuardService } from './common/authGuard.service';
import { UserService } from './common/user.service';
import { AdminAuthGuardService } from './common/admin-auth-guard.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { CategoryService } from './common/category.service';
import { CategoryFilterComponent } from './products/category-filter/category-filter.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ShoppingCartService } from './common/shopping-cart.service';
import { ProductQuantityComponent } from './product-quantity/product-quantity.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    ProductFormComponent,
    CategoryFilterComponent,
    ProductCardComponent,
    ProductQuantityComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    CustomFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    RouterModule.forRoot([
      {path:'', component:ProductsComponent},
      {path:'login', component:LoginComponent},
      {path:'products', component:ProductsComponent},
      {path:'shopping-cart', component:ShoppingCartComponent},

      {path:'check-out', component:CheckOutComponent, canActivate:[AuthGuardService]},
      {path:'order-success', component:OrderSuccessComponent, canActivate:[AuthGuardService]},
      {path:'my/orders', component:MyOrdersComponent, canActivate:[AuthGuardService]},

      {path:"admin/products/new", component:ProductFormComponent, canActivate:[AuthGuardService, AdminAuthGuardService]},
      {path:"admin/products/:id", component:ProductFormComponent, canActivate:[AuthGuardService, AdminAuthGuardService]},
      {path:'admin/products', component:AdminProductsComponent, canActivate:[AuthGuardService, AdminAuthGuardService]},
      {path:'admin/orders', component:AdminOrdersComponent, canActivate:[AuthGuardService, AdminAuthGuardService]},
    ])
  ],
  providers: [
    NgbDropdown,
    AuthService,
    UserService,
    CategoryService,
    ShoppingCartService,
    AdminAuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
