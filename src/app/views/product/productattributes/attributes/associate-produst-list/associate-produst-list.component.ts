import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MockService } from '../../../../../services/mock.service';
import { CommonService } from '../../../../../services/common.service';

@Component({
  selector: 'app-associate-produst-list',
  templateUrl: './associate-produst-list.component.html',
  styleUrls: ['./associate-produst-list.component.scss']
})
export class AssociateProdustListComponent implements OnInit {
  @Output() associateProduct = new EventEmitter();
  @Output() productList = new EventEmitter();
  tableHeader: any = ['Select', 'Product name', 'Published'];

  //#region pagination
  pageIndex: number = 1;
  pageSize: number = 10;
  totalRecords: number;

  pageChanged(value) {
    this.pageIndex = +value;
    this.getProductList();
  };

  changePageSize(value) {
    this.pageIndex = 1;
    this.pageSize = value;
    this.getProductList();
  }
  //#endregion

  //#region search panel form 
  associateForm: FormGroup;

  associateForm_fb() {
    this.associateForm = this.fb.group({
      productName: [null],
      productType: [null],
      category: [null],
      manufacturer: [null],
      vendor: [null],
    })
  }
  //#endregion

  //#region static list
  lstProductType: any = [];
  lstVendor: any = [];
  getStaticList() {
    this.lstProductType = this._mS.getProductType();
    this.lstVendor = this._mS.getVendorList();
    this.associateForm.patchValue({
      productType: 0,
      category: 0,
      manufacturer: 0,
      vendor: 0
    })
  }
  //#endregion

  //#region getProductList
  lstProduct: any = [];
  getProductList() {
    this._cS.API_GET(this._cS.URL_getProductList(this.pageSize, this.pageIndex))
      .subscribe(res => {
        this.lstProduct = res.products;
        this.productList.emit(this.lstProduct);
      })
  }

  getTotalRecord() {
    this._cS.API_GET(this._cS.URL_getTotalRecords())
      .subscribe(res => {
        if (res) {
          this.totalRecords = res.count;
          this.getProductList();
        }
      })
  }

  selectProduct(id) {
    this.associateProduct.emit(id);
  }
  //#endregion
  constructor(private fb: FormBuilder,
    private _mS: MockService,
    private _cS: CommonService) { }

  ngOnInit() {
    this.associateForm_fb();
    this.getStaticList();
    this.getTotalRecord();
    this.getProductList();
  }

}
