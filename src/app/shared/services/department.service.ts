import { Injectable } from '@angular/core';
import { Employee } from './employee.model';
import { FormControl, FormGroupDirective, NgForm, FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  employeeList: Employee[];

  constructor(private firestore:AngularFirestore) { }

  getDepartmentEmployees(id){
    return this.firestore.collection('Employee-Information').snapshotChanges();
  }
  // getDepartmentEmployees(name){
  //   return this.firestore.collectionGroup('Employee-Information', ref => ref.where('empDept', '==', 'name')).snapshotChanges();
  // }

}
