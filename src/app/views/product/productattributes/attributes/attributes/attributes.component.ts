import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from '../../../../../services/common.service';

@Component({
  selector: 'app-attributes',
  templateUrl: './attributes.component.html',
  styleUrls: ['./attributes.component.scss']
})
export class AttributesComponent implements OnInit {

  tableHeader: any = ['Attribute', 'Text prompt', 'Is Required', 'Control type', 'Display order', 'Action']
  pageIndex: number = 1;
  pageSize: number = 10;
  totalRecords: number;

  pageChanged(value) {
    this.pageIndex = +value;
    this.getAttributeList();
  };

  changePageSize(value) {
    this.pageIndex = 1;
    this.pageSize = value;
    this.getAttributeList();
  }
  //#region bind attribute list when edit
  lstAttr: any = [];
  getAttributeList() {
    var editedRecord = JSON.parse(localStorage.getItem('EditedRecord'));
    if (editedRecord.attributes.length > 0) {
      this.lstAttr = editedRecord.attributes;
      this.totalRecords = this.lstAttr.length;
    }
  }

  productId: any;
  getParameter() {
    this._route.queryParams.subscribe(params => {
      this.productId = params['id']
    });
  }
  //#endregion  

  reloadAttribute() {
    this._cS.API_GET(this._cS.URL_getProductById(this.productId))
      .subscribe(res => {
        this.lstAttr = res.products[0].attributes;
        this.totalRecords = this.lstAttr.length;
      })
  }
  addAttributes() {
    this.getParameter();
    if (this.productId) {
      this._router.navigate(['/catalog/addnew-attribute'], { queryParams: { id: this.productId } })
    } else {
      this._router.navigate(['/catalog/addnew-attribute'])
    }
  }

  //#region edit attribute
  editAttribute(attrId) {
    this._router.navigate(['/catalog/addnew-attribute'], { queryParams: { id: this.productId, attributeId: attrId } })
  }
  //#endregion

  constructor(private _router: Router,
    private _route: ActivatedRoute,
    private _cS: CommonService) { }
  ngOnInit() {
    this.getParameter();
    const showContenet = <HTMLElement>document.querySelector('.showContenet');
    const hideContent = <HTMLElement>document.querySelector('.hideContent');
    if (this.productId) {
      hideContent.style.display = 'none';
      showContenet.style.display = 'block';
      this.getAttributeList();
      this.reloadAttribute();
    } else {
      if (showContenet) {
        showContenet.style.display = 'none';
        hideContent.style.display = 'block';
      }
    }

  }

}
