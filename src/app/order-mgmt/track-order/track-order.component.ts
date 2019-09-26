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
import {Employee} from 'app/shared/services/employee.model';
import {OrderRequire} from 'app/shared/services/order/orderRequires.model';
import {DatePipe} from '@angular/common';
import {OrderView} from 'app/shared/services/order/orderView.model';
import {OrderService} from 'app/shared/services/order/order.service';
import {OrderPreDataService} from 'app/shared/services/order/orderPreData.service';
import {DataHolder} from '../../shared/services/order/dataHolder.model';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ViewOrderComponent} from '../view-order/view-order.component';
import {EditOrderComponent} from '../edit-order/edit-order.component';

@Component({
    selector: 'app-track-order',
    templateUrl: './track-order.component.html',
    styleUrls: ['./track-order.component.css'],
    providers: [DatePipe]
})
export class TrackOrderComponent implements OnInit {
    searchText: string;
    orderList: OrderView[];
    ref: AngularFireStorageReference;
    task: AngularFireUploadTask;

    custList: DataHolder[];
    orderTemp: OrderView[]
    private dialogRef: MatDialogRef<ViewOrderComponent>
    private dialogEdit: MatDialogRef<EditOrderComponent>

    dressType: DressType
    fabricType: FabricProducts
    materialType: MaterialType

    p: number;

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
                private dialog: MatDialog) {
        this.p = 1;
    }

    ngOnInit() {

        this.orderPreService.getCustomers().subscribe(actionArray => {
            this.custList = actionArray.map(item => {
                return {
                    id: item.payload.doc.id,
                    ...item.payload.doc.data(),
                } as DataHolder;
            })
            console.log(this.custList);
        });

        this.orderPreService.getOrders().subscribe(actionArray => {
            this.orderList = actionArray.map(item => {
                const custId = item.payload.doc.data() as Order;
                const customerId = custId.customer_id;
                let custMName = '';
                this.custList.forEach(function (value) {
                    if (value.id === customerId) {
                        custMName = value.customer_f_name + ' ' + value.customer_l_name;
                    }
                });
                return {
                    order_id: item.payload.doc.id,
                    customer_name: custMName,
                    ...item.payload.doc.data()
                } as OrderView;
            })
            console.log(this.orderList);
        });
    }


    onSearch(value) {
        this.searchText = value;
    }

    onView(order: OrderView) {
        console.log(order.order_id);
        this.orderPreService.getRequireByOrderId(order.order_id).subscribe(actionArray => {
            this.orderTemp = actionArray.map(item => {
                return {
                    ...item.payload.doc.data()
                } as OrderView;
            })
            console.log(this.orderTemp);
            order.color = this.orderTemp[0].color
            order.size = this.orderTemp[0].size
            order.order_quantity = this.orderTemp[0].order_quantity
            order.dress_id = this.orderTemp[0].dress_id
            order.material_id = this.orderTemp[0].material_id
            order.fabric_id = this.orderTemp[0].fabric_id

            order.length = this.orderTemp[0].length
            order.shoulder = this.orderTemp[0].shoulder
            order.chest = this.orderTemp[0].chest
            order.slLength = this.orderTemp[0].slLength
            order.waist = this.orderTemp[0].waist
            order.wLength = this.orderTemp[0].wLength
            order.neck = this.orderTemp[0].neck
            order.comment = this.orderTemp[0].comment

            this.orderPreService.getDressType(order.dress_id)
                .subscribe(data => {
                    this.dressType = {
                        dress_id: data.payload.id,
                        ...data.payload.data()
                    } as DressType;
                    // Fabric Data
                    this.orderPreService.getFabricProduct(order.fabric_id)
                        .subscribe(dataf => {
                            this.fabricType = {
                                fabric_id: dataf.payload.id,
                                ...dataf.payload.data()
                            } as FabricProducts;
                            // Material Data
                            this.orderPreService.getMaterialType(order.material_id)
                                .subscribe(datax => {
                                    this.materialType = {
                                        id: datax.payload.id,
                                        ...datax.payload.data()
                                    } as MaterialType;
                                    order.dress_id = this.dressType.dress_name
                                    order.material_id = this.materialType.name
                                    order.fabric_id = this.fabricType.fabric_description

                                    this.dialogRef = this.dialog.open(ViewOrderComponent, {
                                        disableClose: false,
                                        autoFocus: true,
                                        minWidth: '500px',
                                        data: {
                                            order: order
                                        }
                                    });
                                }, error => console.log(error));

                            //
                        }, error => console.log(error));

                    //
                }, error => console.log(error));


        });
    }

    onEdit(order: OrderView) {
        console.log(order.order_id);
        this.orderPreService.getRequireByOrderId(order.order_id).subscribe(actionArray => {
            this.orderTemp = actionArray.map(item => {
                return {
                    ...item.payload.doc.data()
                } as OrderView;
            })
            console.log(this.orderTemp);
            order.color = this.orderTemp[0].color
            order.size = this.orderTemp[0].size
            order.order_quantity = this.orderTemp[0].order_quantity
            order.dress_id = this.orderTemp[0].dress_id
            order.material_id = this.orderTemp[0].material_id
            order.fabric_id = this.orderTemp[0].fabric_id

            order.length = this.orderTemp[0].length
            order.shoulder = this.orderTemp[0].shoulder
            order.chest = this.orderTemp[0].chest
            order.slLength = this.orderTemp[0].slLength
            order.waist = this.orderTemp[0].waist
            order.wLength = this.orderTemp[0].wLength
            order.neck = this.orderTemp[0].neck
            order.comment = this.orderTemp[0].comment

            this.orderPreService.getDressType(order.dress_id)
                .subscribe(data => {
                    this.dressType = {
                        dress_id: data.payload.id,
                        ...data.payload.data()
                    } as DressType;
                    // Fabric Data
                    this.orderPreService.getFabricProduct(order.fabric_id)
                        .subscribe(dataf => {
                            this.fabricType = {
                                fabric_id: dataf.payload.id,
                                ...dataf.payload.data()
                            } as FabricProducts;
                            // Material Data
                            this.orderPreService.getMaterialType(order.material_id)
                                .subscribe(datax => {
                                    this.materialType = {
                                        id: datax.payload.id,
                                        ...datax.payload.data()
                                    } as MaterialType;
                                    order.dress_id = this.dressType.dress_name
                                    order.material_id = this.materialType.name
                                    order.fabric_id = this.fabricType.fabric_description

                                    this.dialogEdit = this.dialog.open(EditOrderComponent, {
                                        disableClose: false,
                                        autoFocus: true,
                                        minWidth: '500px',
                                        data: {
                                            order: order
                                        }
                                    });
                                }, error => console.log(error));

                            //
                        }, error => console.log(error));

                    //
                }, error => console.log(error));


        });
    }


}
