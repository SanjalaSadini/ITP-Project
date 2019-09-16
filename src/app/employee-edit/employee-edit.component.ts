import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from  'app/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from 'app/shared/services/employee.service';
import { Employee } from 'app/shared/services/employee.model';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.scss']
})
export class EmployeeEditComponent implements OnInit {

  employee: Employee;
  id:string;

  constructor(private service : EmployeeService,
              private firestore: AngularFirestore,
              private toastr : ToastrService,
              public fb: FormBuilder, 
              private router: Router ,
              private route: ActivatedRoute ,
              private  authService: AuthService) {  
  }
  public employeesForm: FormGroup;
  

  ngOnInit() {
    this.employee = new Employee();
    this.id = this.route.snapshot.params['id'];
    this.getEmployee(this.id)
  }
  getEmployee(id){
    this.service.getEmployee(id)
    .subscribe(data => {
      this.employee = {
        id: data.payload.id,
        ...data.payload.data() 
      } as Employee;
    }, error => console.log(error));
  }

  onSubmit(form:NgForm){
    console.log('submit')
    let data = Object.assign({},form.value);
    let id = data.id;
    delete data.id;
    if(confirm('Are you sure do you want to submit?')){
    this.service.updateEmployee(id,data).then(
      res => {
        this.toastr.success('Updated successfully','Employee Information');
        this.router.navigate(['/employee-list']);
        
      }
    );
    }else{
      
    }
  
}


}
