import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerIformationComponent } from './customer-iformation/customer-iformation.component';
import { OrderComponent } from './order/order.component';
import { PaymentComponent } from './payment/payment.component';
import { ShiipigInfoComponent } from './shiipig-info/shiipig-info.component';
import { ShopComponent } from './shop/shop.component';

const routes: Routes = [
  {path: "", redirectTo: "/shop", pathMatch: "full"},
  {path: "shop", component: ShopComponent},
  {path: "order", component: OrderComponent, children: [
    {path: "", redirectTo: "/order/customerInfo", pathMatch: "full"},
    {path: "customerInfo", component: CustomerIformationComponent},
    {path: "shippingInfo", component: ShiipigInfoComponent},
    {path: "payment", component: PaymentComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
