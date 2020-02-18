import { Component, OnInit } from '@angular/core';
import { MockService } from '../../../services/mock.service';
import { CommonService } from '../../../services/common.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  //#region propery
  lstWarehouse: any = [];
  lstProductType: any = [];
  lstProductData: any = [];
  pageIndex: number = 1;
  pageSize: number = 10;
  searchProduct: FormGroup;
  countProduct: any;
  orderId: any;
  //#endregion

  //#region form group
  fbSearchProduct() {
    this.searchProduct = this.fb.group({
      productnm: [''],

    });
  }
  //#endregion

  //#region methods
  backToSearchList() {
    this._route.queryParams.subscribe(params => {
      this.orderId = params['id']
    });
    this._router.navigate(['/sales/viewrecord'], { queryParams: { id: this.orderId } });

  }

  getProductRecord() {
    this._cS.API_GET(this._cS.URL_getProductList(this.pageSize, this.pageIndex))
      .subscribe(response => {
        if (response) {
          this.lstProductData = response.products;
        }
      });
  }
  getProductCount() {
    this._cS.API_GET(this._cS.URL_getTotalRecords()).subscribe(res => {
      if (res) {
        this.countProduct = res.count;
      }
    })
  }
  pageChanged(value) {
    this.pageIndex = +value;
    this.getProductRecord();
  };

  selectedChanged(value) {
    this.pageIndex = 1;
    this.pageSize = +value;
    this.getProductRecord();
  };

  SelectProduct(productid) {
    this._route.queryParams.subscribe(params => {
      this.orderId = params['id']
    });
    this._router.navigate(['/sales/selectproduct'], { queryParams: { id: this.orderId, productid: productid } });
  }
  //#endregion

  ngOnInit() {
    this._route.queryParams.subscribe(params => {
      this.orderId = params['id']
    });
    this.getProductRecord();
    this.fbSearchProduct();
    this.getProductCount();
    this.lstWarehouse = this._mD.getWareHouseList();
    this.lstProductType = this._mD.getProductType();
  }
  constructor(private _mD: MockService, private _cS: CommonService, private fb: FormBuilder, private _router: Router, private _route: ActivatedRoute) { }

}
