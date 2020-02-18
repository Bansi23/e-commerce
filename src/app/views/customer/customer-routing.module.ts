import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchCustomerComponent } from './search-customer/search-customer.component';
import { AddEditComponent } from './add-edit/add-edit.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { EditCustomerAddressComponent } from './edit-customer-address/edit-customer-address.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Customers'
    },
    children: [
      { path: '', redirectTo: 'customer' },
      { path: 'customer', component: SearchCustomerComponent, data: { title: 'Customer' } },
      { path: 'addEdit', component : AddEditComponent, data : { title : 'Add customer'}},
      { path : 'editCustomerAddress', component : EditCustomerAddressComponent, data : { title : 'Edit customer address'} }
       ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
