import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MockService } from '../../../services/mock.service';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-customer-order',
  templateUrl: './customer-order.component.html',
  styleUrls: ['./customer-order.component.scss']
})
export class CustomerOrderComponent implements OnInit {
  custId;
  lstTempOrders = [];
  lstOrders = [];
  totalRecords: number;
  pageIndex: number = 1;
  pageSize: number = 10;

  constructor(private router: Router, private _mS: MockService, private _cS: CommonService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route
      .queryParams
      .subscribe(params => {
        this.custId = params['id']
      });

    if (this.custId) {
      this.getCustomerOrders();
    }

  }

  pageChanged(value) {
    this.pageIndex = +value;
    this.getCustomerOrders();
  };

  changePageSize(value) {
    this.pageIndex = 1;
    this.pageSize = value;
    this.getCustomerOrders();
  }
  getTotalRecord() {
    this.totalRecords = this.lstTempOrders.length
  }

  navigateToOrders(order_Id) {
    this.router.navigate(['/sales/viewrecord'], { queryParams: { id: order_Id } });
  }
  getCustomerOrders() {
    this._cS.API_GET(this._cS.getPaticularCustomerOrder(this.custId))
      .subscribe(response => {
        this.lstTempOrders = response.orders;
        this.lstOrders = [];
        this.getTotalRecord();
        for (let i = 0; i < this.lstTempOrders.length; i++) {
          const data = {
            orderId: this.lstTempOrders[i].id,
            orderTotal: this.lstTempOrders[i].order_total,
            orderStatus: this.lstTempOrders[i].order_status,
            paymentStatus: this.lstTempOrders[i].payment_status,
            shippingStatus: this.lstTempOrders[i].shipping_status,
            createdOn: this.lstTempOrders[i].created_on_utc
          }
          this.lstOrders.push(data);
        }
        // this.lstOrders.push(this.lstTempOrders[0].id);
        // this.lstOrders.push(this.lstTempOrders[0].order_total);
        // this.lstOrders.push(this.lstTempOrders[0].order_status); 
        // this.lstOrders.push(this.lstTempOrders[0].payment_status);
        // this.lstOrders.push(this.lstTempOrders[0].shipping_status);
        // this.lstOrders.push(this.lstTempOrders[0].created_on_utc);
      })

  }

}
