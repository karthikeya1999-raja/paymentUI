import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from '../customer.model';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-shiipig-info',
  templateUrl: './shiipig-info.component.html',
  styleUrls: ['./shiipig-info.component.css']
})
export class ShiipigInfoComponent implements OnInit {

  constructor(private shopService: ShopService,
    private router: Router) { }

  shippingForm = new FormGroup({
    method: new FormControl('',[Validators.required])
  });

  shopVisited = false;
  customer = new Customer();
  img = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7MbRrwlP4MtsSXkIG-XBxvCnAQi5NuzQpqQ&usqp=CAU";

  addNew(){
    this.router.navigate(['/order/customerInfo']);
  }

  editAddress(){
    this.shopService.editAddress();
    this.router.navigate(['/order/customerInfo']);
  }

  saveShippingInfo(){
    this.shopService.saveShippingInfo(this.shippingForm.value.method);
    this.router.navigate(['/order/payment']);
  }

  ngOnInit(): void {
    this.shopService.shopVisited.subscribe(
      visited => {
        this.shopVisited = visited;
      }
    );

    if(this.shopVisited){
      this.customer = this.shopService.getCustomerInfo();
      if(!this.customer.isValid()){
        alert("Enter the details first");
        this.router.navigate(['/order/customerInfo']);
      }
    }else{
      this.router.navigate(['/shop']);
    }
  }

}
