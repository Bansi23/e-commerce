import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-select-add-product',
  templateUrl: './select-add-product.component.html',
  styleUrls: ['./select-add-product.component.scss']
})
export class SelectAddProductComponent implements OnInit {

  //#region  property
  AddProduct: FormGroup
  addProduct: any = [];
  orderid: any;
  productid: any;
  orderItem: any = [];
  newArray: any = [];
  productAttributes: any = [];
  //#endregion

  //#region form group
  fbAddProduct() {
    this.AddProduct = this.fb.group({
      priceIncl: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]\\d{0,50}')])],
      priceExcl: [null, Validators.compose([Validators.required, Validators.pattern('[0-9]\\d{0,50}')])],
      quantity: [1, Validators.compose([Validators.required, Validators.pattern('[0-9]\\d{0,50}')])],
      totalIncl: [null, Validators.compose([Validators.required, Validators.pattern('[0-9]\\d{0,50}')])],
      totalExcl: [null, Validators.compose([Validators.required, Validators.pattern('[0-9]\\d{0,50}')])],
      inputtext: [''],
      droplist: [''],
      radiolist: [''],
      imagesquares: [''],
      multilinetextbox: [''],
      checkboxes: ['']

    });
  }
  //#endregion

  //#region methods
  backToSearchList() {
    this.getParameter();
    this._router.navigate(['/sales/addproduct'], { queryParams: { id: this.orderid } });
  }

  getParameter() {
    this._route.queryParams.subscribe(params => {
      this.orderid = params['id']
      this.productid = params['productid']
    });
  }

  getProduct() {
    this.getParameter();
    this._cS.API_GET(this._cS.URL_getProductById(this.productid))
      .subscribe(res => {
        if (res) {
          this.addProduct = res.products[0];
          this.productAttributes = this.addProduct.attributes;
          this.AddProduct.patchValue({
            priceIncl: this.addProduct.price ? this.addProduct.price : null,
            priceExcl: this.addProduct.price ? this.addProduct.price : null,
            totalIncl: this.addProduct.price ? this.addProduct.price : null,
            totalExcl: this.addProduct.price ? this.addProduct.price : null,
          });
        } else {
        };
      }, err => {
        this._cS.displayToast(2, 'Connection Timeout');
      });
  }
  //#endregion
  addProducttoOrder() {
    this.getParameter();
    for (let val in this.AddProduct.controls) {
      this.AddProduct.controls[val].markAsTouched();
    };
    if (this.AddProduct.valid) {
      this._cS.API_GET(this._cS.getOrderItem(this.orderid))
        .subscribe(response => {
          if (response) {
            this.orderItem = response.order_items;
            let body = {
              order_item: {
                quantity: this.AddProduct.value.quantity,
                unit_price_incl_tax: this.AddProduct.value.totalExcl,
                managerOfVendor: this.AddProduct.value.totalExcl,
                unit_price_excl_tax: this.AddProduct.value.totalExcl,
                price_incl_tax: this.AddProduct.value.totalExcl,
                price_excl_tax: this.AddProduct.value.totalExcl,
                discount_amount_incl_tax: 0.0000,
                discount_amount_excl_tax: 0.0000,
                original_product_cost: 0.0000,
                attribute_description: "",
                download_count: 0,
                isDownload_activated: this.addProduct.is_download,
                product: this.addProduct,
                product_id: this.productid,
              }
            }
            this._cS.API_POST(this._cS.getOrderItem(this.orderid), body)
              .subscribe(response => {
                if (response) {
                  this._cS.displayToast(1, 'Successfully added this Product')
                  this._router.navigate(['/sales/viewrecord'], { queryParams: { id: this.orderid } });
                }
                else {
                  this._cS.displayToast(2, 'API response error');
                }
              })
          }
        });
    }
    else {
      this._cS.displayToast(2, 'Invalid data')
    }
  }

  constructor(private _router: Router, private _route: ActivatedRoute, private fb: FormBuilder, private _cS: CommonService) { }

  ngOnInit() {
    this.fbAddProduct();
    this.getProduct();
  }

}
