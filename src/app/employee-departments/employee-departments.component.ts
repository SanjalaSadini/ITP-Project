import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DepartmentService } from 'app/shared/services/department.service';
import { Employee } from 'app/shared/services/employee.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-employee-departments',
  templateUrl: './employee-departments.component.html',
  styleUrls: ['./employee-departments.component.scss']
})
export class EmployeeDepartmentsComponent implements OnInit {
  departmentName : string;
  employeeList: Employee[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service : DepartmentService,
    private firestore: AngularFirestore,
  ) { }

  ngOnInit() {
    this.departmentName = this.route.snapshot.params['name'];
    this.service.getDepartmentEmployees(this.departmentName).subscribe(actionArray => {
      this.employeeList = actionArray.map(item =>{
      
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Employee;
      })
    });
  
  }

}
