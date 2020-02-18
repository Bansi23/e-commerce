import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../../services/common.service';
import { MockService } from '../../../services/mock.service';
declare var $: any;
@Component({
  selector: 'app-productinfo',
  templateUrl: './productinfo.component.html',
  styleUrls: ['./productinfo.component.scss']
})

export class ProductinfoComponent implements OnInit {
  // @ViewChild('infoForm', { static: true }) infoForm: ElementRef;

  //#region product info form
  productInfoForm: FormGroup;

  productInfoForm_fb() {
    this.productInfoForm = this.fb.group({
      id: [null],
      productName: [null, Validators.required],
      shortDescription: [null],
      fullDescription: [null],
      sku: [null],
      inventoryMethod: [null],
      stockQuantity: [null, Validators.pattern("^[1-9]\d{0,7}(?:\.\d{1,4})?|\.\d{1,4}$")],
      shippingEnable: [null],
      weight: [null, Validators.pattern("^[1-9]\d{0,7}(?:\.\d{1,4})?|\.\d{1,4}$")],
      length: [null, Validators.pattern("^[1-9]\d{0,7}(?:\.\d{1,4})?|\.\d{1,4}$")],
      width: [null, Validators.pattern("^[1-9]\d{0,7}(?:\.\d{1,4})?|\.\d{1,4}$")],
      height: [null, Validators.pattern("^[1-9]\d{0,7}(?:\.\d{1,4})?|\.\d{1,4}$")],
      categories: [null],
      price: [null, Validators.compose([Validators.required, Validators.pattern("^[1-9]\d{0,7}(?:\.\d{1,4})?|\.\d{1,4}$")])],
      productCost: [null, Validators.compose([Validators.required, Validators.pattern("^[1-9]\d{0,7}(?:\.\d{1,4})?|\.\d{1,4}$")])],
      discount: [null],
      tax: [null],
      taxCategory: [null]
    });
    this.productInfoForm.get('sku').valueChanges.subscribe(
      res => {
        const duplicateMessage = <HTMLElement>document.querySelector('.duplicateMessage');
        for (let i = 0; i < this.lstProduct.length; i++) {
          if (res == this.lstProduct[i].sku) {
            duplicateMessage.style.display = 'block';
            this.productInfoForm.get('sku').setValue(null);
          } else {
            duplicateMessage.style.display = 'none';
          }
        }
      }
    )
  }
  //#endregion

  //#region get product lsit 
  lstProduct: any = [];
  getProductList() {
    this._cS.API_GET(this._cS.getProductList())
      .subscribe(res => {
        this.lstProduct = res.products;
      })
  }
  //#endregion

  //#region static lists
  lstInvantory: any = [];
  lstDiscount: any = [];
  lstTaxCategory: any = [];
  bindStaticList() {
    this.lstInvantory = this._mS.getInvantoryMethods();
    this.lstDiscount = this._mS.getDiscountList();
    this.lstTaxCategory = this._mS.getTaxCategory();
    this.productInfoForm.patchValue({
      inventoryMethod: 1,
      taxCategory: 0
    })
  }

  changeInventory(value) {
    const stockQuan = <HTMLElement>document.querySelector('.stockQuan');
    if (stockQuan) {
      if (value == "1") {
        stockQuan.style.display = 'block';
      } else {
        stockQuan.style.display = 'none';
      }
    }
  }
  //#endregion

  //#region dropdownProductDiscount multi select
  dropdownProductDiscount = {
    singleSelection: false,
    text: "Select Discount",
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    enableSearchFilter: true,
    classes: "myclass custom-class",
    badgeShowLimit: 1,
    maxHeight: 200
  }
  lstCategories: any = [];
  selectedCategories: any = [];
  //#endregion

  //#region fuctions
  isShipping(ev) {
    const drpClass = <HTMLElement>document.querySelector('.isShipping');
    if (drpClass) {
      if (ev) {
        drpClass.style.display = 'block';
      } else {
        drpClass.style.display = 'none';
      }
    }
  }

  isTaxExempt(ev) {
    const drpClass = <HTMLElement>document.querySelector('.isTax');
    if (drpClass) {
      if (!ev.target.checked) {
        drpClass.style.display = 'block';
      } else {
        drpClass.style.display = 'none';
      }
    }
  }

  restrict(e) {
    this._cS.restrict(e);
  }

  getCategoryList() {
    this._cS.API_GET(this._cS.URL_getCategoryList())
      .subscribe(res => {
        if (res) {
          this.lstCategories = res.categories;
          this.lstCategories.map(x => {
            x.itemName = x.name
          });
        }
      })
  }

  multiSelectedOptions() {
    this.lstCategories.map(x => {
      this.selectedCategories.push(x.id, x.itemName);
    });
    this.lstDiscount.map(x => {
      this.selectedDiscount.push(x);
    });
    this.productInfoForm.get('categories').setValue(this.selectedCategories);
    this.productInfoForm.get('discount').setValue(this.selectedDiscount);
  }

  onProductCatSelect(value) {
    // const selectedData = this.selectedCategories.map((x: { itemName: any; }) => { return x.itemName });
    // var filtered = this.lstCategories.filter(
    //   function (e) { return this.indexOf(e.name) != -1; }, selectedData);
    // this.lstCategories = filtered;
  }

  selectedDiscount: any = [];
  onDiscountSelect(value) {
    // const selectedData = this.selectedDiscount.map((x: { itemName: any; }) => { return x.itemName });
    // var filtered = this.lstDiscount.filter(
    //   function (e) { return this.indexOf(e.itemName) != -1; }, selectedData);
    // this.lstDiscount = filtered;
  }
  //#endregion

  //#region create product
  productInfoValue: any;
  disc_ids: any = [];
  createProduct() {
    for (let c in this.productInfoForm.controls) {
      this.productInfoForm.controls[c].markAsTouched();
    }
    if (this.productInfoForm.valid) {
      const formValue = this.productInfoForm.getRawValue();
      if (formValue.discount) {
        for (let i = 0; i < formValue.discount.length; i++) {
          var discount = formValue.discount[i].id;
          this.disc_ids.push(discount);
        }
      }
      var body = {
        product: {
          name: formValue.productName,
          short_description: formValue.shortDescription ? formValue.shortDescription : "",
          sku: formValue.sku ? formValue.sku : "",
          manage_inventory_method_id: formValue.inventoryMethod ? formValue.inventoryMethod : 1,
          stock_quantity: formValue.stockQuantity ? formValue.stockQuantity : 0,
          discount_ids: this.disc_ids ? this.disc_ids : null,
          price: formValue.price ? formValue.price : 0,
          product_cost: formValue.productCost ? formValue.productCost : 0,
          weight: formValue.weight ? formValue.weight : 0,
          length: formValue.length ? formValue.length : 0,
          width: formValue.width ? formValue.width : 0,
          height: formValue.height ? formValue.width : 0
        }
      }
      if (this.productId) {
        this._cS.editProduct(body);
      } else {
        this._cS.sendForCreate(body);
      }
    }
  }
  //#endregion

  //#region saveProductDetails & save and countinu edit 
  saveProductDetails() {
    for (let c in this.productInfoForm.controls) {
      this.productInfoForm.controls[c].markAsTouched();
    }
    if (this.productInfoForm.valid) {
      this.createProduct();
      this.productInfoForm.reset();
      this._router.navigateByUrl('catalog/product');
    }
  }

  saveAndEditProduct() {
    this.createProduct();
  }
  //#region 

  //#region  edit product details
  editedProduct: any = [];
  editProduct() {
    var editedRecord = JSON.parse(localStorage.getItem('EditedRecord'));
    this._cS.API_GET(this._cS.URL_getProductById(this.productId))
      .subscribe(res => {
        if (res) {
          this.isShipping(editedRecord.is_ship_enabled);
          this.productInfoForm.patchValue({
            id: this.productId,
            productName: editedRecord.name ? editedRecord.name : '',
            shortDescription: editedRecord.short_description ? editedRecord.short_description : '',
            fullDescription: editedRecord.full_description ? editedRecord.full_description : '',
            sku: editedRecord.sku ? editedRecord.sku : '',
            inventoryMethod: editedRecord.manage_inventory_method_id ? editedRecord.manage_inventory_method_id : 1,
            stockQuantity: editedRecord.stock_quantity ? editedRecord.stock_quantity : 0,
            shippingEnable: editedRecord.is_ship_enabled ? editedRecord.is_ship_enabled : true,
            weight: editedRecord.weight ? editedRecord.weight : 0,
            length: editedRecord.length ? editedRecord.length : 0,
            width: editedRecord.width ? editedRecord.width : 0,
            height: editedRecord.height ? editedRecord.height : 0,
            // categories: editedRecord.categories ? editedRecord.categories : '',
            price: editedRecord.price ? editedRecord.price : 0,
            productCost: editedRecord.product_cost ? editedRecord.product_cost : 0,
            // discount: editedRecord.discount_ids ? editedRecord.discount_ids : 0,
            tax: editedRecord.is_tax_exempt ? editedRecord.is_tax_exempt : true,
          })
        }
      });
  }

  productId: any;
  getParameter() {
    this._route.queryParams.subscribe(params => {
      this.productId = params['id']
    });
  }
  //#endregion
  constructor(private fb: FormBuilder,
    private _mS: MockService,
    private _cS: CommonService,
    private _router: Router,
    private _route: ActivatedRoute) { }

  ngOnInit() {
    this.getParameter();
    this.getProductList();
    this.productInfoForm_fb();
    this.bindStaticList();
    this.getCategoryList();
    //this.multiSelectedOptions();
    if (this.productId) {
      this.editProduct();
    }
  }
}
