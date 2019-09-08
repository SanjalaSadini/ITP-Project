import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './shared/material.module';
import { routes } from './app.routing';


import {
  AgmCoreModule
} from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LandingComponent } from './landing/landing.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { UserComponent } from './user/user/user.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { AngularFireAuthModule  } from '@angular/fire/auth';
import { AngularFireStorage,AngularFireStorageReference,AngularFireUploadTask } from '@angular/fire/storage';
import { AuthService } from './auth/auth.service';
import { EmployeeManagementComponent } from './employee-management/employee-management.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { EmployeeService } from './shared/services/employee.service';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { SupplierComponent } from './supplier/supplier.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';

import { Ng2SearchPipeModule } from 'ng2-search-filter';


import { AngularFireStorageModule } from '@angular/fire/storage';
import { SupplierInvoicesComponent } from './supplier-invoices/supplier-invoices.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot() ,// ToastrModule added
    ReactiveFormsModule,
    HttpModule,
    MaterialModule,
    AngularFireAuthModule,
    ComponentsModule,
    RouterModule.forRoot(routes),
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    }),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    Ng2SearchPipeModule,
    AngularFireStorageModule 
  

  ],
  
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LandingComponent,
    SignUpComponent,
    SignInComponent,
    UserComponent,
    EmployeeManagementComponent,
    UserProfileComponent,
    EmployeeListComponent,
    SupplierComponent,
    EmployeeEditComponent,
    SupplierInvoicesComponent



  ],
  providers: [AuthService,EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
