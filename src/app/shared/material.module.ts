import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../app.routing';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatLabel, MatHint, MatListModule, MatSelectModule, MatRadioButton, MatRadioModule, MatCheckboxModule, MatDatepickerModule, MatNativeDateModule, MatSnackBarModule,MatTabsModule, MatMenuModule,MatToolbarModule, } from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AppRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatTabsModule,
    MatMenuModule,
    MatToolbarModule,
    BrowserAnimationsModule,   
    ToastrModule.forRoot({ 
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
  ],
  exports: [
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatTabsModule,
    MatMenuModule,
    MatToolbarModule,
    BrowserAnimationsModule,   
    ToastrModule
  ]
})
export class MaterialModule { }
