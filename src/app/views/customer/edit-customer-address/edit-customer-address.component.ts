import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MockService } from '../../../services/mock.service';
import { CommonService } from '../../../services/common.service';
const emailPattern = environment.emailPattern;

@Component({
  selector: 'app-edit-customer-address',
  templateUrl: './edit-customer-address.component.html',
  styleUrls: ['./edit-customer-address.component.scss']
})
export class EditCustomerAddressComponent implements OnInit {
  editbillingForm: FormGroup;
  lstCountry: any = [];
  orderId: any;
  editRecord: any;
  shippingId: any;
  billingId: any;
  isbtnedit: boolean = true;
  id: number;
  customerId: number;
  addressId: number;

  constructor(private fb: FormBuilder, private _router: Router, private _mD: MockService, private _route: ActivatedRoute, private _cS: CommonService) { }

  ngOnInit() {
    this.fbEditAddress();
    this.getRecord();
    this.lstCountry = this._mD.countryList();
  }

  //#region form group
  fbEditAddress() {
    this.editbillingForm = this.fb.group({
      fnm: ['', Validators.compose([Validators.required, Validators.pattern('.*\\S.*[a-zA-z ]')])],
      lnm: ['', Validators.compose([Validators.required, Validators.pattern('.*\\S.*[a-zA-z ]')])],
      mono: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]\\d{0,15}')])],
      company: [''],
      mail: ['', Validators.compose([Validators.required, Validators.pattern(emailPattern)])],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      addone:['', Validators.compose([Validators.required, Validators.pattern('.*\\S.*[a-zA-z0-9 ]')])],
      addtwo: [''],
      pinno: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]\\d{0,15}')])],
      faxno: [''],
    });
  }
  

  getParameter() {
    this._route.queryParams.subscribe(params => {
      this.orderId = params['id']
    });
  }

  backToCustomerDetails() {
    this._router.navigate(['/customers']);
  }

  getParam() {
    this._route.queryParams.subscribe(params => {
      // this.orderId = params['id']
      // this.billingId = params['billingid']
      // this.shippingId = params['shippingid']
      this.customerId = params['customerId']
      this.addressId = params['addressId']


    });
  }

  otherCountry = {
    "id": 0, "name": "Other (Non US)", "Form": null, "CustomProperties": {}
  }

  statelist: any = []


  getRecord() {
    this.getParam();
    if (this.customerId) {
      this._cS.API_GET(this._cS.getParticularCustomer(this.customerId))
        .subscribe(response => {
          if (response) {
            this.editRecord = response.customers[0].addresses[0];
            this.lstCountry = this._mD.countryList();
            if (this.customerId != null) {
              this._cS.API_GET(this._cS.getCountry(this.editRecord.country_id)).subscribe(res => {
                this.statelist = res;
                var statebilling = this.statelist.find((item) => item.id == this.editRecord.state_province_id);
                const country = this.lstCountry.find((item) => item.state_id == this.editRecord.country_id);
                if (statebilling == undefined) {
                  statebilling = this.otherCountry;
                }
                this.addressId = this.editRecord.id;
                this.editbillingForm.patchValue({
                  fnm: this.editRecord.first_name,
                  lnm: this.editRecord.last_name,
                  mail: this.editRecord.email,
                  company: this.editRecord.company,
                  country: country.state_id,
                  state: statebilling.id,
                  city: this.editRecord.city,
                  addone: this.editRecord.address1,
                  addtwo: this.editRecord.address2,
                  pinno: this.editRecord.zip_postal_code,
                  mono: this.editRecord.phone_number,
                  faxno: this.editRecord.fax_number,
                });
              });
            }


          }
          else {

            this._cS.displayToast(2, 'Error in response');
          }
        })

    }
  }

  statebilling: any;

  onSelectCountry(country_id) {
    this._cS.API_GET(this._cS.getCountry(country_id)).subscribe(res => {
      this.statelist = res;
      this.statebilling = this.statelist.find((item) => item.id == this.editRecord.state_province_id);
      if (this.statebilling == undefined) {

        this.statebilling = this.otherCountry;
      }
      else {

        this.editbillingForm.patchValue({
          state: this.statebilling.name,
        });
      }
    });
  }

  // editBilling() {
  //   this.getParam();
  //   this._cS.API_GET(this._cS.getCountry(this.editbillingForm.value.country)).subscribe(res => {
  //     this.statelist = res;
  //   });
  //   var statebilling = this.statelist.find((item) => item.id == this.editbillingForm.value.state);
  //   var countryname = this.lstCountry.find((item) => item.state_id == this.editbillingForm.value.country);
  //   if (statebilling == undefined) {
  //     statebilling = this.otherCountry;
  //   }
  //   var body = {
  //     "order":
  //     {
  //       "billing_address": {
  //         "first_name": this.editbillingForm.value.fnm,
  //         "last_name": this.editbillingForm.value.lnm,
  //         "email": this.editbillingForm.value.mail,
  //         "company": this.editbillingForm.value.company,
  //         "country_id": +this.editbillingForm.value.country,
  //         "country": countryname.state,
  //         "state_province_id": +statebilling.id ? +statebilling.id : null,
  //         "city": this.editbillingForm.value.city,
  //         "address1": this.editbillingForm.value.addone,
  //         "address2": this.editbillingForm.value.addtwo,
  //         "zip_postal_code": +this.editbillingForm.value.pinno,
  //         "phone_number": +this.editbillingForm.value.mono,
  //         "fax_number": +this.editbillingForm.value.faxno,
  //         "id": +this.billingId,
  //       },
  //       id: +this.orderId,
  //       shipping_method: this.editRecord.shipping_method
  //     }
  //   }

  //   this._cS.API_PUT(this._cS.getOrderId(this.orderId), body)
  //     .subscribe(res => {
  //       if (res) {
  //         this._cS.displayToast(1, 'Record updated successfully');
  //         this._router.navigate(['/sales/viewrecord'], { queryParams: { id: this.orderId } });
  //       } else {
  //         this._cS.displayToast(2, 'Error in response');
  //       };
  //     }, err => {
  //       this._cS.displayToast(2, 'Record not updated');
  //     });

  // }

  editShpping() {
    this.getParam();
    this._cS.API_GET(this._cS.getCountry(this.editbillingForm.value.country)).subscribe(res => {
      this.statelist = res;
    });
    var statebilling = this.statelist.find((item) => item.id == this.editbillingForm.value.state);
    var countryname = this.lstCountry.find((item) => item.state_id == this.editbillingForm.value.country);
    if (statebilling == undefined) {
      statebilling = this.otherCountry;
    }

    var body = {

      "customer": {
        "addresses": [
          {
            "first_name": this.editbillingForm.value.fnm,
            "last_name": this.editbillingForm.value.lnm,
            "email": this.editbillingForm.value.mail,
            "company": this.editbillingForm.value.company,
            "country_id": this.editbillingForm.value.country,
            "country": countryname.state,
            "state_province_id": +statebilling.id ? +statebilling.id : null,
            "city": this.editbillingForm.value.city,
            "address1": this.editbillingForm.value.addone,
            "address2": this.editbillingForm.value.addtwo,
            "zip_postal_code": this.editbillingForm.value.pinno,
            "phone_number": this.editbillingForm.value.mono,
            "fax_number": this.editbillingForm.value.faxno,
            "id": +this.addressId

          }
        ],

        "id": +this.customerId
      }

    }
    this._cS.API_PUT(this._cS.getParticularCustomer(this.customerId), body)
      .subscribe(res => {
        if (res) {
          this._cS.displayToast(1, 'Record updated successfully');
          this._router.navigate(['/customers']);
        } else {
        };
      }, err => {
        this._cS.displayToast(2, 'Record not updated');
      });
  }

}
