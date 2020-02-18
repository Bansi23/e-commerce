import { Component, OnInit, ViewChild } from '@angular/core';
import { MockService } from '../../../services/mock.service';
import { CommonService } from '../../../services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: 'app-order-info',
  templateUrl: './order-info.component.html',
  styleUrls: ['./order-info.component.scss']
})
export class OrderInfoComponent implements OnInit {

  //#region proprerty
  isOrder: boolean = true;
  lstOrderStatus: any = [];
  viewRecord: any = [];
  returnUrl: any;
  orderId: any;
  finalTotal: any;
  orderstatusForm: FormGroup;
  refunded_Amount: boolean = false;
  addrefund: FormGroup;
  partialAmount: any;
  totalrefundAmount: any;
  //#endregion

  @ViewChild('changeModal', { static: true }) refundedAmount: ModalDirective;

  //#region all methods
  changeStatus() {
    this.isOrder = false;
  }
  close() {
    this.refundedAmount.hide();
  }
  cancleEdit() {
    this.isOrder = true;
  }
  getParameter() {
    this._route.queryParams.subscribe(params => {
      this.orderId = params['id']
    });
  }
  //#endregion

  //#region get specific record
  profitTotal: any;
  getInfo() {
    this.getParameter();
    if (this.orderId) {
      this._cS.API_GET(this._cS.getOrderId(this.orderId))
        .subscribe(res => {
          if (res) {
            this.viewRecord = res.orders;
            for (let i = 0; i < this.viewRecord.length; i++) {
              const element = this.viewRecord[i].order_items;
              this.finalTotal = element.map(o => o.unit_price_excl_tax).reduce((a, c) => a + c, 0);
              this.partialAmount = this.finalTotal;
              //let TotalCostPrice = element.map(v => v["product"]["product_cost"]).reduce((a, c) => a + c, 0);
              let TotalCostPrice = element.map(x => x.product.product_cost).reduce((a, c) => a + c, 0)
              let TotalSellPrice = element.map(x => x.product.price).reduce((a, c) => a + c, 0)
              this.profitTotal = +TotalSellPrice - +TotalCostPrice;
              if (element == '') {
                this.finalTotal = this.viewRecord[i].order_subtotal_excl_tax;
               // this.profitTotal = '-';
              }
            }
          }
          else {
            err => {
              this._cS.displayToast(2, err);
            }
          }
        });
    }
  }
  //#endregion

  //#region  cancle order
  CancleOrder() {
    this.getParameter();
    var body = {
      order: {
        order_status: 'Cancelled',
        id: this.orderId
      }
    }
    if (confirm('Are you sure you want to Cancelled this record?')) {
      this._cS.API_PUT(this._cS.getOrderId(this.orderId), body)
        .subscribe(res => {
          if (res) {
            this.getInfo();
            this._cS.displayToast(1, 'SuccessFully cancelled order');
          } else {
            this._cS.displayToast(2, 'API response Error');
          };
        }, err => {
        });
    }

  }
  //#endregion

  //#region refund amount
  refundAmount() {
    this.getParameter();
    var body = {
      order: {
        payment_status: 'Refunded',
        id: +this.orderId,
        refunded_amount: this.finalTotal
      }
    }
    if (confirm('Are you sure you want to Refunded Amount of this record?')) {
      this._cS.API_PUT(this._cS.getOrderId(this.orderId), body)
        .subscribe(res => {
          if (res) {
            this.getInfo();
            this._cS.displayToast(1, 'SuccessFully refunded order amount');
          } else {
          };
        }, err => {
          this._cS.displayToast(2, 'Get Error');
        });
    }
  }
  //#endregion

  //#region paid amount
  paidAmount() {
    this.getParameter();
    var body = {
      order: {
        payment_status: 'Paid',
        id: +this.orderId
      }
    }
    if (confirm('Are you sure you want to perform this action??')) {
      this._cS.API_PUT(this._cS.getOrderId(this.orderId), body)
        .subscribe(res => {
          if (res) {
            this.getInfo();
            this._cS.displayToast(1, 'SuccessFully Updated payment status of this order');
          } else {
          };
        }, err => {
          this._cS.displayToast(err)
        });
    }
  }
  //#endregion

  //#region partial Refund amount
  partialRefundAmount() {
    this.refundedAmount.show();
    for (let i = 0; i < this.viewRecord.length; i++) {
      this.partialAmount = this.finalTotal - this.viewRecord[i].refunded_amount;
      break;
    }
    this.addrefund.reset();
  }
  //#endregion

  //#region API call partial Refund 
  saveRefund() {
    for (let val in this.addrefund.controls) {
      this.addrefund.controls[val].markAsTouched();
    };
    this.getParameter();
    for (let i = 0; i < this.viewRecord.length; i++) {
      var refunded = this.addrefund.get('refundedamount').value
      var finalAmount = +this.viewRecord[i].refunded_amount + +refunded;
      if (this.finalTotal == this.viewRecord[i].refunded_amount) {
        this.refundAmount();
      }
    }

    if (refunded <= this.partialAmount) {
      var body = {
        order: {
          payment_status: 'PartiallyRefunded',
          id: +this.orderId,
          refunded_amount: finalAmount
        }
      }
      if (this.addrefund.valid) {
        if (confirm('Are you sure you want to Refunded Amount of this record?')) {
          this._cS.API_PUT(this._cS.getOrderId(this.orderId), body)
            .subscribe(res => {
              if (res) {
                this.getInfo();
                this.refundedAmount.hide();
                this._cS.displayToast(1, 'SuccessFully refunded order amount');
              } else {
              };
            }, err => {
              this._cS.displayToast(2, 'Get Error');
            });
        }
      }
    }
    else {
      this.addrefund.get('refundedamount').setValue('');
      this._cS.displayToast(2, 'Max amount is ' + this.partialAmount + ' USD')
    }
  }
  //#endregion

  //#region order status
  saveOrderStatus() {
    this.getParameter();
    const orderstatus = this.orderstatusForm.get('orderStatus').value;
    var body = {
      order: {
        order_status: orderstatus,
        id: +this.orderId
      }
    }

    if (confirm('Are you sure you want to change order status?')) {
      this._cS.API_PUT(this._cS.getOrderId(this.orderId), body)
        .subscribe(res => {
          if (res) {
            this.getInfo();
            this._cS.displayToast(1, 'SuccessFully edit order status');
            this.cancleEdit();
          } else {
          };
        }, err => {
          this._cS.displayToast(1, err);
        });
    }
  }
  //#endregion

  //#region routing
  editCustomer(id, custid) {
    this._router.navigate(['/customers/addEdit'], { queryParams: { orderid: id, id: custid } });
  }
  //#endregion

  constructor(private _mD: MockService, private _cS: CommonService, private _router: Router, private _route: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit() {
    this.getInfo();
    this.lstOrderStatus = this._mD.orderStatus();
    this.orderstatusForm = this.fb.group({
      orderStatus: ['']
    });

    this.addrefund = this.fb.group({
      refundedamount: [null, Validators.compose([Validators.required, Validators.pattern('[0-9]\\d{0,50}')])],

    })
  }

}
