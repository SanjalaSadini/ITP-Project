import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from  'app/auth/auth.service';
//import { AngularFireStorage,AngularFireStorageReference,AngularFireUploadTask } from '@angular/fire/storage';

@Component({
  selector: 'app-employee-management',
  templateUrl: './employee-management.component.html',
  styleUrls: ['./employee-management.component.css']
})
export class EmployeeManagementComponent implements OnInit {

  constructor(public fb: FormBuilder, private router: Router , private  authService:  AuthService) {
    this.employeesForm = new FormGroup({
      _id: new FormControl(),
      empId: new FormControl(),
      empName: new FormControl(),
      empDept: new FormControl(),
      empDesignation: new FormControl(),
      empAddress: new FormControl(),
      empContact: new FormControl(),
      empEmail: new FormControl(),
      birthday: new FormControl(),
      empGender: new FormControl(),
      startDate: new FormControl(),
      empEdu: new FormControl(),
   });
  }
  public employeesForm: FormGroup;


  //-------- image-uploader part--------------

  // ref:AngularFireStorageReference;
  // task:AngularFireUploadTask ;

  // constructor(private afstorage:AngularFireStorage
  //   ) { }

  ngOnInit() {
  }

  // upload(event){
  //   this.ref=this.afstorage.ref(event.target.files[0].name)
  //   this.task=this.ref.put(event.target.files[0]);
  // }

}
