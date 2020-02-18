import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from './product-routing.module';
import { SearchProductComponent } from './search-product/search-product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductTabsComponent } from './product-tabs/product-tabs.component';
import { MyDatePickerModule } from 'mydatepicker';
import { SharedModule } from '../../shared/shared.module';
import { ProductinfoComponent } from './productinfo/productinfo.component';
import { PicturesComponent } from './pictures/pictures.component';
import { ProductattributesComponent } from './productattributes/productattributes.component';
import { SpecificationattributesComponent } from './specificationattributes/specificationattributes.component';
import { AttributesComponent } from './productattributes/attributes/attributes/attributes.component';
import { AddnewAttributeComponent } from './productattributes/attributes/addnew-attribute/addnew-attribute.component';
import { AttributeinfoComponent } from './productattributes/attributes/attributeinfo/attributeinfo.component';
import { AttributeValuesComponent } from './productattributes/attributes/attribute-values/attribute-values.component';
import { AssociateProdustListComponent } from './productattributes/attributes/associate-produst-list/associate-produst-list.component';
import { AttributecombinationComponent } from './productattributes/attributeCombinations/attributecombination/attributecombination.component';

@NgModule({
  declarations: [SearchProductComponent, ProductListComponent, ProductTabsComponent, ProductinfoComponent, PicturesComponent, ProductattributesComponent, SpecificationattributesComponent, AttributesComponent, AddnewAttributeComponent, AttributeinfoComponent, AttributeValuesComponent, AssociateProdustListComponent, AttributecombinationComponent],
  imports: [
    CommonModule,
    SharedModule,
    ProductRoutingModule,
  ]
})
export class ProductModule { }
