import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from  'app/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from 'app/shared/services/employee.service';
import { Employee } from 'app/shared/services/employee.model';
import { AngularFireStorage,AngularFireStorageReference,AngularFireUploadTask } from '@angular/fire/storage';

@Component({
  selector: 'app-employee-management',
  templateUrl: './employee-management.component.html',
  styleUrls: ['./employee-management.component.css']
})
export class EmployeeManagementComponent implements OnInit {

  public isButtonVisible = true;
  list:Employee[];
  employee: Employee;

 ref:AngularFireStorageReference;
 task:AngularFireUploadTask ;

  constructor(private service : EmployeeService,
              private firestore: AngularFirestore,
              private toastr : ToastrService,
              public fb: FormBuilder, 
              private router: Router ,
              private route: ActivatedRoute ,
              private afstorage:AngularFireStorage,
              private  authService: AuthService) {
     this.employee = new Employee();
  }
  public employeesForm: FormGroup;
  

  ngOnInit() {
    this.employeesForm = this.fb.group({

      id: new FormControl(null),
      empId: ['',[Validators.required,Validators.maxLength(8),Validators.pattern('[a-zA-Z0-9]+$')]],
      empName: new FormControl('',[Validators.required,Validators.pattern('[a-z]+[A-Z]')]),
      empDept: new FormControl('',[Validators.required,Validators.pattern('[a-z]+[A-Z]')]),
      empDesignation: new FormControl('',[Validators.required,Validators.pattern('[a-z]+[A-Z]')]),
      empAddress: new FormControl('',[Validators.required,Validators.pattern('[a-z]+[A-Z]+[0-9]')]),
      empContact: new FormControl('',[Validators.required,Validators.maxLength(10)]),
      empEmail: new FormControl('',Validators.email),
      birthday: new FormControl('',[Validators.required,Validators.pattern('[0-9]')]),
      empGender: new FormControl(''),
      startDate: new FormControl('',[Validators.required,Validators.pattern('[0-9]')]),
      empEdu: new FormControl('',[Validators.required,Validators.pattern('[a-z]+[A-Z]')]),
   });
    
    
  }

  resetForm(form ?: NgForm) {
    if (form != null)
      form.resetForm();
      this.service.formData= {
      id: null,
      empID:'',
      empName: '',
      empDept: '',
      empDesignation:'',
      empAddress:'',
      empContact:'',
      empEmail:'',
      birthday:'',
      empGender:'',
      startDate:'',
      empEdu:'',
    
    }
  }
  
  onSubmit(form:NgForm){
    let data = Object.assign({},form.value);
    delete data.id;
    
    if(form.value.id == null){ if(confirm('Are you sure do you want to submit?')){
      this.firestore.collection('Employee-Information').add(data).then(
        res => {
          console.log('createdre')
        }
      );
      this.resetForm(form);
      this.toastr.success('Submitted successfully','Employee Information');
    }
  }
     
    
    else{
      this.firestore.doc('Employee-Information/'+ form.value.id).update(data).then(
        res => {
          this.toastr.success('Submitted successfully','Employee Information');
        }
      );
      this.resetForm(form);
      this.toastr.success('Submitted successfully','Employee Information');

    }
   
  }


   upload(event){
     debugger;
     this.ref=this.afstorage.ref(event.target.files[0].name)
     this.task=this.ref.put(event.target.files[0]);
  }

}
