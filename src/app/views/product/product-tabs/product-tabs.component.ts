import { Component, OnInit, ViewChild, Renderer } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from '../../../services/common.service';
import { TabDirective } from 'ngx-bootstrap/tabs/public_api';

@Component({
  selector: 'app-product-tabs',
  templateUrl: './product-tabs.component.html',
  styleUrls: ['./product-tabs.component.scss']
})
export class ProductTabsComponent implements OnInit {
  title: any = 'Add a new product';
  isActivetab: boolean;
  backToList() {
    this._router.navigateByUrl('/catalog/product');
    localStorage.removeItem('EditedRecord');
  }

  tabId: any = "1";
  onSelect(e: TabDirective) {
    this.tabId = e.id;
  }

  getActiveTab(route) {

  }

  //#region tabs routing
  goToInfo() {
    this.tabId = 1;
    this.getParameter();
    if (this.productId) {
      this._router.navigate(['catalog/addProduct/productInfo'], { queryParams: { id: this.productId } });
    } else {
      this._router.navigate(['catalog/addProduct/productInfo']);
    }
  }

  goToPicture() {
    this.tabId = 2;
    this.getParameter();
    if (this.productId) {
      this._router.navigate(['catalog/addProduct/productPicture'], { queryParams: { id: this.productId } });
    } else {
      this._router.navigate(['catalog/addProduct/productPicture']);
    }
  }

  goToAttribute() {
    this.tabId = 3;
    this.getParameter();
    if (this.productId) {
      this._router.navigate(['catalog/addProduct/productAttributes'], { queryParams: { id: this.productId } });
    } else {
      this._router.navigate(['catalog/addProduct/productAttributes']);
    }
  }

  goToSpecification() {
    this.tabId = 4;
    this.getParameter();
    if (this.productId) {
      this._router.navigate(['catalog/addProduct/productSpecificationAttr'], { queryParams: { id: this.productId } });
    } else {
      this._router.navigate(['catalog/addProduct/productSpecificationAttr']);
    }
  }
  //#endregion

  productId: any;
  getParameter() {
    this._route.queryParams.subscribe(params => {
      this.productId = params['id']
    });
  }
  constructor(private _router: Router,
    private _route: ActivatedRoute,
    private _cS: CommonService,
    private render: Renderer
  ) { }

  ngOnInit() {
    this.getParameter();
    this.goToInfo();
    var editedRecord = JSON.parse(localStorage.getItem('EditedRecord'));
    if (editedRecord) {
      if (this.productId != null) {
        this.title = `Edit product details - ${editedRecord.name}`;
      } else {
        this.title = 'Add a new product';
      }
    }
  }
}
