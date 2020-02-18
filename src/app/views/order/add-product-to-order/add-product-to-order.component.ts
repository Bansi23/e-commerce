import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from '../../../services/common.service';
import { ModalDirective } from 'ngx-bootstrap';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-product-to-order',
  templateUrl: './add-product-to-order.component.html',
  styleUrls: ['./add-product-to-order.component.scss']
})
export class AddProductToOrderComponent implements OnInit {

  //#region proprerty
  orderId: any;
  viewRecord: any = [];
  orderRecord: any = [];
  updateIndex = 1;
  itemForm: FormGroup;
  orderlst: any = [];
  giftWrapping: any;
  //#endregion

  @ViewChild('editItem', { static: true }) EditRecord: ModalDirective;
  tableHeader: any = ['Picture', 'Product name', 'Price', 'Quantity', 'Discount', 'Total', 'Action'];

  fbItemEdit() {
    this.itemForm = this.fb.group({
      id: [null],
      unitexclprice: [null, Validators.compose([Validators.required, Validators.pattern('[0-9]\\d{0,50}')])],
      unitinclprice: [null, Validators.compose([Validators.required, Validators.pattern('[0-9]\\d{0,50}')])],
      quantity: [null, Validators.compose([Validators.required, Validators.pattern('[0-9]\\d{0,50}')])],
      incldiscount: [null, Validators.compose([Validators.required, Validators.pattern('[0-9]\\d{0,50}')])],
      excldiscount: [null, Validators.compose([Validators.required, Validators.pattern('[0-9]\\d{0,50}')])],
      incltotal: [null, Validators.compose([Validators.required, Validators.pattern('[0-9]\\d{0,50}')])],
      excltotal: [null, Validators.compose([Validators.required, Validators.pattern('[0-9]\\d{0,50}')])],
      img: [null],
      productName: ['']
    });
  }
  getParemeter() {
    this._route.queryParams.subscribe(params => {
      this.orderId = params['id']
    });
  }

  getItem() {
    this.getParemeter();
    if (this.orderId) {
      this._cS.API_GET(this._cS.getOrderItem(this.orderId))
        .subscribe(response => {
          if (response) {
            this.orderRecord = response.order_items;
          }
          else {
            this._cS.displayToast(2, 'Error in response');
          }
        });
    }
  }
  getOrder() {
    this.getParemeter();
    if (this.orderId) {
      this._cS.API_GET(this._cS.getOrderId(this.orderId))
        .subscribe(response => {
          if (response) {
            this.orderlst = response.orders;
          }
          else {
            this._cS.displayToast(2, 'Error in response');
          }
        });
    }
  }

  DeleteRecord(itemid) {
    if (confirm('Are you sure you want to delete this record?')) {
      this._cS.API_DELETE(this._cS.getOrderItemId(this.orderId, itemid))
        .subscribe(res => {
          if (res) {
            this._cS.displayToast(1, 'SuccessFully Deleted Record');
            this.getItem();
          } else {
            this._cS.displayToast(2, 'This order item has an associated gift card record. Please delete it first');
          };
        }, err => {
          if (err.status == 400) {
            this._cS.displayToast(2, 'This order item has an associated gift card record. Please delete it first');
          }
          //this._cS.displayToast(2, err.toString());
        });
    }
  }

  saveRecord() {
    this.getParemeter();
    const formValue = this.itemForm.value;
    let body = {
      order_item: {
        "quantity": +this.itemForm.value.quantity,
        "unit_price_incl_tax": +this.itemForm.value.unitinclprice,
        "unit_price_excl_tax": +this.itemForm.value.unitexclprice,
        "price_incl_tax": +this.itemForm.value.incltotal,
        "price_excl_tax": +this.itemForm.value.excltotal,
        "discount_amount_incl_tax": this.itemForm.value.incldiscount,
        "discount_amount_excl_tax": this.itemForm.value.excldiscount,
        "id": +this.itemForm.value.id
      }
    }

    this._cS.API_PUT(this._cS.getOrderItemId(this.orderId, formValue.id), body)
      .subscribe(response => {
        if (response) {
          this.close();
          this.getItem();
          this._cS.displayToast(1, 'SuccessFully Edit Record');
        }
        else {
          this._cS.displayToast(2, 'Error in response');
        }
      })
  }
  lstProduct: any = [];
  GotoProduct(id) {
    this._cS.API_GET(this._cS.URL_getProductById(id))
      .subscribe(res => {
        if (res) {
          this.lstProduct = res.product;
          if (id) {
            this._router.navigate(['/catalog/addProduct'], { queryParams: { id: id } });
          }
        }
      }, err => {
        if (err.status == 404) {
          this._cS.displayToast(2, 'This order item was deleted in product so can not editable in product.');
          this._cS.Display_Loader(false);
        }
      });
  }

  editRecord(row) {
    this.itemForm.patchValue({
      id: row.id,
      unitexclprice: row.unit_price_excl_tax,
      unitinclprice: row.unit_price_incl_tax,
      quantity: row.quantity,
      excldiscount: row.discount_amount_excl_tax,
      incldiscount: row.discount_amount_incl_tax,
      excltotal: row.price_excl_tax,
      incltotal: row.price_incl_tax,
      img: row.product.name,
      productName: row.product.name
    });
    this.EditRecord.show();
  }
  close() {
    this.EditRecord.hide();
  }

  addProduct() {
    this._route.queryParams.subscribe(params => {
      this.orderId = params['id']
    });
    this._router.navigate(['/sales/addproduct'], { queryParams: { id: this.orderId } });
  }
  constructor(private _router: Router, private _route: ActivatedRoute, private _cS: CommonService, private fb: FormBuilder) { }
  ngOnInit() {
    this.fbItemEdit();
    this.getItem();
    this.getOrder();
  }
}
