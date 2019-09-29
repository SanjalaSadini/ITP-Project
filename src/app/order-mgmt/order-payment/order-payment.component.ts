import {Component, OnInit} from '@angular/core';
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
import {OrderPreDataService} from 'app/shared/services/order/orderPreData.service';
import {Employee} from '../../shared/services/employee.model';
import {OrderRequire} from '../../shared/services/order/orderRequires.model';
import {DatePipe} from '@angular/common';
import {OrderPayment} from '../../shared/services/order/orderPayment.model';

@Component({
    selector: 'app-order-payment',
    templateUrl: './order-payment.component.html',
    styleUrls: ['./order-payment.component.css'],
    providers: [DatePipe]
})
export class OrderPaymentComponent implements OnInit {

    ref: AngularFireStorageReference;
    task: AngularFireUploadTask;

    orderPayment: OrderPayment
    order: Order
    id: string

    constructor(private firestore: AngularFirestore,
                private toastr: ToastrService,
                public fb: FormBuilder,
                private router: Router,
                private route: ActivatedRoute,
                private afstorage: AngularFireStorage,
                private  authService: AuthService,
                private orderPreService: OrderPreDataService,
                private datePipe: DatePipe) {

    }

    ngOnInit() {
        this.orderPayment = new OrderPayment();
        this.id = this.route.snapshot.params['id'];
        this.orderPreService.getOrder(this.id).subscribe(data => {
            this.order = {
                ...data.payload.data()
            } as Order;
            this.orderPayment.order_id = this.order.order_id;
            this.orderPayment.amount = this.order.amount;
        }, error => console.log(error));
    }

    resetForm(form ?: NgForm) {
        if (form != null) {
            form.resetForm();
        }
    }

    onSubmit(form: NgForm) {

    }

}
