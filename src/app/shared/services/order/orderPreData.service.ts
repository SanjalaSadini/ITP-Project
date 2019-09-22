import {Injectable} from '@angular/core';

import {FormControl, FormGroupDirective, NgForm, FormBuilder, Validators, FormGroup, AbstractControl} from '@angular/forms';
import {AngularFirestore} from '@angular/fire/firestore';
import {DressType} from './dressType.model';


@Injectable({
    providedIn: 'root'
})
export class OrderPreDataService {

    constructor(private firestore: AngularFirestore) {

    }


    getDressTypes() {

        return this.firestore.collection('dressType').snapshotChanges();

    }

    getDressType(id) {
        return this.firestore.collection('dressType').doc(id).snapshotChanges();

    }

    getFabricProducts() {

        return this.firestore.collection('FabricProducts').snapshotChanges();

    }

    getFabricProduct(id) {
        return this.firestore.collection('FabricProducts').doc(id).snapshotChanges();

    }

    getMaterialTypes() {

        return this.firestore.collection('MaterialType').snapshotChanges();

    }

    getMaterialType(id) {
        return this.firestore.collection('MaterialType').doc(id).snapshotChanges();

    }

}
