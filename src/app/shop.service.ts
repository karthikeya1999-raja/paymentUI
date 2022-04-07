import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Customer } from './customer.model';
import { Payment } from './payment.model';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor() { }

  myCart: Product[] = [];
  customer: Customer = new Customer();
  shippingMethod = new BehaviorSubject<string>("standred");
  myCartChanged = new BehaviorSubject<Product[]>([]);
  inEditMode = new BehaviorSubject<boolean>(false);
  pymentInProcess = new BehaviorSubject<boolean>(false);
  shopVisited = new BehaviorSubject<boolean>(false);

  visitedShop(){
    this.shopVisited.next(true);
  }

  inOrderPage(){
    this.pymentInProcess.next(true);
  }

  paymentComplete(){
    this.pymentInProcess.next(false);
  }

  paymentCancled(){
    this.pymentInProcess.next(false);
  }

  loadMyCartItems(){
    let myCartItemsAsString = localStorage.getItem("cartItems");
    if(myCartItemsAsString == null){
      myCartItemsAsString = "[]";
    }else{
      this.myCart = JSON.parse(myCartItemsAsString);
      this.myCartChanged.next(this.myCart);
    }
  }

  addToShoppingCart(product: Product){
    this.myCart.push(product);
    this.myCartChanged.next(this.myCart);
    localStorage.setItem("cartItems",JSON. stringify(this.myCart));
  }

  removeFromShopingCart(id: number){
    this.myCart.splice(id,1);
    this.myCartChanged.next(this.myCart);
    localStorage.setItem("cartItems",JSON. stringify(this.myCart));
  }

  removeAllItemFromCart(){
    this.myCart = [];
    this.myCartChanged.next(this.myCart);
    localStorage.removeItem("cartItems");
  }

  storeCustomerInfo(cust: Customer){
    this.customer = cust;
  }

  getCustomerInfo(){
    return this.customer;
  }

  makePayment(info: Payment = new Payment()){
    alert("Purchase Success...");
    this.myCart = [];
    this.myCartChanged.next(this.myCart);
    this.shippingMethod.next("standred");
    this.paymentComplete();
    localStorage.removeItem("cartItems");
  }

  editAddress(){
    this.inEditMode.next(true);
  }

  finishEditMode(){
    this.inEditMode.next(false);
  }

  saveShippingInfo(method: string){
    this.shippingMethod.next(method);
  }
}
