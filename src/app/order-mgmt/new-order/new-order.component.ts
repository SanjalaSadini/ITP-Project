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

@Component({
    selector: 'app-new-order',
    templateUrl: './new-order.component.html',
    styleUrls: ['./new-order.component.css']
})
export class NewOrderComponent implements OnInit {

    order: PlaceOrder
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

    constructor(private firestore: AngularFirestore,
                private toastr: ToastrService,
                public fb: FormBuilder,
                private router: Router,
                private route: ActivatedRoute,
                private afstorage: AngularFireStorage,
                private  authService: AuthService,
                private orderPreService: OrderPreDataService) {
        this.order = new PlaceOrder();
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
        let dataOrder = Object.assign({}, form.value);
        let dataRequire = Object.assign({}, form.value);
        let id = this.firestore.createId();
        this.firestore.collection('order').doc(id).set(JSON.parse(JSON.stringify(this.order))).then(() => {
            this.toastr.success('Submitted successfully', 'Employee Information');
            console.log(id);
        });
    }

    loadAmount(form: NgForm) {
        let datas = Object.assign({}, form.value);
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
                                    // alert(this.dressType.amount + 'F ' + this.fabricType.amount + ' M' + this.materialType.amount + ' Q' + datas.order_quantity);
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

}
