import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerIformationComponent } from './customer-iformation/customer-iformation.component';
import { ShiipigInfoComponent } from './shiipig-info/shiipig-info.component';
import { PaymentComponent } from './payment/payment.component';
import { ShopComponent } from './shop/shop.component';
import { CartComponent } from './cart/cart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderComponent } from './order/order.component';
import { HeadComponent } from './head/head.component';
import { OrderHeadComponent } from './order-head/order-head.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomerIformationComponent,
    ShiipigInfoComponent,
    PaymentComponent,
    ShopComponent,
    CartComponent,
    OrderComponent,
    HeadComponent,
    OrderHeadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
