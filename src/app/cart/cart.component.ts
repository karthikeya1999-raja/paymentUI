import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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

  vouchers = [8,4,7,10,25,30];

  myCartItems: Product[] = [];
  shipping = "";
  shippingCost = 0;
  subtotalCost = 0;
  totalCost = 0;
  voucher = 0;
  paymentInProcess = false;

  getRndInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) ) + min;
  }

  onChangeVoucher(event: any){
    let select = document.getElementById("voucher");
    if(select != null){
      this.voucher = +(<HTMLInputElement>select).value;
      this.makeDiscount(this.voucher);
    }
  }

  makeDiscount(id: number){
    this.subtotalCost -= (id/100)*this.subtotalCost;
    this.calcTotalCost();
  }

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
    let index = this.getRndInteger(0,this.vouchers.length);
    let myElement = document.getElementById("voucher");
    myElement?.appendChild(new Option(this.vouchers[index]+"% discount",this.vouchers[index]+""));

    myElement = document.getElementById("contain");
    if(myElement != null){
      myElement.style.height = window.outerHeight+"px";
    }
    
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
