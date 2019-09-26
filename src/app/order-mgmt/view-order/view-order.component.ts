import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, FormBuilder, Validators, FormGroup, AbstractControl} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';
import {AuthService} from 'app/auth/auth.service';
import {ToastrService} from 'ngx-toastr';
import {AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask} from '@angular/fire/storage';
import {Order} from 'app/shared/services/order/order.model';
import {PlaceOrder} from 'app/shared/services/order/placeOrder.model';
import {DressType} from 'app/shared/services/order/dressType.model';
import {FabricProducts} from 'app/shared/services/order/fabricProducts.model';
import {MaterialType} from 'app/shared/services/order/materialType.model';
import {Employee} from 'app/shared/services/employee.model';
import {OrderRequire} from 'app/shared/services/order/orderRequires.model';
import {DatePipe} from '@angular/common';
import {OrderView} from 'app/shared/services/order/orderView.model';
import {OrderService} from 'app/shared/services/order/order.service';
import {OrderPreDataService} from 'app/shared/services/order/orderPreData.service';
import {DataHolder} from '../../shared/services/order/dataHolder.model';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
    selector: 'app-view-order',
    templateUrl: './view-order.component.html',
    styleUrls: ['./view-order.component.css'],
    providers: [DatePipe]
})
export class ViewOrderComponent implements OnInit {
    ref: AngularFireStorageReference;
    task: AngularFireUploadTask;

    order: OrderView

    constructor(private firestore: AngularFirestore,
                private toastr: ToastrService,
                public fb: FormBuilder,
                private router: Router,
                private route: ActivatedRoute,
                private afstorage: AngularFireStorage,
                private  authService: AuthService,
                private orderPreService: OrderPreDataService,
                private orderService: OrderService,
                private datePipe: DatePipe,
                private dialogRef: MatDialogRef<ViewOrderComponent>,
                @Inject(MAT_DIALOG_DATA) data) {
        this.order = data.order;
    }


    ngOnInit() {


    }

    close() {
        this.dialogRef.close();
    }
}
