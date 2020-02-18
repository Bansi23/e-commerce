import { Injectable, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CommonService } from '../common.service';

@Injectable({
  providedIn: 'root'
})
export class ProductInfoService {

  //#region create product Api call
  createProduct(body) {
    this._cS.API_POST(this._cS.getProductList(), body)
      .subscribe(res => {
        if (res) {
          this.getProductList();
          this.lstProduct.push(res.products);
        }
      })
  }
  //#endregion

  //#region  get product listing
  lstProduct: any = [];
  getProductList() {
    this._cS.API_GET(this._cS.getProductList())
      .subscribe(res => {
        if (res) {
          this.lstProduct = res.products;
        }
      })
  }
  //#endregion

  constructor(private fb: FormBuilder,
    private _cS: CommonService) { }
}
