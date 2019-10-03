import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from 'app/shared/services/employee.service';
import { Employee } from 'app/shared/services/employee.model';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-employee-reports',
  templateUrl: './employee-reports.component.html',
  styleUrls: ['./employee-reports.component.scss']
})
export class EmployeeReportsComponent implements OnInit {

  departmentName : string;
  employeeList: Employee[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service : EmployeeService,
    private firestore: AngularFirestore,
  ) { }

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

}
