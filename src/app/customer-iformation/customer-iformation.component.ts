import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from '../customer.model';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-customer-iformation',
  templateUrl: './customer-iformation.component.html',
  styleUrls: ['./customer-iformation.component.css']
})
export class CustomerIformationComponent implements OnInit{

  constructor(private shopService: ShopService,
    private router: Router) { }

  inEditMode = false;
  shopVisited = false;

  countries = ["India", "US", "Japan", "UK", "China", "Spain", "South Africa", "Bangladesh", 
  "Srilanka", "UAE", "Maleshiya", "Nepal", "Bhutan", "Pakisthan", "Namibia", "Afghanisthan", "Singapor"];

  custInfoForm = new FormGroup({
    fname: new FormControl('',[Validators.required]),
    lname: new FormControl('',[Validators.required]),
    address: new FormControl('',[Validators.required]),
    country: new FormControl('',[Validators.required]),
    city: new FormControl('',[Validators.required]),
    pcode: new FormControl('',[Validators.required]),
    phone: new FormControl('',[Validators.required]),
  });

  storeCustInfo(){
    const cust = new Customer(
      this.custInfoForm.value.fname,
      this.custInfoForm.value.lname,
      this.custInfoForm.value.address,
      this.custInfoForm.value.country,
      this.custInfoForm.value.city,
      this.custInfoForm.value.pcode,
      this.custInfoForm.value.phone
    );
    
    this.shopService.storeCustomerInfo(cust);
    if(this.inEditMode){
      this.shopService.finishEditMode();
    }
    this.router.navigate(['/order/shippingInfo']);
  }

  returnBack(){
    if(this.inEditMode){
      this.shopService.finishEditMode();
    }
    this.shopService.paymentCancled();
    this.router.navigate(['/shop']);
  }

  initForm(){
    const cust = this.shopService.getCustomerInfo();
    this.custInfoForm.patchValue({
      fname: cust.fname,
      lname: cust.lname,
      address: cust.address,
      country: cust.country,
      city: cust.city,
      pcode: cust.pcode,
      phone: cust.phone
    });
  }

  ngOnInit(): void {
    this.shopService.shopVisited.subscribe(
      visited => {
        this.shopVisited = visited;
      }
    );
    if(this.shopVisited){
      let select = document.getElementById("country");
      for(let country of this.countries){
        select?.appendChild(new Option(country,country));
      }

      this.shopService.inEditMode.subscribe(
        editMode => {
          this.inEditMode = editMode;
          if(this.inEditMode){
            this.initForm();
          }
        }
      );
    }else{
      this.router.navigate(['/shop']);
    }
  }
}
