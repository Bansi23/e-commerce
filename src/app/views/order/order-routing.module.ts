import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchOrderComponent } from './search-order/search-order.component';
import { OrdertabsComponent } from './ordertabs/ordertabs.component';
import { AddProductComponent } from './add-product/add-product.component';
import { EditBillingComponent } from './edit-billing/edit-billing.component';
import { EditShippingComponent } from './edit-shipping/edit-shipping.component';
import { SelectAddProductComponent } from './select-add-product/select-add-product.component';


const routes: Routes = [
  // {
  //   path: '',
  //   data: { title: 'Sales' },
  //   children: [
  //     { path: '', redirectTo: 'orders', pathMatch: 'full' },
  //     {
  //       path: 'orders', component: SearchOrderComponent, data: { title: 'Orders' },
  //       children: [
  //         { path: 'viewrecord', component: OrdertabsComponent, data: { title: 'View Record' } }
  //       ]
  //     },
  //   ]
  // }

  {
    path: '',
    data: { title: 'Sales' },
    children: [
      { path: '', redirectTo: 'orders', pathMatch: 'full' },
      { path: 'orders', component: SearchOrderComponent, data: { title: 'Orders' } },
      { path: 'viewrecord', component: OrdertabsComponent, data: { title: 'View Record' } },
      { path: 'addproduct', component: AddProductComponent, data: { title: 'Add Product' } },
      { path: 'editbilling', component: EditBillingComponent, data: { title: 'Edit Billing Address' } },
      { path: 'selectproduct', component: SelectAddProductComponent, data: { title: 'Add Product to order' } },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
