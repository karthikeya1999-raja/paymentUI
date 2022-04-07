import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor(private sService: ShopService,
    private router: Router) { }

  shopVisited = false;

  ngOnInit(): void {
    this.sService.shopVisited.subscribe(
      visited => {
        this.shopVisited = visited;
      }
    );

    if(this.shopVisited){
      this.sService.inOrderPage();
    }else{
      this.router.navigate(['/shop']);
    }
  }

}
