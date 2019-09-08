import { Injectable } from '@angular/core';
import { Employee } from './employee.model';
import { FormControl, FormGroupDirective, NgForm, FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';




@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  formData:Employee;
  form: any;
  employeeList: Employee[];

  constructor(private firestore:AngularFirestore) {
  
  }


  getEmployees(){

    return this.firestore.collection('Employee-Information').snapshotChanges();

  }
  getEmployee(id){
    return this.firestore.collection('Employee-Information').doc(id).snapshotChanges();

  }
  updateEmployee(id, value){
    console.log(id,value)
    return this.firestore.collection('Employee-Information').doc(id).set(value);
  }
  deleteEmployee(id){
    return this.firestore.collection('Employee-Information').doc(id).delete();
  }
}
