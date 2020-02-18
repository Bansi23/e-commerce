import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchProductComponent } from './search-product/search-product.component';
import { ProductTabsComponent } from './product-tabs/product-tabs.component';
import { AddnewAttributeComponent } from './productattributes/attributes/addnew-attribute/addnew-attribute.component';
import { ProductinfoComponent } from './productinfo/productinfo.component';
import { PicturesComponent } from './pictures/pictures.component';
import { AttributesComponent } from './productattributes/attributes/attributes/attributes.component';
import { SpecificationattributesComponent } from './specificationattributes/specificationattributes.component';
import { AttributeinfoComponent } from './productattributes/attributes/attributeinfo/attributeinfo.component';
import { AttributeValuesComponent } from './productattributes/attributes/attribute-values/attribute-values.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Catalog'
    },
    children: [
      { path: '', redirectTo: 'product', pathMatch: 'full' },
      { path: 'product', component: SearchProductComponent, data: { title: 'Product' } },
      {
        path: 'addProduct', component: ProductTabsComponent, data: { title: 'Create' },
        children: [
          { path: '', redirectTo: 'productInfo', pathMatch: 'full' },
          { path: 'productInfo', component: ProductinfoComponent },
          { path: 'productPicture', component: PicturesComponent },
          { path: 'productAttributes', component: AttributesComponent },
          { path: 'productSpecificationAttr', component: SpecificationattributesComponent },
        ]
      },
      {
        path: 'addnew-attribute', component: AddnewAttributeComponent, data: { title: 'Add New Attribute' },
        // children: [
        //   { path: '', redirectTo: 'info', pathMatch: 'full' },
        //   { path: 'info', component: AttributeinfoComponent },
        //   { path: 'value', component: AttributeValuesComponent },
        // ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
