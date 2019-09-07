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

  employeesForm = new FormGroup({

    id: new FormControl(null),
    empId: new FormControl('',Validators.required),
    empName: new FormControl('',Validators.required),
    empDept: new FormControl('',Validators.required),
    empDesignation: new FormControl('',Validators.required),
    empAddress: new FormControl('',Validators.required),
    empContact: new FormControl('',[Validators.required,Validators.maxLength(10)]),
    empEmail: new FormControl('',Validators.email),
    birthday: new FormControl(''),
    empGender: new FormControl('',Validators.required),
    startDate: new FormControl('',Validators.required),
    empEdu: new FormControl(''),
 });
  

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
