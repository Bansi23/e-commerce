import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MockService } from '../../../services/mock.service';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-customer-address',
  templateUrl: './customer-address.component.html',
  styleUrls: ['./customer-address.component.scss']
})
export class CustomerAddressComponent implements OnInit {
  custId;
  custAddress = [];
  totalRecords: number;
  pageIndex: number = 1;
  pageSize: number = 10;
  temp = [];
  constructor(private router: Router, private _mS: MockService, private _cS: CommonService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route
      .queryParams
      .subscribe(params => {
        this.custId = params['id']
      });

    if (this.custId) {
      this.getCustomerOrderAddress();
    }
  }

  pageChanged(value) {
    this.pageIndex = +value;
    this.getCustomerOrderAddress();
  };

  changePageSize(value) {
    this.pageIndex = 1;
    this.pageSize = value;
    this.getCustomerOrderAddress();
  }
  getTotalRecord() {
    this.totalRecords = this.temp.length
  }
  getCustomerOrderAddress() {
    this._cS.API_GET(this._cS.getParticularCustomer(this.custId))
      .subscribe(response => {
        this.temp = response.customers;
        this.custAddress = [];
        this.getTotalRecord();
        if (this.temp[0].addresses.length) {

          for (let i = 0; i < this.temp.length; i++) {

            if (this.temp[i].addresses.length) {
              var data = {
                firstName: this.temp[i].addresses[0].first_name,
                lastName: this.temp[i].addresses[0].last_name,
                email: this.temp[i].addresses[0].email,
                phoneNo: this.temp[i].addresses[0].phone_number,
                faxNo: this.temp[i].addresses[0].fax_number,
                address: new Array(this.temp[i].addresses[0].company,
                  this.temp[i].addresses[0].address1,
                  this.temp[i].addresses[0].address2,
                  this.temp[i].addresses[0].city,
                  this.temp[i].addresses[0].zip_postal_code,
                  this.temp[i].addresses[0].country),
                customerId: this.temp[0].id,
                addressId: this.temp[0].addresses[0].id
              }
            }
            this.custAddress.push(data);
          }
        } else {
          // this._cS.displayToast(3, "No address found");
          this.totalRecords = 0;
        }

      })

  }
  navigateToEditAddress(customerId, addressId) {

    // this.router.navigate(['/sales/editbilling'], { queryParams: { customerId: customerId, addressId: addressId } });
    this.router.navigate(['/customers/editCustomerAddress'], { queryParams: { customerId: customerId, addressId: addressId } });
  }

}
