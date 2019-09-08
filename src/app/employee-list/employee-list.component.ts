import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { EmployeeService } from 'app/shared/services/employee.service';
import { Employee } from 'app/shared/services/employee.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  employeeList:Employee[];
  searchText: string;

  constructor(private firestore: AngularFirestore,
              private service : EmployeeService,
              private toastr : ToastrService,
              private router : Router) { 
              }

  ngOnInit() {
    this.service.getEmployees().subscribe(actionArray => {
      this.employeeList = actionArray.map(item=>{
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data() 
        } as Employee;
        
        })
        console.log(this.employeeList);
  });
  
  }

  onEdit(employee:Employee){

    if (confirm('Are you sure do you want to edit?')) {
      this.service.formData = Object.assign ({},employee);
      this.router.navigate(['/employee-edit',employee.id])
      
    } else {
    }
   
  }

  onDelete(id:String){
    if (confirm('Are you sure do you want to delete?')) {
      this.service.deleteEmployee(id).then(
        res => {
          this.router.navigate(['/employee-list']);
        }
  
      );

      
    } else {
    }
  
  

  }

  onSearch(value){
    this.searchText = value;
  }

}
