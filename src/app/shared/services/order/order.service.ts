import {Injectable} from '@angular/core';

import {FormControl, FormGroupDirective, NgForm, FormBuilder, Validators, FormGroup, AbstractControl} from '@angular/forms';
import {AngularFirestore} from '@angular/fire/firestore';
import {DressType} from './dressType.model';


@Injectable({
    providedIn: 'root'
})
export class OrderService {

    constructor(private firestore: AngularFirestore) {

    }


    getOrders() {

        return this.firestore.collection('order').snapshotChanges();

    }

    getOrder(id) {
        return this.firestore.collection('order').doc(id).snapshotChanges();

    }


}
