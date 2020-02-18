import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-attributecombination',
  templateUrl: './attributecombination.component.html',
  styleUrls: ['./attributecombination.component.scss']
})
export class AttributecombinationComponent implements OnInit {

  tableHeader: any = ['Attributes', 'Stock quantity', 'Allow out of stock', 'SKU', 'Manufacturer part number', 'GTIN',
    'Overridden price', 'Notify admin for quantity below', 'Picture', 'action']

  //#region add combination form
  @ViewChild('combinationModal', { static: true }) combinationModal: ModalDirective;
  showCombination() {
    this.combinationModal.show();
  }
  //#endregion
  constructor() { }

  ngOnInit() {
  }

}
