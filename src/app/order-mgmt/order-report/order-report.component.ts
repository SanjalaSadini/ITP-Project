import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
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
import * as jsPDF from 'jspdf'

@Component({
    selector: 'app-order-report',
    templateUrl: './order-report.component.html',
    styleUrls: ['./order-report.component.css'],
    providers: [DatePipe]
})
export class OrderReportComponent implements OnInit {

    @ViewChild('reportContent', {static: false}) content: ElementRef;

    orderList: OrderView[];
    ref: AngularFireStorageReference;
    task: AngularFireUploadTask;

    custList: DataHolder[];
    orderTemp: OrderView[]

    dressType: DressType
    fabricType: FabricProducts
    materialType: MaterialType

    p: number;
    reportTitle: string;
    reportTitleHead: string;
    reportTitleSubHead: string;
    loadingCustId: string;

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

    registrationForm = this.fb.group({
        departmentName: ['', [Validators.required]]
    })

    ngOnInit() {
        this.reportTitle = 'Full Order Report';
        this.reportTitleHead = 'Order Report';
        this.reportTitleSubHead = 'Order Information';
        this.loadingCustId = '';
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

    genarate() {
        console.log('generating');
        let doc = new jsPDF();
        let specialElementHandlers = {
            '#editor': function (element, renderer) {
                return true;
            }
        };
        let content = this.content.nativeElement;

        doc.fromHTML(content.innerHTML, 15, 15, {
            'width': 190,
            'elementHandlers': specialElementHandlers
        });
        doc.save('report.pdf');
    }


    onSubmit() {
        if (!this.registrationForm.valid) {
            alert('Select a customer for view customer report');
        } else {
            this.reportTitle = 'Customer Report of ' + this.registrationForm.value.departmentName.customer_f_name +
                ' ' + this.registrationForm.value.departmentName.customer_l_name;
            this.loadingCustId = this.registrationForm.value.departmentName.id;
            this.reportTitleHead = 'Customer Order Report';
            this.reportTitleSubHead = 'Customer Order Information';
        }
    }

    onFullReport() {
        this.reportTitle = 'Full Order Report';
        this.reportTitleHead = 'Order Report';
        this.reportTitleSubHead = 'Order Information';
        this.loadingCustId = '';
    }

}
