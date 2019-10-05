import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LandingComponent } from './landing/landing.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { SignUpComponent} from './user/sign-up/sign-up.component';
import { EmployeeManagementComponent} from './employee-management/employee-management.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { SupplierComponent } from './supplier/supplier.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { SupplierInvoicesComponent } from './supplier-invoices/supplier-invoices.component';
import { NewOrderComponent } from './order-mgmt/new-order/new-order.component';
import {OrdersComponent} from './order-mgmt/orders/orders.component'
import {ViewOrderComponent} from './order-mgmt/view-order/view-order.component';
import {TrackOrderComponent} from './order-mgmt/track-order/track-order.component';
import {EditOrderComponent} from './order-mgmt/edit-order/edit-order.component';
import {OrderPaymentComponent} from './order-mgmt/order-payment/order-payment.component';
import { EmployeeDepartmentsComponent } from './employee-departments/employee-departments.component';
import { EmployeeReportsComponent } from './employee-reports/employee-reports.component';
import {OrderReportComponent} from './order-mgmt/order-report/order-report.component';

export const routes: Routes =[ 

  { path: 'supplier-invoices', component: SupplierInvoicesComponent,
  children: [{ path: 'supplier-invoices', component: SupplierInvoicesComponent }]
  },


  { path: 'supplier', component: SupplierComponent,
  children: [{ path: 'supplier', component: SupplierComponent }]
  },

  { path: 'employee-list', component: EmployeeListComponent,
  children: [{ path: 'employee-list', component: EmployeeListComponent }]
  },

  { path: 'employee-create', component: EmployeeManagementComponent,
  children: [{ path: 'employee-create', component: EmployeeManagementComponent }]
  },

  { path: 'employee-edit/:id', component: EmployeeEditComponent,
  //children: [{ path: 'employee-management/:id', component: EmployeeManagementComponent }]
  },

  { path: 'adminLayout', component: AdminLayoutComponent,
  children: [{ path: 'adminLayout', component: AdminLayoutComponent }]
  },
  
  { path: 'signIn', component: SignInComponent,
    children: [{ path: 'signIn', component: SignInComponent }]  
  },

  { path: 'signup', component: SignUpComponent,
    children: [{ path: 'signup', component: SignUpComponent }]
  },
  
  { path: '', redirectTo: 'index', pathMatch: 'full'},
  { path: 'index', component: LandingComponent },

  { path: 'order', component: NewOrderComponent,
    children: [{ path: 'new-order', component: NewOrderComponent }]
  },

  { path: 'orders', component: OrdersComponent,
    children: [{ path: 'orders', component: OrdersComponent }]
  },
  { path: 'view-order', component: ViewOrderComponent,
    children: [{ path: 'view-order', component: ViewOrderComponent }]
  },
  { path: 'order-track', component: TrackOrderComponent,
    children: [{ path: 'track-order', component: TrackOrderComponent }]
  },
  { path: 'edit-order', component: EditOrderComponent,
    children: [{ path: 'edit-order', component: EditOrderComponent }]
  },
  { path: 'order-payment/:id', component: OrderPaymentComponent,
    // children: [{ path: 'order-payment', component: OrderPaymentComponent }]
  },//department_reports
  { path: 'department_reports/:name', component: EmployeeDepartmentsComponent,
  },
  { path: 'employee_reports', component: EmployeeReportsComponent,
  },
  { path: 'order-report', component: OrderReportComponent,
    children: [{ path: 'order-report', component: OrderReportComponent }]
  },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
       useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
