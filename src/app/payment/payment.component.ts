import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Payment } from '../payment.model';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  constructor(private shopService: ShopService,
    private router: Router) { }

  shopVisited = false;
  shippingMethod = "";

  form = new FormGroup({
    payTyp: new FormControl('',[Validators.required])
  });

  cardForm = new FormGroup({
    cardNo: new FormControl('',[Validators.required, 
      Validators.minLength(16), 
      Validators.maxLength(16),
      Validators.pattern("^[0-9]*$")]),
    name: new FormControl('',[Validators.required,
      Validators.minLength(6)]),
    expDate: new FormControl('',[Validators.required,
      Validators.pattern("^(0[1-9]|1[012])\/(2[2-9]|[3-9][0-9])$")]),
    cvv: new FormControl('',[Validators.required,
      Validators.pattern("^[0-9][0-9][0-9]$")])
  });

  cardNo = "";
  name = "";
  expDate = "";
  cvv = "";

  backToShippingInfo(){
    this.router.navigate(['/order/shippingInfo']);
  }

  makePayment(){
    const type = this.form.value.payTyp;
    if(type == "creditcard"){
      const payment = new Payment(
        this.cardForm.value.cardNo,
        this.cardForm.value.name,
        this.cardForm.value.expDate,
        this.cardForm.value.cvv
      );
  
      this.shopService.makePayment(payment);
    }else{
      this.shopService.makePayment();
    }
    this.router.navigate(['/shop']);
  }

  ngOnInit(): void {
    this.shopService.shopVisited.subscribe(
      visited => {
        this.shopVisited = visited;
      }
    );

    if(!this.shopVisited){
      this.router.navigate(['/shop']);
    }else{
      this.shopService.shippingMethod.subscribe(
        method => {
          this.shippingMethod = method;
        }
      );

      if(this.shippingMethod == ""){
        alert("Select Shipping Method")
        this.router.navigate(['/order/shippingInfo']);
      }
    }
  }

}
