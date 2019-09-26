import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';


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

    getOrders() {

        return this.firestore.collection('order').snapshotChanges();

    }

    getOrder(id) {
        return this.firestore.collection('order').doc(id).snapshotChanges();

    }

    getCustomers() {

        return this.firestore.collection('Customer').snapshotChanges();

    }

    getCustomer(id) {

        return this.firestore.collection('Customer').doc(id).snapshotChanges();

    }

    getRequires() {

        return this.firestore.collection('requires').snapshotChanges();

    }

    getrequire(id) {

        return this.firestore.collection('requires').doc(id).snapshotChanges();

    }

    getRequireByOrderId(orderId) {
        return this.firestore.collection('requires', ref => ref.orderBy('order_id').startAt(orderId)).snapshotChanges();
    }

}
