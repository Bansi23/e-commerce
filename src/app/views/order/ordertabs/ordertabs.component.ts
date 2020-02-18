import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ordertabs',
  templateUrl: './ordertabs.component.html',
  styleUrls: ['./ordertabs.component.scss']
})
export class OrdertabsComponent implements OnInit {

  title: any = 'Edit order details';
  orderId: any;

  backToSearchList() {
    this._router.navigate(['/sales/orders']);
  }
  constructor(private _router: Router, private _route: ActivatedRoute) { }


  ngOnInit() {
    this._route.queryParams.subscribe(params => {
      this.orderId = params['id']
    });
  }
}
