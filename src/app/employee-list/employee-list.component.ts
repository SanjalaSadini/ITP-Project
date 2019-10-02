import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { EmployeeService } from 'app/shared/services/employee.service';
import { Employee } from 'app/shared/services/employee.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  isSubmitted = false;
  employeeList: Employee[];
  searchText: string;
  selectedDepartmentName:string;
  departments: any = ['IT', 'Sales', 'Inventory', 'Management']

  constructor(private firestore: AngularFirestore,
    private service: EmployeeService,
    private toastr: ToastrService,
    private router: Router,
    private fb: FormBuilder) {
  }

  registrationForm = this.fb.group({
    departmentName:  ['', [Validators.required]]
  })


  ngOnInit() {
    this.service.getEmployees().subscribe(actionArray => {
      this.employeeList = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Employee;

      })
    });

  }
  
  get departmentName() {
    return this.registrationForm.get('departmentName');
  }

  onSubmit() {
    this.isSubmitted = true;
    if (!this.registrationForm.valid) {
      return false;
    } else {
      this.selectedDepartmentName = this.registrationForm.value.departmentName;
      this.router.navigate(['/department_reports', this.selectedDepartmentName])
    }

  }

  onEdit(employee: Employee) {

    if (confirm('Are you sure do you want to edit?')) {
      this.service.formData = Object.assign({}, employee);
      this.router.navigate(['/employee-edit', employee.id])

    } else {
    }

  }

  onDelete(id: String) {
    if (confirm('Are you sure do you want to delete?')) {
      this.service.deleteEmployee(id).then(
        res => {
          this.router.navigate(['/employee-list']);
        }

      );


    } else {
    }
  }

  reportPage(){
    this.router.navigate(['/employee_reports']);
  }
  
  onSearch(value) {
    this.searchText = value;
  }

}
