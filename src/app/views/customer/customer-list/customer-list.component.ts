import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MockService } from '../../../services/mock.service';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
  lstcustomers: any = [];
  lstCustomerRoles = [];
  totalRecords: number;
  pageIndex: number = 1;
  pageSize: number = 10;
  constructor(private router: Router, private _mS: MockService, private _cS: CommonService) { }

  ngOnInit() {
    this.lstCustomerRoles = this._mS.customerRoles();
    this.getCustomerList();
  }

  pageChanged(value) {
    this.pageIndex = +value;
     this.getCustomerList();
  };

  changePageSize(value) {
    this.pageIndex = 1;
    this.pageSize = value;
    this.getCustomerList();
  }
  navigateToEditCustomer(cust) {
    // console.log("cust",cust.id);  
    //  this._mS.setItemInStorage('customerToEdit',cust);

    // this.router.navigateByUrl('/customers/addEdit', {id : cust.id});
    this.router.navigate(['/customers/addEdit'], { queryParams: { id: cust.id } });
  }
  getCustomerList() {
    this._cS.API_GET(this._cS.getCustomersList(this.pageSize, this.pageIndex))
      .subscribe(response => {
           this.getCustomerCount();
        this.lstcustomers = [];
        for (let i = 0; i < response.customers.length; i++) {
          const data = {
            id: response.customers[i].id,
            email: response.customers[i].email,
            name: response.customers[i].first_name + " " + response.customers[i].last_name,
            customerRole: response.customers[i].role_ids,
            active: response.customers[i].active,
            createdOn: response.customers[i].created_on_utc,
            lastActivity: response.customers[i].last_activity_date_utc
          }
          this.lstcustomers.push(data);
        }
      })
  }
  getCustomerCount() {
    this._cS.API_GET(this._cS.getCustomerTotalRecord())
      .subscribe(response => {
        if (response) {
          this.totalRecords = response.count;
        }
      })
  }
  getTotalRecord() {
    this._cS.API_GET(this._cS.getCustomerTotalRecord())
      .subscribe(response => {
        this.totalRecords = response.count;
        // console.log('response:', response.count)
        this.getCustomerList();
      })
  }
}
