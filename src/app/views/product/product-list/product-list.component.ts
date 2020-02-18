import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../services/common.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  tableHeader: any = ['picture', 'product name', 'sku', 'price', 'stock quantity', 'product type', 'published', 'action'];
  lstProduct: any = [];
  pageIndex: number = 1;
  pageSize: number = 10;
  selectAll: boolean = false;
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

  getProductList() {
    this._cS.API_GET(this._cS.URL_getProductList(this.pageSize, this.pageIndex))
      .subscribe(res => {
        if (res) {
          this.lstProduct = res.products;
        }
      });
  }

  getTotalRecord() {
    this._cS.API_GET(this._cS.URL_getTotalRecords())
      .subscribe(res => {
        if (res) {
          this.totalRecords = res.count;
          this.getProductList()
        }
      })
  }


  editProduct(prodId) {
    // localStorage.setItem('editProductId', prodId);
    this._router.navigate(['catalog/addProduct'], { queryParams: { id: prodId } });
    var editedProduct = this.lstProduct.find(x => x.id == prodId);
    localStorage.setItem('EditedRecord', JSON.stringify(editedProduct));
  }

  deleteProduct(prodId) {
    if (confirm('Are you sure you want to delete this record?')) {
      this._cS.API_DELETE(this._cS.URL_deleteRecord(prodId))
        .subscribe(res => {
          if (res) {
            this.getTotalRecord();
          }
        })
    }
  }

  select_all() {
    for (let i = 0; i < this.lstProduct.length; i++) {
      this.lstProduct[i].select = this.selectAll;
    };
  }
  getPictureList() {

  }
  addProduct() {

  }


  selectedRecord: any = [];
  checkIfAllSelected(rec) {
    rec.select == true;
    if (!rec.select) {
      this.selectAll = false;
    }
  }
  constructor(private _cS: CommonService,
    private _router: Router,
    private _route: ActivatedRoute) { }

  ngOnInit() {
    this.getTotalRecord();
    this.lstProduct.map(x => { x.select = false });
  }
}
