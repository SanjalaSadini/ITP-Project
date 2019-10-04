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

@Component({
    selector: 'app-new-order',
    templateUrl: './new-order.component.html',
    styleUrls: ['./new-order.component.css'],
    providers: [DatePipe]
})
export class NewOrderComponent implements OnInit {

    order: PlaceOrder
    orderData: Order
    requireData: OrderRequire
    public ordersForm: FormGroup;
    ref: AngularFireStorageReference;
    task: AngularFireUploadTask;

    dresses: DressType[];
    fabrics: FabricProducts[];
    materials: MaterialType[];

    dressType: DressType;
    fabricType: FabricProducts;
    materialType: MaterialType;
    orderAmount: string;

    orderDate: string;

    constructor(private firestore: AngularFirestore,
                private toastr: ToastrService,
                public fb: FormBuilder,
                private router: Router,
                private route: ActivatedRoute,
                private afstorage: AngularFireStorage,
                private  authService: AuthService,
                private orderPreService: OrderPreDataService,
                private datePipe: DatePipe) {
        this.order = new PlaceOrder();
        this.orderData = new Order();
        this.requireData = new OrderRequire();
        this.orderDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd')
    }

    ngOnInit() {
        this.ordersForm = this.fb.group({

            order_id: new FormControl(null),
            customer_id: new FormControl(null),
            // order_date: [null],
            // trial_date: new FormControl(null),
            delivery_date: new FormControl('', [Validators.required, Validators.pattern('[0-9]')]),
            amount: new FormControl('', [Validators.required, Validators.pattern('[a-z]+[A-Z]+[0-9]')]),
            order_quantity: new FormControl('', [Validators.required]),
            dress_id: new FormControl('', null),
            fabric_id: new FormControl('', null),
            material_id: new FormControl('', null),
            size: new FormControl('', [Validators.required, Validators.pattern('[a-z]+[A-Z]+[0-9]')]),
            color: new FormControl('', [Validators.required, Validators.pattern('[a-z]+[A-Z]+[0-9]')]),
            length: new FormControl('', [Validators.pattern('[a-z]+[A-Z]+[0-9]')]),
            shoulder: new FormControl('', [Validators.pattern('[a-z]+[A-Z]+[0-9]')]),
            chest: new FormControl('', [Validators.pattern('[a-z]+[A-Z]+[0-9]')]),
            slLength: new FormControl('', [Validators.pattern('[a-z]+[A-Z]+[0-9]')]),
            waist: new FormControl('', [Validators.pattern('[a-z]+[A-Z]+[0-9]')]),
            wLength: new FormControl('', [Validators.pattern('[a-z]+[A-Z]+[0-9]')]),
            neck: new FormControl('', [Validators.pattern('[a-z]+[A-Z]+[0-9]')]),
            comment: new FormControl('', [Validators.pattern('[a-z]+[A-Z]+[0-9]')]),
        });

        this.orderPreService.getDressTypes().subscribe(actionArray => {
            this.dresses = actionArray.map(item => {
                return {
                    dress_id: item.payload.doc.id,
                    ...item.payload.doc.data()
                } as DressType;

            })

        });

        this.orderPreService.getFabricProducts().subscribe(actionArray => {
            this.fabrics = actionArray.map(item => {
                return {
                    fabric_id: item.payload.doc.id,
                    ...item.payload.doc.data()
                } as FabricProducts;

            })

        });

        this.orderPreService.getMaterialTypes().subscribe(actionArray => {
            this.materials = actionArray.map(item => {
                return {
                    id: item.payload.doc.id,
                    ...item.payload.doc.data()
                } as MaterialType;

            })

        });

        this.dressType = new DressType();
        // this.dresses = [{dress_id: '3232323', dress_name: 'T-shirt', amount: '5000'},
        //     {dress_id: '22222', dress_name: 'shirt', amount: '4000'}];
        // this.fabrics = [{fabric_id: '2929', fabric_description: 'Fabric 1', amount: '3000'},
        //     {fabric_id: '3939', fabric_description: 'Fabric 2', amount: '2000'}];
        // this.materials = [{id: '2', name: 'Material 1', amount: '100'},
        //     {id: '3', name: 'Material 2', amount: '200'}];
    }

    resetForm(form ?: NgForm) {
        if (form != null) {
            form.resetForm();
        }
    }

    onSubmit(form: NgForm) {
        const dataOrder = Object.assign({}, form.value);
        const id = this.firestore.createId();
        this.orderData = {
            order_id: id,
            customer_id: 'ypbXPLWxQpycb4ZiJtqr',  // TODO
            amount: this.orderAmount,
            delivery_date: dataOrder.delivery_date,
            order_date: this.orderDate,
            order_quantity: dataOrder.order_quantity,
            proceed_to_sketch: false,
            ready_for_worker: false,
            ready_to_deliver: false,
            returns: 0,
            trial_date: ''
        };
        this.requireData = {
            order_id: id,
            dress_id: this.dressType.dress_id,
            fabric_id: this.fabricType.fabric_id,
            material_id: this.materialType.id,
            order_quantity: dataOrder.order_quantity,
            size: dataOrder.size,
            color: dataOrder.color,
            length: dataOrder.length !== undefined ? dataOrder.length : '',
            shoulder: dataOrder.shoulder !== undefined ? dataOrder.shoulder : '',
            chest: dataOrder.chest !== undefined ? dataOrder.chest : '',
            slLength: dataOrder.slLength !== undefined ? dataOrder.slLength : '',
            waist: dataOrder.waist !== undefined ? dataOrder.waist : '',
            wLength: dataOrder.wLength !== undefined ? dataOrder.wLength : '',
            neck: dataOrder.neck !== undefined ? dataOrder.neck : '',
            comment: dataOrder.comment !== undefined ? dataOrder.comment : '',
        };
        this.firestore.collection('order').doc(id).set(JSON.parse(JSON.stringify(this.orderData))).then(() => {
            this.firestore.collection('requires').add(JSON.parse(JSON.stringify(this.requireData))).then(() => {
                this.toastr.success('Placed successfully', 'New Order');
                console.log(id);
                setTimeout(() => {
                    this.router.navigate(['/orders']);
                }, 3000);
            });
        });
    }

    loadAmount(form: NgForm) {
        const datas = Object.assign({}, form.value);
        console.log(datas.dress_id);

        if (datas.dress_id !== undefined && datas.fabric_id !== undefined &&
            datas.material_id !== undefined && datas.order_quantity !== undefined) {
            this.orderPreService.getDressType(datas.dress_id)
                .subscribe(data => {
                    this.dressType = {
                        dress_id: data.payload.id,
                        ...data.payload.data()
                    } as DressType;
                    // Fabric Data
                    this.orderPreService.getFabricProduct(datas.fabric_id)
                        .subscribe(dataf => {
                            this.fabricType = {
                                fabric_id: dataf.payload.id,
                                ...dataf.payload.data()
                            } as FabricProducts;
                            // Material Data
                            this.orderPreService.getMaterialType(datas.material_id)
                                .subscribe(datax => {
                                    this.materialType = {
                                        id: datax.payload.id,
                                        ...datax.payload.data()
                                    } as MaterialType;
                                    this.orderAmount = ((parseFloat(this.dressType.amount) +
                                        parseFloat(this.fabricType.amount) +
                                        parseFloat(this.materialType.amount)) * (parseInt(datas.order_quantity, 10))).toFixed(2);
                                }, error => console.log(error));

                            //
                        }, error => console.log(error));

                    //
                }, error => console.log(error));
        }

    }

    demoOrder(ordert: PlaceOrder) {
        this.order.color = 'Blue';
        this.order.size = 'XL';
        this.order.delivery_date = '2019-10-10';
        this.order.order_quantity = '10';
        this.order.length = '23',
            this.order.shoulder = '33';
        this.order.chest = '16';
        this.order.slLength = '28';
        this.order.waist = '19';
        this.order.wLength = '15';
        this.order.neck = '12';
        this.order.comment = 'other information will be provided at trial date';
        this.order.dress_id = this.dresses[0].dress_id;
        this.order.material_id = this.materials[0].id;
        this.order.fabric_id = this.fabrics[0].fabric_id;

        this.orderAmount = ((parseFloat(this.dresses[0].amount) +
            parseFloat(this.fabrics[0].amount) +
            parseFloat(this.materials[0].amount)) * 10).toFixed(2);

    }

}
