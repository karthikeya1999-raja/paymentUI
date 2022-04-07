import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../product.model';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private shopService: ShopService,
    private router: Router) { }

  myCartItems: Product[] = [];
  shipping = "";
  shippingCost = 0;
  subtotalCost = 0;
  totalCost = 0;
  paymentInProcess = false;

  calcCostOfItems(){
    let cost = 0;
    for(let item of this.myCartItems){
      cost += item.itemPrice;
    }
    this.subtotalCost = cost;
    this.calcTotalCost();
  }

  calcTotalCost(){
    let cost = 0;
    cost += this.subtotalCost;
    cost += this.shippingCost;
    this.totalCost = cost;
  }

  removeFromCart(id: number){
    this.shopService.removeFromShopingCart(id);
  }

  placeOrder(){
    this.router.navigate(['/order']);
  }

  cancelPayment(){
    this.router.navigate(['/shop']);
  }

  ngOnInit(): void {

    this.shopService.pymentInProcess.subscribe(
      process => {
        this.paymentInProcess = process;
      }
    );

    this.shopService.shippingMethod.subscribe(
      method => {
        this.shipping = method;
        if(this.shipping == "paid"){
          this.shippingCost = 250;
        }else{
          this.shippingCost = 0;
        }
        this.calcTotalCost();
      }
    );

    this.shopService.myCartChanged.subscribe(
      products => {
        this.myCartItems = [...products];
        this.calcCostOfItems();
      }
    )
  }

}
