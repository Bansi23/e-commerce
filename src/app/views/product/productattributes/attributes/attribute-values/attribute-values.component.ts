import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { MockService } from '../../../../../services/mock.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from '../../../../../services/common.service';

@Component({
  selector: 'app-attribute-values',
  templateUrl: './attribute-values.component.html',
  styleUrls: ['./attribute-values.component.scss']
})
export class AttributeValuesComponent implements OnInit {
  @ViewChild('valuesModal', { static: false }) valuesModal: ModalDirective;
  @ViewChild('associateModal', { static: false }) public associateModal: ModalDirective;
  lstAttribute: any = [];
  tableHeader: any = ['Attribute value type', 'Name', 'Associated product', 'Price adjustment', 'Weight adjustment', 'Is pre-selected', 'Picture', 'Display order', 'Action']
  imageList: any = [];
  showValue() {
    this.valuesModal.show();
    this.attrValueForm.reset();
    this.changeValueType(0)
    this.attrValueForm.patchValue({
      valueType: 0,
    })
  }

  //#region bind list
  lstAttributeValue: any = [];

  getValueType() {
    this.lstAttributeValue = this._mS.getAttributeValueType();
  }
  //#endregion

  //#region form for add values
  attrValueForm: FormGroup;

  attrValueForm_fb() {
    this.attrValueForm = this.fb.group({
      valueType: [null],
      name: [null, Validators.required],
      priceAdj: [null, Validators.pattern("^[1-9]\d{0,7}(?:\.\d{1,4})?|\.\d{1,4}$")],
      isPriceAdd: [null],
      weightAdj: [null, Validators.pattern("^[1-9]\d{0,7}(?:\.\d{1,4})?|\.\d{1,4}$")],
      cost: [null, Validators.pattern("^[1-9]\d{0,7}(?:\.\d{1,4})?|\.\d{1,4}$")],
      isPreSelected: [null],
      displayOrder: [null],
      picture: [null],
      iscustEnter: [null],
      pQuantity: [null],
    });
  }

  changeValueType(ev) {
    var assProduct = <HTMLElement>document.querySelector('.associateType');
    var simple = <HTMLElement>document.querySelector('.simpleType');
    if (ev == 10) {
      if (assProduct) {
        assProduct.style.display = 'block';
        simple.style.display = 'none';
      }
    } else {
      assProduct.style.display = 'none';
      simple.style.display = 'block';
    }
  }

  isCustEnter(e) {
    var isCustEnterClass = <HTMLElement>document.querySelector('.isCustEnter');
    if (e.target.checked) {
      isCustEnterClass.style.display = 'none';
    } else {
      isCustEnterClass.style.display = 'block';
    }
  }

  associateProdList() {
    this.associateModal.show();
  }

  imageSrc: any;
  addAttributeValues() {
    for (let c in this.attrValueForm.controls) {
      this.attrValueForm.controls[c].markAsTouched();
    }
    if (this.attrValueForm.valid) {
      const formValue = this.attrValueForm.getRawValue();
      for (let i = 0; i < this.imageList.length; i++) {
        if (formValue.picture == this.imageList[i].id) {
          this.imageSrc = this.imageList[i].src;
        }
      }
      var body = {
        type_id: formValue.valueType,
        associated_product_id: this.filteredProduct.id,
        name: formValue.name ? formValue.name : null,
        price_adjustment: formValue.priceAdj ? formValue.priceAdj : null,
        weight_adjustment: formValue.weightAdj ? formValue.weightAdj : null,
        cost: formValue.cost ? formValue.cost : null,
        quantity: formValue.pQuantity ? formValue.pQuantity : null,
        is_pre_selected: formValue.isPreSelected ? formValue.isPreSelected : false,
        display_order: formValue.displayOrder ? formValue.displayOrder : null,
        product_image_id: formValue.picture ? formValue.picture : null,
      }
      if (this.attributeValueId) {
        for (let i = 0; i < this.lstAttrValue.length; i++) {
          if (this.attributeValueId == this.lstAttrValue[i].id) {
            body['id'] = this.attributeValueId;
            this.lstAttrValue[i] = body;
          }
        }
      } else {
        this.lstAttrValue.push(body);
      }
      // this._cS.getAttributeValues(this.lstAttrValue);
      this.attrValueForm.reset();
      this.valuesModal.hide();
    }
  }

  lstProduct: any = [];
  getProductList(lst) {
    this.lstProduct = lst;
  }

  associateProduct: any;
  filteredProduct: any = [];
  associatedProduct(productId) {
    this.associateModal.hide();
    this.filteredProduct = this.lstProduct.find(x => x.id == productId);
    this.associateProduct = this.filteredProduct.name;
  }

  lstAttrValue: any = [];
  getAttrValue() {
    const editedRecord = JSON.parse(localStorage.getItem('EditedRecord'));
    for (let i = 0; i < editedRecord.attributes.length; i++) {
      if (this.attributeId == editedRecord.attributes[i].id) {
        this.lstAttrValue = editedRecord.attributes[i].attribute_values;
      }
    }
  }

  editAttrValue(attrValueId) {
    this.attributeValueId = attrValueId;
    this.valuesModal.show();
    const editAttributeInfo = JSON.parse(localStorage.getItem('EditedRecord'));
    for (let i = 0; i < editAttributeInfo.attributes.length; i++) {
      for (let j = 0; j < editAttributeInfo.attributes[i].attribute_values.length; j++) {
        if (attrValueId == editAttributeInfo.attributes[i].attribute_values[j].id) {
          var attrValue = editAttributeInfo.attributes[i].attribute_values[j];
          console.log('attrValue:', attrValue)
          this.changeValueType(attrValue.type_id);
          this.attrValueForm.patchValue({
            valueType: attrValue.type_id,
            name: attrValue.name,
            priceAdj: attrValue.price_adjustment,
            isPriceAdd: false,
            weightAdj: attrValue.weight_adjustment,
            cost: attrValue.cost,
            isPreSelected: attrValue.is_pre_selected,
            displayOrder: attrValue.display_order,
            picture: attrValue.product_image_id,
            iscustEnter: attrValue.name,
            pQuantity: attrValue.quantity,
          })
        }
      }
    }
  }

  productId: any;
  attributeId: any;
  attributeValueId: any;
  getParameter() {
    this._route.queryParams.subscribe(params => {
      this.productId = params['id'];
      this.attributeId = params['attributeId'];
      this.attributeValueId = params['attrValueId']
    });
  }

  restrict(e) {
    this._cS.restrict(e);
  }
  //#endregion
  constructor(private _mS: MockService,
    private fb: FormBuilder,
    private _router: Router,
    private _cS: CommonService,
    private _route: ActivatedRoute) { }

  ngOnInit() {
    this.attrValueForm_fb();
    this.getValueType();
    this.getParameter();
    if (this.attributeId) {
      this.getAttrValue();
    }
    if (this.productId) {
      const editedRecord = JSON.parse(localStorage.getItem('EditedRecord'));
      if (editedRecord.images.length > 0) {
        this.imageList = editedRecord.images;
      }
    }
  }

}
