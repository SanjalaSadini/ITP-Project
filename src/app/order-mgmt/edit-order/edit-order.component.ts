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
import {EditOrder} from '../../shared/services/order/edit-order.model';

@Component({
    selector: 'app-edit-order',
    templateUrl: './edit-order.component.html',
    styleUrls: ['./edit-order.component.css'],
    providers: [DatePipe]
})
export class EditOrderComponent implements OnInit {
    ref: AngularFireStorageReference;
    task: AngularFireUploadTask;

    order: OrderView
    savingData: EditOrder
    trialDate: string

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
                private dialogRef: MatDialogRef<EditOrderComponent>,
                @Inject(MAT_DIALOG_DATA) data) {
        data.order.status = 1;
        this.trialDate = data.order.trial_date;
        if (data.order.ready_for_worker) {
            data.order.status = 2;
        }
        if (data.order.proceed_to_sketch) {
            data.order.status = 3;
        }
        if (data.order.ready_to_deliver) {
            data.order.status = 4;
        }
        this.order = data.order;
    }


    ngOnInit() {


    }

    close() {
        this.dialogRef.close();
    }

    onSubmit(form: NgForm) {
        let tDate = this.trialDate;
        if (this.order.trial_date) {
            tDate = this.order.trial_date;
        }

        this.savingData = {
            trial_date: tDate,
            ready_for_worker: this.order.status === 1 ? false : true,
            proceed_to_sketch: this.order.status === 1 || this.order.status === 2 ? false : true,
            ready_to_deliver: this.order.status === 1 || this.order.status === 2 || this.order.status === 3 ? false : true,
            returns: 0
        };

        this.firestore.doc('order/' + this.order.order_id).update(JSON.parse(JSON.stringify(this.savingData))).then(() => {
            alert('Update Successful!');
            this.close();
        });
    }
}
