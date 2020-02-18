import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../services/common.service';
import { MockService } from '../../../services/mock.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IMyDpOptions } from 'mydatepicker';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

const emailPattern = environment.emailPattern;
@Component({
  selector: 'app-search-order',
  templateUrl: './search-order.component.html',
  styleUrls: ['./search-order.component.scss']

})
export class SearchOrderComponent implements OnInit {
  //#region proprerty
  lstOrderStatus: any = [];
  lstPaymentStatus: any = [];
  lstShippingStatus: any = [];
  lstvender: any = [];
  lstpaymentMethod: any = [];
  searchOrder: FormGroup;
  selectedorderItems: any = [];
  selectedpaymentItems: any = [];
  selectedshippingItem: any = [];
  lstOrderData: any = [];
  lstCountry: any = [];
  pageIndex: number = 1;
  pageSize: number = 10;
  selectAll: boolean = false;
  finalTotal: any;
  totalRecord: any;
  //#endregion

  //#region dropdown static Data
  dropdownOrderStatus = {
    singleSelection: false,
    text: "Select Order Status",
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    enableSearchFilter: true,
    classes: "myclass custom-class",
    badgeShowLimit: 1,
    maxHeight: 200
  };

  dropdownPaymentStatus = {
    singleSelection: false,
    text: "Select Payment Status",
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    enableSearchFilter: true,
    classes: "myclass custom-class",
    badgeShowLimit: 1,
    maxHeight: 200
  };

  dropdownShippingStatus = {
    singleSelection: false,
    text: "Select Shipping Status",
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    enableSearchFilter: true,
    classes: "myclass custom-class",
    badgeShowLimit: 1,
    maxHeight: 200
  };
  //#endregion

  //#region datepicker
  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'dd/mm/yyyy',
    openSelectorOnInputClick: true,
    editableDateField: false
  };
  //#endregion

  tableHeader: any = ['View', 'Order#', 'Order status', 'Payment status', 'Shipping Status', 'Customer', 'Created on', 'Order total',];
  //#region form group
  fbSearchOrder() {
    this.searchOrder = this.fb.group({
      sdate: [''],
      venderRec: [''],
      edate: [''],
      phone_number: ['', Validators.pattern('[0-9]\\d{0,15}')],
      productnm: [''],
      mail: ['', Validators.pattern(emailPattern)],
      orderstatus: [''],
      billingAdd: [''],
      paymentstatus: [''],
      country: [''],
      shippingstatus: [''],
      paymentMethod: [''],
      ordernote: [''],
      orderno: ['', Validators.pattern('[0-9]\\d{0,50}')]
    });
  }
  //#endregion

  //#region Get API order list
  GetRecord() {
    // const paymentStatus = this.searchOrder.get('paymentstatus').value;
    // const shippingStatus = this.searchOrder.get('shippingstatus').value;
    // const orderStatus = this.searchOrder.get('orderstatus').value;
    // this._cS.Display_Loader(true);
    // this._cS.API_GET(this._cS.getsearchRecord(paymentStatus, orderStatus, shippingStatus, this.pageSize, this.pageIndex))
    //   .subscribe(res => {
    //     // this.pageIndex = 1;
    //     if (res) {
    //       this.lstOrderData = res.orders;
    //       // this.totalRecord = this.lstOrderData.length;
    //       this.finalTotal = this.lstOrderData.map(o => o.order_total).reduce((a, c) => a + c, 0);
    //     }
    //     else {
    //       err => {
    //         if (err.status == 400) {
    //           this._cS.displayToast(2, "Record not found");
    //           this._router.navigate(['/sales/order']);
    //         }
    //       }
    //     }
    //   });


    this._cS.API_GET(this._cS.getOrderList(this.pageSize, this.pageIndex))
      .subscribe(res => {
        // this.pageIndex = 1;
        if (res) {
          this.lstOrderData = res.orders;
          this.GetCountRecord();
          this.finalTotal = this.lstOrderData.map(o => o.order_total).reduce((a, c) => a + c, 0);
        }
        else {
          err => {
            if (err.status == 400) {
              this._cS.displayToast(2, "Record not found");
              this._router.navigate(['/sales/order']);
            }
          }
        }
      });
  }
  //#endregion

  //#region Get API order count
  GetCountRecord() {
    this._cS.API_GET(this._cS.getCountItem())
      .subscribe(res => {
        if (res) {
          this.totalRecord = res.count;
        }
        else {
          err => {
            if (err.status == 400) {
              this._cS.displayToast(2, "Record not found");
            }
            else {
              this._cS.displayToast(2, err);
            }
          }
        }
      });
  }

  //#endregion
  //#region common method
  getSearchListRecord() {
    const paymentStatus = this.searchOrder.get('paymentstatus').value;
    const shippingStatus = this.searchOrder.get('shippingstatus').value;
    const orderStatus = this.searchOrder.get('orderstatus').value;
    if (paymentStatus == '' && shippingStatus == '' && orderStatus == '') {
      this.GetRecord();
    }
    else if (paymentStatus != '' && shippingStatus == '' && orderStatus == '') {
      this.searchRecord();
    }
    else if (paymentStatus == '' && shippingStatus != '' && orderStatus == '') {
      this.searchRecord();
    }
    else if (paymentStatus == '' && shippingStatus == '' && orderStatus != '') {
      this.searchRecord();
    }
    else {
      this.searchRecord();
    }
  }
  //#endregion
  //#region pagignation and select page size

  pageChanged(value) {
    this.pageIndex = +value;
    this.getSearchListRecord();
    //this.GetRecord();
  }


  selectedChanged(value) {
    this.pageIndex = 1;
    this.pageSize = +value;
    this.getSearchListRecord();
    //this.GetRecord();
  }
  //#endregion

  //#region Get API search order
  searchRecord() {
    const paymentStatus = this.searchOrder.get('paymentstatus').value;
    const shippingStatus = this.searchOrder.get('shippingstatus').value;
    const orderStatus = this.searchOrder.get('orderstatus').value;
    this._cS.API_GET(this._cS.getsearchRecord(paymentStatus, orderStatus, shippingStatus))
      .subscribe(res => {
        this.pageIndex = 1;
        if (res) {
          this.lstOrderData = res.orders;
          this.totalRecord = this.lstOrderData.length;
          this.finalTotal = this.lstOrderData.map(o => o.order_total).reduce((a, c) => a + c, 0);
        }
        else {
          this._cS.displayToast(2, 'Not found ')
        }
      });
  }
  //#endregion

  //#region select check box
  select_all() {
    for (let i = 0; i < this.lstOrderData.length; i++) {
      this.lstOrderData[i].select = this.selectAll;
    };
  }
  checkIfAllSelected() {
    this.selectAll = this.lstOrderData.every(function (item: any) {
      return item.select == true;
    });
  }
  //#endregion


  ViewData(index) {
    this._router.navigate(['/sales/viewrecord'], { queryParams: { id: index } });
  }

  //#region Go through ID
  goDirectlyOrder() {
    const index = this.searchOrder.get('orderno').value;
    this._cS.API_GET(this._cS.getOrderId(index))
      .subscribe(res => {
        if (res) {
          if (index != '') {
            this._router.navigate(['/sales/viewrecord'], { queryParams: { id: index } });
          }
          else if(index == ''){
            this._cS.displayToast(2, 'please enter order number');
            this._cS.Display_Loader(false);
          }
        }
      }, err => {
        if (err.status == 404) {
          this._cS.displayToast(2, 'This record is not found.');
          this._cS.Display_Loader(false);
        }
        if (err.status == 400) {
          this._cS.displayToast(2, 'Valid only digit')
          this._cS.Display_Loader(false);
        }
      });
  }
  //#endregion

  //#region static list moke data
  StaticList() {
    this.lstOrderStatus = this.__mD.orderStatus();
    this.lstPaymentStatus = this.__mD.paymentStatus();
    this.lstShippingStatus = this.__mD.shippingStatus();
    this.lstCountry = this.__mD.countryList();
  }
  //#endregion

  constructor(private _cS: CommonService, private __mD: MockService, private fb: FormBuilder, private _router: Router) { }

  ngOnInit() {
    this.fbSearchOrder();
    this.GetRecord();
    this.StaticList();
    // this.GetCountRecord();
    this.lstOrderData.map(x => { x.select = false });
  }
}
