import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MockService } from '../../../services/mock.service';
import { CommonService } from '../../../services/common.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-specificationattributes',
  templateUrl: './specificationattributes.component.html',
  styleUrls: ['./specificationattributes.component.scss']
})
export class SpecificationattributesComponent implements OnInit {

  tableHeader: any = ['Attribute type	', 'Attribute', 'Value', 'Allow filtering', 'Show on product page', 'Display order', 'action'];
  lstAttributeType: any = [];
  pageIndex: number = 1;
  pageSize: number = 10;
  totalRecords: number;
  lstAttrSpecification: any = [];
  pageChanged(value) {
    this.pageIndex = +value;
    this.getSpecificAttrList();
  };

  changePageSize(value) {
    this.pageIndex = 1;
    this.pageSize = value;
    this.getSpecificAttrList();
  }
  specificationForm: FormGroup;

  specificationForm_fb() {
    this.specificationForm = this.fb.group({
      attrType: [null],
      attr: [null],
      attrOption: [null],
      allowFilter: [null],
      showOnProd: [null],
      displayOrder: [null],
    })
  }

  //#region bind static list
  lstAttrType: any = [];
  lstAttr: any = [];
  lstAttrOptions: any = [];
  attrOptions: any = [];
  bindList() {
    this.lstAttrType = this._mS.getAttributeType();
    this.lstAttr = this._mS.getAttribute();
    this.attrOptions = this._mS.getAttributeOptions();
  }

  getAttrOptions(value) {
    var filter = this.attrOptions.filter(x => x.aId == value);
    this.lstAttrOptions = filter;
  }

  displayValue(value) {
    const optionValue = <HTMLElement>document.querySelector('.optionvalue');
    const textValue = <HTMLElement>document.querySelector('.textValue');
    if (value == 1) {
      optionValue.style.display = "block";
      textValue.style.display = "none";
    } else {
      optionValue.style.display = "none";
      textValue.style.display = "block";
    }
  }
  //#endregion

  //#region get specification attribute list
  productId: any;
  getParameter() {
    this._route.queryParams.subscribe(params => {
      this.productId = params['id']
    });
  }
  addAttribute() {
    this._cS.displayToast(3, 'Under development due to api issue!');
    const formValue = this.specificationForm.getRawValue();
    //   var body = {
    //     "id": 42,
    //     "product_id": 67,
    //     "attribute_type_id": 0,
    //     "specification_attribute_option_id": 1,
    //     "custom_value": null,
    //     "allow_filtering": false,
    //     "show_on_product_page": true,
    //     "display_order": 0,
    //     "attribute_type": "Option",
    //     "specification_attribute_option": {
    //       "id": 1,
    //       "specification_attribute_id": 1,
    //       "name": "13.0''",
    //       "color_squares_rgb": null,
    //       "display_order": 2
    //   }
  }

  lstSpecificAttr: any = [];
  getSpecificAttrList() {
    var editedRecord = JSON.parse(localStorage.getItem('EditedRecord'));
    if (editedRecord.product_specification_attributes.length > 0) {
      this.lstSpecificAttr = editedRecord.product_specification_attributes;
      this.totalRecords = this.lstSpecificAttr.length;
    }
  }

  editSpecification() {
    this._cS.displayToast(3, 'Under development due to api issue!');
  }

  deleteSpecification() {
    this._cS.displayToast(3, 'Under development due to api issue!');
  }
  //#endregion
  constructor(private fb: FormBuilder,
    private _mS: MockService,
    private _cS: CommonService,
    private _route: ActivatedRoute) { }

  ngOnInit() {
    this.getParameter();
    const showContenet = <HTMLElement>document.querySelector('.showContenet');
    const hideContent = <HTMLElement>document.querySelector('.hideContent');
    if (this.productId) {
      hideContent.style.display = 'none';
      showContenet.style.display = 'block';
      this.getSpecificAttrList();
    } else {
      if (showContenet) {
        showContenet.style.display = 'none';
        hideContent.style.display = 'block';
      }
    }
    this.specificationForm_fb();
    this.bindList();
    this.getAttrOptions("1");
    this.specificationForm.patchValue({
      attrType: 1,
      attr: 1,
      attrOption: 1,
    });
  }

}
