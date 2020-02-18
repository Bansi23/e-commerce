import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from '../../../services/common.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-billing-shipping',
  templateUrl: './billing-shipping.component.html',
  styleUrls: ['./billing-shipping.component.scss']
})
export class BillingShippingComponent implements OnInit {
  editRec: boolean = true;
  viewRecord: any = [];
  orderId: any;
  shippingAddress: any;
  displaybilling: any;
  statelistbilling: any = [];
  statelistshipping: any = [];
  displayshipping: any;
  editShippingMethodForm: FormGroup;

  getParameter() {
    this._route.queryParams.subscribe(params => {
      this.orderId = params['id']
    });
  }

  EditShipMethod(row) {
    this.editRec = false;
    this.editShippingMethodForm.patchValue({
      shippingMethod: row.shipping_method,
    });
  }
  cancleEdit() {
    this.editRec = true;
  }
  SaveChanges() {
    this.getParameter();
    this.editRec = true;
    const paymetMethod = this.editShippingMethodForm.get('shippingMethod').value;
    var body = {
      order: {
        shipping_method: paymetMethod,
        id: +this.orderId
      }
    }
    this._cS.API_PUT(this._cS.getOrderId(this.orderId), body)
      .subscribe(res => {
        if (res) {
          this.getRecord();
          this._cS.displayToast(1, 'SuccessFully Edit Shipping Method');
        } else {
        };
      }, err => {
      });
  }



  billingEdit(id, billingid) {
    this._router.navigate(['/sales/editbilling'], { queryParams: { id: id, billingid: billingid } });
  }
  shippingEdit(id, shippingid) {
    this._router.navigate(['/sales/editbilling'], { queryParams: { id: id, shippingid: shippingid } });
  }


  otherCountry = {
    "id": 500, "name": "Other (Non US)", "Form": null, "CustomProperties": {}
  }


  getRecord() {
    this.getParameter()
    if (this.orderId) {
      this._cS.API_GET(this._cS.getOrderId(this.orderId))
        .subscribe(response => {
          if (response) {
            this.viewRecord = response.orders;
            for (let i = 0; i < this.viewRecord.length; i++) {
              const countryId = this.viewRecord[i].billing_address.country_id;
              this._cS.API_GET(this._cS.getCountry(countryId)).subscribe(res => {
                this.statelistbilling = res;
                this.displaybilling = this.statelistbilling.find((item) => item.id == this.viewRecord[i].billing_address.state_province_id);
                if (this.displaybilling == undefined) {
                  this.displaybilling = this.otherCountry;
                }
              });
              if (this.viewRecord[i].shipping_address != null) {
                const countryIdShipping = this.viewRecord[i].shipping_address.country_id;
                this._cS.API_GET(this._cS.getCountry(countryIdShipping)).subscribe(res => {
                  this.statelistshipping = res;
                  this.displayshipping = this.statelistshipping.find((item) => item.id == this.viewRecord[i].shipping_address.state_province_id);
                  if (this.displayshipping == undefined) {
                    this.displayshipping = this.otherCountry;
                  }
                });
              }
              else {

              }

            }
          }
        });
    }
  }
  goToAddress() {
    const baseUrl = `https://maps.google.com/maps/`;
    for (let i = 0; i < this.viewRecord.length; i++) {
      const pin = this.viewRecord[i].shipping_address.zip_postal_code;
      const city = this.viewRecord[i].shipping_address.city;
      const country = this.viewRecord[i].shipping_address.country;
      const addone = this.viewRecord[i].shipping_address.address1;
      const address = addone.replace(/\+/gi, '%2B');
      const _city = city.replace(/\+/gi, '%2B');

      this.shippingAddress = baseUrl + `search/${pin}+${_city}+${country}+${address}`;


      window.open(this.shippingAddress, "_blank");
    }
  }

  ngOnInit() {
    this.getRecord();
    this.goToAddress();
    this.editShippingMethodForm = this.fb.group({
      shippingMethod: [null],
    });
  }

  constructor(private _router: Router, private _cS: CommonService, private _route: ActivatedRoute, private fb: FormBuilder) { }
}
