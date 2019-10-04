import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from 'app/shared/services/employee.service';
import { Employee } from 'app/shared/services/employee.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder,Validators } from '@angular/forms';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-employee-reports',
  templateUrl: './employee-reports.component.html',
  styleUrls: ['./employee-reports.component.scss']
})
export class EmployeeReportsComponent implements OnInit {

  isSubmitted = false;
  employeeList: Employee[];
  searchText: string;
  selectedDepartmentName:string;
  departments: any = ['IT', 'Sales', 'Inventory', 'Management']

  @ViewChild('content',{static: false}) content : ElementRef;
  // departmentName : string;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service : EmployeeService,
    private firestore: AngularFirestore,
    private fb: FormBuilder
  ) { }

  registrationForm = this.fb.group({
    departmentName:  ['', [Validators.required]]
  })

  downloadPDF(){
    console.log("here")
    let report = new jsPDF();

    let specialElementHeaders = {
      '#editor' : function(element , renderer){
        return true;
      }
    };
    let content = this.content.nativeElement;
    report.fromHTML(content.innerHTML,15,15, {
      'width':150,
      'elementHeaders': specialElementHeaders
    });
    report.save('report.pdf');
  }

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

}
