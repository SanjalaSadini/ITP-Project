import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from  'app/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from 'app/shared/services/employee.service';
//import { AngularFireStorage,AngularFireStorageReference,AngularFireUploadTask } from '@angular/fire/storage';

@Component({
  selector: 'app-employee-management',
  templateUrl: './employee-management.component.html',
  styleUrls: ['./employee-management.component.css']
})
export class EmployeeManagementComponent implements OnInit {

  constructor(private service : EmployeeService,
              private firestore: AngularFirestore,
              private toastr : ToastrService,
              public fb: FormBuilder, 
              private router: Router ,
              private  authService: AuthService) {
     this.employeesForm = new FormGroup({

      id: new FormControl(),
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
    this.resetForm();

  }

  resetForm(form ?: NgForm) {
    // tslint:disable-next-line:curly
    if (form != null)
      form.resetForm();
      this.service.formData= {
      id: null,
      empID: '',
      empName: '',
      empDept: '',
      empDesignation:'',
      empAddress:'',
      empContact:'',
      empEmail:'',
      birthday:'',
      empGender:'',
      startDate:null,
      empEdu:'',
    
    }
  }

  
  onSubmit(form:NgForm){
    let data = Object.assign({},form.value);
    delete data.id;
    
    if(form.value.id == null)
      this.firestore.collection('Employee-Information').add(data);
    
    else
      this.firestore.doc('Employee-Information/'+ form.value.id).update(data);
      this.resetForm(form);
      this.toastr.success('Submitted successfully','Hall Details');
  }

  // upload(event){
  //   this.ref=this.afstorage.ref(event.target.files[0].name)
  //   this.task=this.ref.put(event.target.files[0]);
  // }
  

}
