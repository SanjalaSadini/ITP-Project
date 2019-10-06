import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Supplier } from 'app/supplier/supplier.component';
import { invalid } from '@angular/compiler/src/render3/view/util';

@Component({
  selector: 'app-supplier-invoices',
  templateUrl: './supplier-invoices.component.html',
  styleUrls: ['./supplier-invoices.component.scss']
})
export class SupplierInvoicesComponent implements OnInit {
  supplierInvoice = new SupplierInvoices('', '', '', '', '', '', false)

  listOfSupliersInvoices: SupplierInvoices[] = [];
  currentSearch: String='';

  constructor(private firebaseService: AngularFirestore) { }

  ngOnInit() {

    this.supplierInvoice = new SupplierInvoices('', '', '', '', '', '', false)
    this.getSupplierInvoices();

  }
  getSupplierInvoices() {

    const collection: AngularFirestoreCollection<SupplierInvoices> = this.firebaseService.collection('suppliers-invoices/')

    collection.snapshotChanges().subscribe(res => {

      this.listOfSupliersInvoices = [];
      // this.listOfSupliers=res;

      res.forEach((r, s, a, ) => {
        if (this.currentSearch !=='') {

          let data: SupplierInvoices = r.payload.doc.data();
          data.id =
            r.payload.doc.id.toString();
          if (data.docNumber === this.currentSearch || data.invNumber === this.currentSearch) {

            this.listOfSupliersInvoices.push(data);
          }
          return;
        }

        let data: SupplierInvoices = r.payload.doc.data();
        data.id =
          r.payload.doc.id.toString();
        this.listOfSupliersInvoices.push(data);

      })

    })
  }
  submit() {

    if (this.supplierInvoice.docNumber.length > 0 && this.supplierInvoice.dueDate.length > 0 && this.supplierInvoice.docDate.length >0 && this.supplierInvoice.dueDate.length>0 &&this.supplierInvoice.total.length>0) {

      if (this.supplierInvoice.id.length === 0) {
        this.firebaseService.collection('suppliers-invoices')
          .add(JSON.parse(JSON.stringify(this.supplierInvoice))).then(() => {
            this.reset()
          });
      } else {

        this.firebaseService.doc('suppliers-invoices/' + this.supplierInvoice.id)
          .update(JSON.parse(JSON.stringify(this.supplierInvoice))).then(() => {
            this.reset()
            alert('Update Successful!')
          });
      }
    } else {

      alert('Fill the required fields')
    }


  }

  save(i, state) {
    // alert(this.listOfSupliersInvoices[i].paid + ' ' + !state)

    this.listOfSupliersInvoices[i].paid = !state;
    this.firebaseService.doc('suppliers-invoices/' + this.listOfSupliersInvoices[i].id)
      .update(JSON.parse(JSON.stringify(this.listOfSupliersInvoices[i]))).then(() => {

        alert('Saved ! ')
      });

  }
  reset() {

    this.supplierInvoice.id = ''
    this.supplierInvoice.docNumber = ''
    this.supplierInvoice.invNumber = ''
    this.supplierInvoice.docDate = ''
    this.supplierInvoice.dueDate = ''
    this.supplierInvoice.total = ''
    this.supplierInvoice.paid = false
  }
   demo() {

    this.supplierInvoice.id = ''
    this.supplierInvoice.docNumber ='7532'
    this.supplierInvoice.invNumber = '6554'
    this.supplierInvoice.docDate = '2019/07/06'
    this.supplierInvoice.dueDate = '2019/08/04'
    this.supplierInvoice.total = '4000'
    this.supplierInvoice.paid = false
  }


  editSupplierInvoice(data) {
    this.supplierInvoice = data
  }

  deleteSupplierInvoice(id) {
    if (confirm('Are you sure you want to delete?')) {

      this.firebaseService.doc('suppliers-invoices/' + id).delete();
    } else {

    }
  }
  deleteAll() {
    if (confirm('Are you sure you want to delete all?')) {
      this.listOfSupliersInvoices.forEach(v => {

        this.firebaseService.doc('suppliers-invoices/' + v.id).delete();
      })

    } else {

    }
  }
  onSearch(value) {
    this.getSupplierInvoices();
  }

}

export class SupplierInvoices {
  constructor(
    public id: string,
    public docNumber: string,
    public invNumber: string,
    public docDate: string,
    public dueDate: string,
    public total: string,
    public paid: boolean,

  ) { }
}